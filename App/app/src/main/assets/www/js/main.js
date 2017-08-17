import {qq} from './test.js';
import $ from 'jquery';

var app = angular.module('app', ['ngMaterial']);
app.controller('ctrl', ($scope, $element, $http) => {
  $scope.listLoaded = false;

  $scope.load = function() {
    showLoader(true);
    $scope.lines = [];
    $http.get('https://api.tfl.gov.uk/Line/Mode/tube/Status')
    .then((resp) => {
      const { data } = resp;
      data.forEach((line) => {
        line.lineStatuses.forEach(s => {
          if (s.statusSeverity < 10) {
            $scope.lines.push({
              id: line.id,
              status: s.statusSeverityDescription,
              statusSeverity: s.statusSeverity,
              reason: s.reason
            });
          }
        });
      });
      console.log($scope.lines);
      showLoader(false);
    });
  }

  function showLoader(show) {
    $scope.listLoaded = !show;
    if (show) {
      $('.main').height($(window).height() - 56);
    } else {
      $('.main').height('auto');
    }
  }

  $scope.load();
});

// console.log(qq());



function test() {
  const gg = [];

}
