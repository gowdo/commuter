import {qq} from './test.js';
import $ from 'jquery';

var app = angular.module('app', ['ngMaterial']);
app.controller('ctrl', ($scope, $element, $http) => {
  $('.main').height($(window).height() - 56);
  $scope.listLoaded = false;

  $scope.load = function() {
    $scope.listLoaded = false;
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
      $scope.listLoaded = true;
    });
  }

  $scope.load();
});

// console.log(qq());



function test() {
  const gg = [];

}