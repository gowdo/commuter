'use strict';

var _test = require('./test.js');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('app', ['ngMaterial']);
app.controller('ctrl', function ($scope, $element, $http) {
  $scope.listLoaded = false;

  $scope.load = function () {
    showLoader(true);
    $scope.lines = [];
    $http.get('https://api.tfl.gov.uk/Line/Mode/tube/Status').then(function (resp) {
      var data = resp.data;

      data.forEach(function (line) {
        line.lineStatuses.forEach(function (s) {
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
  };

  function showLoader(show) {
    $scope.listLoaded = !show;
    if (show) {
      (0, _jquery2.default)('.main').height((0, _jquery2.default)(window).height() - 56);
    } else {
      (0, _jquery2.default)('.main').height('auto');
    }
  }

  $scope.load();
});

// console.log(qq());


function test() {
  var gg = [];
}