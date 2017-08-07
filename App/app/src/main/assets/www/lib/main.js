'use strict';

var _test = require('./test.js');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('app', ['ngMaterial']);
app.controller('ctrl', function ($scope, $element, $http) {
  (0, _jquery2.default)('.main').height((0, _jquery2.default)(window).height() - 56);
  $scope.listLoaded = false;

  $scope.load = function () {
    $scope.listLoaded = false;
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
      $scope.listLoaded = true;
    });
  };

  $scope.load();
});

// console.log(qq());


function test() {
  var gg = [];
}