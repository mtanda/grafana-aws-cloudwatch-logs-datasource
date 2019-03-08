package main

import (
	"encoding/json"
	"fmt"
	"sort"
	"strconv"
	"time"

	"golang.org/x/net/context"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/cloudwatchlogs"

	"github.com/grafana/grafana/pkg/components/simplejson"
	"github.com/grafana/grafana_plugin_model/go/datasource"
	plugin "github.com/hashicorp/go-plugin"
)

type AwsCloudWatchLogsDatasource struct {
	plugin.NetRPCUnsupportedPlugin
}

type Target struct {
	RefId                   string
	QueryType               string
	Format                  string
	Region                  string
	UseInsights             bool
	Input                   cloudwatchlogs.FilterLogEventsInput
	InputInsightsStartQuery cloudwatchlogs.StartQueryInput
	BytesLimit              int
	RecordsLimit            int
}

func (t *AwsCloudWatchLogsDatasource) Query(ctx context.Context, tsdbReq *datasource.DatasourceRequest) (*datasource.DatasourceResponse, error) {
	modelJson, err := simplejson.NewJson([]byte(tsdbReq.Queries[0].ModelJson))
	if err != nil {
		return nil, err
	}
	if modelJson.Get("queryType").MustString() == "metricFindQuery" {
		response, err := t.metricFindQuery(ctx, tsdbReq, modelJson)
		if err != nil {
			return &datasource.DatasourceResponse{
				Results: []*datasource.QueryResult{
					&datasource.QueryResult{
						RefId: "metricFindQuery",
						Error: err.Error(),
					},
				},
			}, nil
		}
		return response, nil
	}
	if modelJson.Get("queryType").MustString() == "annotationQuery" {
		target := Target{}
		if err := json.Unmarshal([]byte(tsdbReq.Queries[0].ModelJson), &target); err != nil {
			return nil, err
		}
		fromRaw, err := strconv.ParseInt(tsdbReq.TimeRange.FromRaw, 10, 64)
		if err != nil {
			return nil, err
		}
		toRaw, err := strconv.ParseInt(tsdbReq.TimeRange.ToRaw, 10, 64)
		if err != nil {
			return nil, err
		}
		target.Input.StartTime = aws.Int64(fromRaw)
		target.Input.EndTime = aws.Int64(toRaw)

		resp, err := t.getLogEvent(tsdbReq, target.Region, &target.Input)
		if err != nil {
			return nil, err
		}

		resultJson, err := json.Marshal(resp)
		if err != nil {
			return nil, err
		}

		return &datasource.DatasourceResponse{
			Results: []*datasource.QueryResult{
				&datasource.QueryResult{
					MetaJson: string(resultJson),
				},
			},
		}, nil
	}

	response, err := t.handleQuery(tsdbReq)
	if err != nil {
		return &datasource.DatasourceResponse{
			Results: []*datasource.QueryResult{
				&datasource.QueryResult{
					Error: err.Error(),
				},
			},
		}, nil
	}

	return response, nil
}

