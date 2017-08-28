
import testData from './test_data.json'
import template from './tube_list.html';
import { TUBE_URI } from '../../constants/tube'

var app = angular.module('app');
app.directive('tubeList', function() {
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
          // const data = testData;
          data.forEach((line) => {
            line.lineStatuses.forEach(s => {
              if (s.statusSeverity < 10) {
                const existingLine = this.lines.filter(l => l.id === line.id);
                const status = {
                  status: s.statusSeverityDescription,
                  statusSeverity: s.statusSeverity,
                  reason: s.reason
                };
                if (existingLine.length) {
                  existingLine[0].statuses.push(status);
                } else {
                  this.lines.push({
                    id: line.id,
                    name: line.name,
                    statuses: [status]
                  });
                }
              }
            });
          });

          // this.testData();
          console.log('lines',this.lines);
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
