
var app = angular.module('app', ['ngMaterial']);
app.controller('ctrl', ($scope, $element, $http, $mdSidenav, appSettings) => {
  $scope.listLoaded = false;

  $scope.load = function () {
    $scope.$broadcast('loadPanels');
  };

  $scope.toggleMenu = buildToggler('menu');

  function buildToggler(navID) {
    return function() {

      const sd = $mdSidenav(navID);
      sd.onClose(() => {
        $scope.load();
      });

      sd.toggle()
      .then(() => {
        // console.log("toggle " + navID + " is done");
      })


    };
  }

  window.setTimeout(() => { $scope.load(); }, 0);
});