func (t *AwsCloudWatchLogsDatasource) handleQuery(tsdbReq *datasource.DatasourceRequest) (*datasource.DatasourceResponse, error) {
	response := &datasource.DatasourceResponse{}

	fromRaw, err := strconv.ParseInt(tsdbReq.TimeRange.FromRaw, 10, 64)
	if err != nil {
		return nil, err
	}
	toRaw, err := strconv.ParseInt(tsdbReq.TimeRange.ToRaw, 10, 64)
	if err != nil {
		return nil, err
	}
	targets := make([]Target, 0)
	for _, query := range tsdbReq.Queries {
		target := Target{}
		if err := json.Unmarshal([]byte(query.ModelJson), &target); err != nil {
			return nil, err
		}
		target.Input.StartTime = aws.Int64(fromRaw)
		target.Input.EndTime = aws.Int64(toRaw)
		target.InputInsightsStartQuery.StartTime = aws.Int64(fromRaw)
		target.InputInsightsStartQuery.EndTime = aws.Int64(toRaw)
		targets = append(targets, target)
	}

	for _, target := range targets {
		resp := &cloudwatchlogs.FilterLogEventsOutput{}
		if !target.UseInsights {
			resp, err = t.getLogEvent(tsdbReq, target.Region, &target.Input)
			if err != nil {
				return nil, err
			}

			switch target.Format {
			case "timeserie":
				return nil, fmt.Errorf("not supported")
			case "table":
				r, err := parseTableResponse(resp, target.RefId)
				if err != nil {
					return nil, err
				}
				response.Results = append(response.Results, r)
			}
		} else {
			svc, err := t.getClient(tsdbReq.Datasource, target.Region)
			if err != nil {
				return nil, err
			}
			sresp := &cloudwatchlogs.StartQueryOutput{}
			sresp, err = svc.StartQuery(&target.InputInsightsStartQuery)
			if err != nil {
				return nil, err
			}
			ginput := &cloudwatchlogs.GetQueryResultsInput{
				QueryId: sresp.QueryId,
			}
			gresp := &cloudwatchlogs.GetQueryResultsOutput{}
			for {
				gresp, err = svc.GetQueryResults(ginput)
				if err != nil {
					return nil, err
				}
				if *gresp.Status == "Complete" || *gresp.Status == "Failed" || *gresp.Status == "Unknown" {
					break
				}
				time.Sleep(1 * time.Second)
			}
			einput := &cloudwatchlogs.StopQueryInput{
				QueryId: sresp.QueryId,
			}
			_, err = svc.StopQuery(einput)
			if err != nil {
				// ignore error
				//return nil, err
			}

			table := &datasource.Table{}

			for _, f := range gresp.Results[0] {
				table.Columns = append(table.Columns, &datasource.TableColumn{Name: *f.Field})
			}
			for _, r := range gresp.Results {
				row := &datasource.TableRow{}
				for _, f := range r {
					row.Values = append(row.Values, &datasource.RowValue{Kind: datasource.RowValue_TYPE_STRING, StringValue: *f.Value})
				}
				table.Rows = append(table.Rows, row)
			}

			response.Results = append(response.Results, &datasource.QueryResult{
				RefId:  target.RefId,
				Tables: []*datasource.Table{table},
			})
		}
	}

	return response, nil
}

func (t *AwsCloudWatchLogsDatasource) getLogEvent(tsdbReq *datasource.DatasourceRequest, region string, input *cloudwatchlogs.FilterLogEventsInput) (*cloudwatchlogs.FilterLogEventsOutput, error) {
	svc, err := t.getClient(tsdbReq.Datasource, region)
	if err != nil {
		return nil, err
	}

	resp := &cloudwatchlogs.FilterLogEventsOutput{}
	if *input.FilterPattern != "" || len(input.LogStreamNames) != 1 {
		err = svc.FilterLogEventsPages(input,
			func(page *cloudwatchlogs.FilterLogEventsOutput, lastPage bool) bool {
				resp.Events = append(resp.Events, page.Events...)
				if len(resp.Events) > 1000 {
					return false // safety limit
				}
				return !lastPage
			})
	} else {
		i := &cloudwatchlogs.GetLogEventsInput{
			StartTime:     input.StartTime,
			EndTime:       input.EndTime,
			LogGroupName:  input.LogGroupName,
			LogStreamName: input.LogStreamNames[0],
			StartFromHead: aws.Bool(true),
		}
		err = svc.GetLogEventsPages(i,
			func(page *cloudwatchlogs.GetLogEventsOutput, lastPage bool) bool {
				for _, e := range page.Events {
					fe := &cloudwatchlogs.FilteredLogEvent{
						LogStreamName: input.LogStreamNames[0],
						IngestionTime: e.IngestionTime,
						Message:       e.Message,
						Timestamp:     e.Timestamp,
					}
					resp.Events = append(resp.Events, fe)
				}
				if len(resp.Events) > 1000 {
					return false // safety limit
				}
				return !lastPage
			})
	}
	if err != nil {
		return nil, err
	}

	return resp, nil
}

func parseTableResponse(resp *cloudwatchlogs.FilterLogEventsOutput, refId string) (*datasource.QueryResult, error) {
	table := &datasource.Table{}

	table.Columns = append(table.Columns, &datasource.TableColumn{Name: "Timestamp"})
	table.Columns = append(table.Columns, &datasource.TableColumn{Name: "IngestionTime"})
	table.Columns = append(table.Columns, &datasource.TableColumn{Name: "LogStreamName"})
	table.Columns = append(table.Columns, &datasource.TableColumn{Name: "Message"})
	for _, e := range resp.Events {
		row := &datasource.TableRow{}
		timestamp := time.Unix(*e.Timestamp/1000, *e.Timestamp%1000*1000*1000).Format(time.RFC3339)
		row.Values = append(row.Values, &datasource.RowValue{Kind: datasource.RowValue_TYPE_STRING, StringValue: timestamp})
		ingestionTime := time.Unix(*e.IngestionTime/1000, *e.IngestionTime%1000*1000*1000).Format(time.RFC3339)
		row.Values = append(row.Values, &datasource.RowValue{Kind: datasource.RowValue_TYPE_STRING, StringValue: ingestionTime})
		row.Values = append(row.Values, &datasource.RowValue{Kind: datasource.RowValue_TYPE_STRING, StringValue: *e.LogStreamName})
		row.Values = append(row.Values, &datasource.RowValue{Kind: datasource.RowValue_TYPE_STRING, StringValue: *e.Message})
		table.Rows = append(table.Rows, row)
	}

	return &datasource.QueryResult{
		RefId:  refId,
		Tables: []*datasource.Table{table},
	}, nil
}

