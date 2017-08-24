
import moment from 'moment';
import testData from './test_data.json'
import template from './football.html';
import { getFootballUri } from '../../constants/football'

// http://api.football-data.org/v1/competitions/445/teams
// http://api.football-data.org/v1/teams/57/fixtures

var app = angular.module('app');
app.directive('footballStatus', function() {
  return {
    restrict: 'E',
    template,
    controllerAs: 'footballStatus',
    bindToController: true,
    controller: class TubeListController {
      constructor($scope, $element, $http, appSettings) {
        this.$http = $http;
        this.appSettings = appSettings;
        this.fixtures= [];
        this.listLoaded = false;
        this.PERIOD = null;
        this.TEAM = null;

        $scope.$on('loadPanels', () => { this.load(); });
      }

      load() {
        this.showLoader(true);
        this.fixtures= [];
        this.PERIOD = this.appSettings.getPeriod();
        this.TEAM = this.appSettings.getTeam();
        const config = {
          headers: {
            'X-Auth-Token': '334dcfcaa75f44d6a43ff61125621cdd'
          }
        };

        this.$http.get(getFootballUri(this.TEAM), config)
        .then((resp) => {
          // const data = testData;
          const { data } = resp;
          const period = 'year';
          // console.log(data);
          // const today = moment();
          // const thisPeriod = today.startOf(period).unix();

          const nowSeconds = moment().unix();
          const futureSeconds = (nowSeconds + this.PERIOD.days * 24 * 60 * 60);

          data.fixtures.forEach(game => {
            const gameDate = moment(game.date);
            // if(gameDate.startOf(period).unix() === thisPeriod) {
            if(gameDate.unix() > nowSeconds && gameDate.unix() <= futureSeconds) {
              if(game.homeTeamName === this.TEAM.name) {
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
