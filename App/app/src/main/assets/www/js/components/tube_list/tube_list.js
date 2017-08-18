
import $ from 'jquery';

import template from './tube_list.html';

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
        this.$http.get('https://api.tfl.gov.uk/Line/Mode/tube/Status')
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
          console.log(this.lines);
          this.showLoader(false);
        });
      }

      showLoader(show) {
        this.listLoaded = !show;
        if (show) {
          $('.main').height('auto');
        } else {
          $('.main').height($(window).height() - 56);
        }
      }
    }
  }
});