type suggestData struct {
	Text  string
	Value string
}

func (t *AwsCloudWatchLogsDatasource) metricFindQuery(ctx context.Context, tsdbReq *datasource.DatasourceRequest, parameters *simplejson.Json) (*datasource.DatasourceResponse, error) {
	region := parameters.Get("region").MustString()
	svc, err := t.getClient(tsdbReq.Datasource, region)
	if err != nil {
		return nil, err
	}

	subtype := parameters.Get("subtype").MustString()

	data := make([]suggestData, 0)
	switch subtype {
	case "log_group_names":
		prefix := parameters.Get("logGroupNamePrefix").MustString()
		param := &cloudwatchlogs.DescribeLogGroupsInput{}
		if len(prefix) > 0 {
			param.LogGroupNamePrefix = aws.String(prefix)
		}
		groups := &cloudwatchlogs.DescribeLogGroupsOutput{}
		err = svc.DescribeLogGroupsPages(param, func(page *cloudwatchlogs.DescribeLogGroupsOutput, lastPage bool) bool {
			groups.LogGroups = append(groups.LogGroups, page.LogGroups...)
			if len(groups.LogGroups) > 100 {
				return false // safety limit
			}
			return !lastPage
		})
		if err != nil {
			return nil, err
		}
		sort.Slice(groups.LogGroups, func(i, j int) bool {
			return *groups.LogGroups[i].CreationTime > *groups.LogGroups[j].CreationTime
		})

		for _, g := range groups.LogGroups {
			data = append(data, suggestData{Text: *g.LogGroupName, Value: *g.LogGroupName})
		}
	case "log_stream_names":
		ctx := context.Background()
		logGroupName := parameters.Get("logGroupName").MustString()
		prefix := parameters.Get("logStreamNamePrefix").MustString()
		param := &cloudwatchlogs.DescribeLogStreamsInput{
			LogGroupName: aws.String(logGroupName),
		}
		if len(prefix) > 0 {
			param.LogStreamNamePrefix = aws.String(prefix)
		}
		streams := &cloudwatchlogs.DescribeLogStreamsOutput{}
		err = svc.DescribeLogStreamsPagesWithContext(ctx, param, func(page *cloudwatchlogs.DescribeLogStreamsOutput, lastPage bool) bool {
			streams.LogStreams = append(streams.LogStreams, page.LogStreams...)
			if len(streams.LogStreams) > 100 {
				return false // safety limit
			}
			return !lastPage
		})
		if err != nil {
			return nil, err
		}
		sort.Slice(streams.LogStreams, func(i, j int) bool {
			return *streams.LogStreams[i].CreationTime > *streams.LogStreams[j].CreationTime
		})

		for _, g := range streams.LogStreams {
			data = append(data, suggestData{Text: *g.LogStreamName, Value: *g.LogStreamName})
		}
	}

	table := t.transformToTable(data)
	return &datasource.DatasourceResponse{
		Results: []*datasource.QueryResult{
			&datasource.QueryResult{
				RefId:  "metricFindQuery",
				Tables: []*datasource.Table{table},
			},
		},
	}, nil
}

func (t *AwsCloudWatchLogsDatasource) transformToTable(data []suggestData) *datasource.Table {
	table := &datasource.Table{
		Columns: make([]*datasource.TableColumn, 0),
		Rows:    make([]*datasource.TableRow, 0),
	}
	table.Columns = append(table.Columns, &datasource.TableColumn{Name: "text"})
	table.Columns = append(table.Columns, &datasource.TableColumn{Name: "value"})

	for _, r := range data {
		row := &datasource.TableRow{}
		row.Values = append(row.Values, &datasource.RowValue{Kind: datasource.RowValue_TYPE_STRING, StringValue: r.Text})
		row.Values = append(row.Values, &datasource.RowValue{Kind: datasource.RowValue_TYPE_STRING, StringValue: r.Value})
		table.Rows = append(table.Rows, row)
	}
	return table
}
