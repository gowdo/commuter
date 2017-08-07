import {qq} from './test.js';

var app = angular.module('app', []);
app.controller('ctrl', ($scope, $element, $http) => {
  $scope.test = "Shanko";
  $scope.lines = [];
  $http.get('https://api.tfl.gov.uk/Line/Mode/tube/Status')
  .then((resp) => {
    const { data } = resp;
    console.log(data);
    data.forEach((line) => {
      line.lineStatuses.forEach(s => {
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
  const gg = [];

}