
import moment from 'moment';
import testData from './test_data.json'
import template from './football.html';
import { FOOTBALL_URI } from '../../constants/football'

// http://api.football-data.org/v1/competitions/445/teams
// http://api.football-data.org/v1/teams/57/fixtures

var app = angular.module('app');
app.directive('footballStatus', () => {
  return {
    restrict: 'E',
    template,
    controllerAs: 'footballStatus',
    bindToController: true,
    controller: class TubeListController {
      constructor($scope, $element, $http) {
        this.$http = $http;
        this.fixtures= [];
        this.listLoaded = false;
        $scope.$on('loadPanels', () => { this.load(); });
      }

      load() {
        this.showLoader(true);
        this.fixtures= [];
        const config = {
          headers: {
            'X-Auth-Token': '334dcfcaa75f44d6a43ff61125621cdd'
          }
        };

        this.$http.get(FOOTBALL_URI.FIXTURES, config)
        .then((resp) => {
          // const data = testData;
          const { data } = resp;
          const period = 'month';
          console.log(data);
          const today = moment();
          const thisWeek = today.startOf(period).unix();
          data.fixtures.forEach(game => {
            const gameDate = moment(game.date);
            if(gameDate.startOf(period).unix() === thisWeek) {
              if(game.homeTeamName === 'Arsenal FC') {
                const fixture = {};
                const d = moment(game.date);
                if (period === 'month' || period === 'year') {
                  fixture.date = d.format('dddd, MMMM Do YYYY, HH:mm:ss');
                } else {
                  fixture.date = d.format('dddd, HH:mm');
                }
                fixture.homeTeamName = game.homeTeamName;
                fixture.awayTeamName = game.awayTeamName;
                fixture.status = game.status;
                fixture.result = game.result;
                this.fixtures.push(fixture);
              }
            }
          });

          console.log('fixtures', this.fixtures);
          this.showLoader(false);
        });
      }

      showLoader(show) {
        this.listLoaded = !show;
      }
    }
  }
});
