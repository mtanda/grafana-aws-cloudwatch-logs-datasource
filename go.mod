module github.com/mtanda/grafana-aws-cloudwatch-logs-datasource

go 1.12

require (
	github.com/aws/aws-sdk-go v1.22.2
	github.com/golang/protobuf v0.0.0-20180522224251-3a3da3a4e267
	github.com/grafana/grafana v5.1.3+incompatible
	github.com/grafana/grafana_plugin_model v0.0.0-20180118101258-dfe5dc0a6ce0
	github.com/hashicorp/go-hclog v0.0.0-20180402200405-69ff559dc25f
	github.com/hashicorp/go-plugin v0.0.0-20170828024549-3e6d191694b5
	github.com/hashicorp/yamux v0.0.0-20181012175058-2f1d1f20f75d
	github.com/jmespath/go-jmespath v0.0.0-20180206201540-c2b33e8439af
	github.com/mitchellh/go-testing-interface v0.0.0-20171004221916-a61a99592b77
	golang.org/x/net v0.0.0-20180522190444-9ef9f5bb98a1
	golang.org/x/text v0.3.0
	google.golang.org/genproto v0.0.0-20180518175338-11a468237815
	google.golang.org/grpc v1.12.0
)
