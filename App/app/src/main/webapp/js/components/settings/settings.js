
import template from './settings.html';
import { TEAMS, PERIODS } from '../../constants/football'

var app = angular.module('app');
app.directive('settings', function() {
  return {
    restrict: 'E',
    template,
    controllerAs: 'settings',
    bindToController: true,
    controller: class SettingsController {
      constructor($scope, $element, $http, appSettings) {
        this.$http = $http;
        this.appSettings = appSettings;
        this.team = appSettings.getTeam();
        this.period = appSettings.getPeriod();
        this.TEAMS = TEAMS;
        this.PERIODS = PERIODS;
      }

      save() {
        this.appSettings.setPeriod(this.period);
        this.appSettings.setTeam(this.team);
        console.log(this.team);
        console.log(this.period);
      }
    }
  }
})
.service('appSettings', function() {
  let SETTINGS = null;
  try {
    const settingsString = window.localStorage.getItem('SETTINGS');
    SETTINGS = JSON.parse(settingsString);
  } catch(e) {
    console.error('Could not load settings.',e);
    SETTINGS = null;
  }

  if (SETTINGS === null) {
    SETTINGS = {
      period: PERIODS[0],
      team: TEAMS[0]
    };
    storeSettings();
  }

  this.saveSettings = function () {
    storeSettings();
  };

  this.setPeriod = function (p) {
    SETTINGS.period = p;
  };
  this.getPeriod = function () {
    return SETTINGS.period;
  };

  this.setTeam = function (t) {
    SETTINGS.team = t;
  };
  this.getTeam = function () {
    return SETTINGS.team;
  };

  function storeSettings() {
    window.localStorage.setItem('SETTINGS', JSON.stringify(SETTINGS));
  }

})
