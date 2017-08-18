
var app = angular.module('app', ['ngMaterial']);
app.controller('ctrl', ($scope, $element, $http) => {
  $scope.listLoaded = false;

  $scope.load = function (params) {
    $scope.$broadcast('loadPanels');
  };

  window.setTimeout(() => { $scope.load(); }, 0);
});
