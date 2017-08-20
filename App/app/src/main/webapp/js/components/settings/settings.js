
import template from './settings.html';
import { TEAMS } from '../../constants/football'

var app = angular.module('app');
app.directive('settings', () => {
  return {
    restrict: 'E',
    template,
    controllerAs: 'settings',
    bindToController: true,
    controller: class SettingsController {
      constructor($scope, $element, $http) {
        this.$http = $http;
        this.teamId = null;
        this.TEAMS = TEAMS;
      }
      save() {
        console.log(this.teamId);
      }
    }
  }
});
