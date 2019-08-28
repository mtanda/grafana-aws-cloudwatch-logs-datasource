export class AwsCloudWatchLogsAnnotationsQueryCtrl {
  scope: any;
  static templateUrl = 'partials/annotations.editor.html';

  /** @ngInject */
  constructor($scope, $injector) {
    this.scope = $scope;
  }
}
