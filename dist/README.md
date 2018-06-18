## AWS CloudWatch Logs Datasource Plugin for Grafana

### Setup
Allow following API for EC2 instance, and run Grafana on the EC2 instance.

- logs:FilterLogEvents
- logs:GetLogEvents
- logs:DescribeLogGroups
- logs:DescribeLogStreams

### Templating

#### Query variable

Name | Description
---- | --------
*log_group_names(region, prefix)* | Returns a list of log group names which prefix is `prefix`.
*log_stream_names(region, log_group_name)* | Returns a list of log stream names which group is `log_group_name`.

#### Changelog

##### v1.0.0
- Initial release
