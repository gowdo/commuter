'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _tube_list = require('./tube_list.html');

var _tube_list2 = _interopRequireDefault(_tube_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('app');
app.directive('tubeList', function () {
  return {
    restrict: 'E',
    template: _tube_list2.default,
    controllerAs: 'tubeList',
    bindToController: true,
    controller: function () {
      function TubeListController($scope, $element, $http) {
        var _this = this;

        _classCallCheck(this, TubeListController);

        this.$http = $http;
        this.lines = [];
        this.listLoaded = false;
        $scope.$on('loadPanels', function () {
          _this.load();
        });
      }

      _createClass(TubeListController, [{
        key: 'load',
        value: function load() {
          var _this2 = this;

          this.showLoader(true);
          this.lines = [];
          this.$http.get('https://api.tfl.gov.uk/Line/Mode/tube/Status').then(function (resp) {
            var data = resp.data;

            data.forEach(function (line) {
              line.lineStatuses.forEach(function (s) {
                if (s.statusSeverity < 10) {
                  _this2.lines.push({
                    id: line.id,
                    status: s.statusSeverityDescription,
                    statusSeverity: s.statusSeverity,
                    reason: s.reason
                  });
                }
              });
            });
            console.log(_this2.lines);
            _this2.showLoader(false);
          });
        }
      }, {
        key: 'showLoader',
        value: function showLoader(show) {
          this.listLoaded = !show;
          if (show) {
            (0, _jquery2.default)('.main').height('auto');
          } else {
            (0, _jquery2.default)('.main').height((0, _jquery2.default)(window).height() - 56);
          }
        }
      }]);

      return TubeListController;
    }()
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2pzL2NvbXBvbmVudHMvdHViZV9saXN0L3R1YmVfbGlzdC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJ0ZW1wbGF0ZSIsImNvbnRyb2xsZXJBcyIsImJpbmRUb0NvbnRyb2xsZXIiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiJGVsZW1lbnQiLCIkaHR0cCIsImxpbmVzIiwibGlzdExvYWRlZCIsIiRvbiIsImxvYWQiLCJzaG93TG9hZGVyIiwiZ2V0IiwidGhlbiIsInJlc3AiLCJkYXRhIiwiZm9yRWFjaCIsImxpbmUiLCJsaW5lU3RhdHVzZXMiLCJzIiwic3RhdHVzU2V2ZXJpdHkiLCJwdXNoIiwiaWQiLCJzdGF0dXMiLCJzdGF0dXNTZXZlcml0eURlc2NyaXB0aW9uIiwicmVhc29uIiwiY29uc29sZSIsImxvZyIsInNob3ciLCJoZWlnaHQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7OztBQUVBLElBQUlBLE1BQU1DLFFBQVFDLE1BQVIsQ0FBZSxLQUFmLENBQVY7QUFDQUYsSUFBSUcsU0FBSixDQUFjLFVBQWQsRUFBMEIsWUFBTTtBQUM5QixTQUFPO0FBQ0xDLGNBQVUsR0FETDtBQUVMQyxpQ0FGSztBQUdMQyxrQkFBYyxVQUhUO0FBSUxDLHNCQUFrQixJQUpiO0FBS0xDO0FBQ0Usa0NBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQThCQyxLQUE5QixFQUFxQztBQUFBOztBQUFBOztBQUNuQyxhQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLQyxLQUFMLEdBQVksRUFBWjtBQUNBLGFBQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDQUosZUFBT0ssR0FBUCxDQUFXLFlBQVgsRUFBeUIsWUFBTTtBQUFFLGdCQUFLQyxJQUFMO0FBQWMsU0FBL0M7QUFDRDs7QUFOSDtBQUFBO0FBQUEsK0JBT1M7QUFBQTs7QUFDTCxlQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0EsZUFBS0osS0FBTCxHQUFhLEVBQWI7QUFDQSxlQUFLRCxLQUFMLENBQVdNLEdBQVgsQ0FBZSw4Q0FBZixFQUNDQyxJQURELENBQ00sVUFBQ0MsSUFBRCxFQUFVO0FBQUEsZ0JBQ05DLElBRE0sR0FDR0QsSUFESCxDQUNOQyxJQURNOztBQUVkQSxpQkFBS0MsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQkEsbUJBQUtDLFlBQUwsQ0FBa0JGLE9BQWxCLENBQTBCLGFBQUs7QUFDN0Isb0JBQUlHLEVBQUVDLGNBQUYsR0FBbUIsRUFBdkIsRUFBMkI7QUFDekIseUJBQUtiLEtBQUwsQ0FBV2MsSUFBWCxDQUFnQjtBQUNkQyx3QkFBSUwsS0FBS0ssRUFESztBQUVkQyw0QkFBUUosRUFBRUsseUJBRkk7QUFHZEosb0NBQWdCRCxFQUFFQyxjQUhKO0FBSWRLLDRCQUFRTixFQUFFTTtBQUpJLG1CQUFoQjtBQU1EO0FBQ0YsZUFURDtBQVVELGFBWEQ7QUFZQUMsb0JBQVFDLEdBQVIsQ0FBWSxPQUFLcEIsS0FBakI7QUFDQSxtQkFBS0ksVUFBTCxDQUFnQixLQUFoQjtBQUNELFdBakJEO0FBa0JEO0FBNUJIO0FBQUE7QUFBQSxtQ0E4QmFpQixJQTlCYixFQThCbUI7QUFDZixlQUFLcEIsVUFBTCxHQUFrQixDQUFDb0IsSUFBbkI7QUFDQSxjQUFJQSxJQUFKLEVBQVU7QUFDUixrQ0FBRSxPQUFGLEVBQVdDLE1BQVgsQ0FBa0IsTUFBbEI7QUFDRCxXQUZELE1BRU87QUFDTCxrQ0FBRSxPQUFGLEVBQVdBLE1BQVgsQ0FBa0Isc0JBQUVDLE1BQUYsRUFBVUQsTUFBVixLQUFxQixFQUF2QztBQUNEO0FBQ0Y7QUFyQ0g7O0FBQUE7QUFBQTtBQUxLLEdBQVA7QUE2Q0QsQ0E5Q0QiLCJmaWxlIjoidHViZV9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90dWJlX2xpc3QuaHRtbCc7XG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyk7XG5hcHAuZGlyZWN0aXZlKCd0dWJlTGlzdCcsICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlLFxuICAgIGNvbnRyb2xsZXJBczogJ3R1YmVMaXN0JyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IGNsYXNzIFR1YmVMaXN0Q29udHJvbGxlciB7XG4gICAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRlbGVtZW50LCAkaHR0cCkge1xuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgIHRoaXMubGluZXM9IFtdO1xuICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLiRvbignbG9hZFBhbmVscycsICgpID0+IHsgdGhpcy5sb2FkKCk7IH0pO1xuICAgICAgfVxuICAgICAgbG9hZCgpIHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyKHRydWUpO1xuICAgICAgICB0aGlzLmxpbmVzID0gW107XG4gICAgICAgIHRoaXMuJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL0xpbmUvTW9kZS90dWJlL1N0YXR1cycpXG4gICAgICAgIC50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSByZXNwO1xuICAgICAgICAgIGRhdGEuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgICAgICAgbGluZS5saW5lU3RhdHVzZXMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgaWYgKHMuc3RhdHVzU2V2ZXJpdHkgPCAxMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBpZDogbGluZS5pZCxcbiAgICAgICAgICAgICAgICAgIHN0YXR1czogcy5zdGF0dXNTZXZlcml0eURlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgc3RhdHVzU2V2ZXJpdHk6IHMuc3RhdHVzU2V2ZXJpdHksXG4gICAgICAgICAgICAgICAgICByZWFzb246IHMucmVhc29uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGluZXMpO1xuICAgICAgICAgIHRoaXMuc2hvd0xvYWRlcihmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBzaG93TG9hZGVyKHNob3cpIHtcbiAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gIXNob3c7XG4gICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgJCgnLm1haW4nKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKCcubWFpbicpLmhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkgLSA1Nik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuIl19