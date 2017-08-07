'use strict';

var _test = require('./test.js');

var app = angular.module('app', []);
app.controller('ctrl', function ($scope, $element, $http) {
  $scope.test = "Shanko";
  $scope.lines = [];
  $http.get('https://api.tfl.gov.uk/Line/Mode/tube/Status').then(function (resp) {
    var data = resp.data;

    console.log(data);
    data.forEach(function (line) {
      line.lineStatuses.forEach(function (s) {
        $scope.lines.push({
          id: line.id,
          status: s.statusSeverityDescription,
          statusSeverity: s.statusSeverity,
          reason: s.reason
        });
      });
    });
  });
});

// console.log(qq());


function test() {
  var gg = [];
}