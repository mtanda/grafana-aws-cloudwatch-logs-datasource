import { QueryCtrl } from 'app/plugins/sdk';

export class AwsCloudWatchLogsDatasourceQueryCtrl extends QueryCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);

    this.scope = $scope;
    this.target.type = this.target.type || 'timeserie';
    this.target.region = this.target.region || '';
    this.target.logGroupName = this.target.logGroupName || '';
    this.target.logStreamNames = this.target.logStreamNames || [];
    this.target.filterPattern = this.target.filterPattern || '';
  }

  onChangeInternal() {
    this.panelCtrl.refresh();
  }
}

AwsCloudWatchLogsDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
