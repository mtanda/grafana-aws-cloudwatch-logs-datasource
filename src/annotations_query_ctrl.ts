export class AwsCloudWatchLogsAnnotationsQueryCtrl {
  scope: any;
  static templateUrl = 'annotations.editor.html';

  /** @ngInject */
  constructor($scope, $injector) {
    this.scope = $scope;
  }
}
