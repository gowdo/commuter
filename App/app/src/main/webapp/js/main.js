
var app = angular.module('app', ['ngMaterial']);
app.controller('ctrl', ($scope, $element, $http, $mdSidenav) => {
  $scope.listLoaded = false;

  $scope.load = function (params) {
    $scope.$broadcast('loadPanels');
  };

  $scope.toggleMenu = buildToggler('menu');

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          console.log("toggle " + navID + " is done");
        });
    };
  }

  window.setTimeout(() => { $scope.load(); }, 0);
});
