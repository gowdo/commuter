
import $ from 'jquery';

import template from './tube_list.html';
import { TUBE_URI } from '../../uri_constants'

var app = angular.module('app');
app.directive('tubeList', () => {
  return {
    restrict: 'E',
    template,
    controllerAs: 'tubeList',
    bindToController: true,
    controller: class TubeListController {
      constructor($scope, $element, $http) {
        this.$http = $http;
        this.lines= [];
        this.listLoaded = false;
        $scope.$on('loadPanels', () => { this.load(); });
      }

      load() {
        this.showLoader(true);
        this.lines = [];
        this.$http.get(TUBE_URI.LINE_STATUS)
        .then((resp) => {
          const { data } = resp;
          data.forEach((line) => {
            line.lineStatuses.forEach(s => {
              if (s.statusSeverity < 10) {
                this.lines.push({
                  id: line.id,
                  status: s.statusSeverityDescription,
                  statusSeverity: s.statusSeverity,
                  reason: s.reason
                });
              }
            });
          });

          // this.testData();
          console.log(this.lines);
          this.showLoader(false);
        });
      }

      showLoader(show) {
        this.listLoaded = !show;
      }

      testData() {
        for (var i = 0; i < 20; i++) {
          this.lines.push({
            id: 'Test',
            status: 'Bad',
            statusSeverity: 6,
            reason: 'test test'
          });
        }
      }
    }
  }
});
