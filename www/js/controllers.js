(function(){

angular
	.module('game.controllers', ['ionic', 'chart.js']);

angular
	.module('game.controllers')
	.controller('WelcomeCtrl', ['$scope', function ($scope) {
		'use strict';
	}]);

angular
	.module('game.controllers')
	.config(['ChartJsProvider', function (ChartJsProvider) {
		'use strict';
		ChartJsProvider.setOptions({
			tooltips: {
				enabled: false
			}
		});
  }]);

angular
	.module('game.controllers')
	.controller('BubbleCtrl', ['$scope', '$interval', '$state', '$ionicPopup', function ($scope, $interval, $state, $ionicPopup) {
		'use strict';

		Chart.defaults.global.elements.point.hoverRadius = 0;

		$scope.showPopup = function () {
			$scope.data = {};

			var popup = $ionicPopup.show({
				title: $scope.message,
				scope: $scope,
				buttons: [{
					text: 'Replay',
					type: 'button-default',
					onTap: function (e) {
						$scope.theOne = null;
						$state.go('bubbles');
					}
				  }, {
					text: 'Back',
					type: 'button-positive',
					onTap: function (e) {
						$scope.theOne = null;
						$state.go('welcome');
					}
				  }]
			});
		};

		$scope.options = {
			resposive: true,
			maintainAspectRatio: false,
			scales: {
				xAxes: [{
					display: false,
					ticks: {
						max: 150,
						min: -150,
						stepSize: 1
					}
				}],
				yAxes: [{
					display: false,
					ticks: {
						max: 150,
						min: -150,
						stepSize: 1
					}
				}]
			}
		};

		createChart();
		$interval(createChart, 3000);

		$scope.whoClicked = function (points, event) {

			var theOne = [{
				x: 0,
				y: 0,
				r: 0
			}];

			for (var i = 0; i < points.length; i++) {
				// Get current Dataset
				var dataset = points[i]._datasetIndex;
				// Get current serie by dataset index
				var serie = $scope.series[dataset];

				if (serie == 'The One') {
					theOne.x = points[i]._model.x;
					theOne.y = points[i]._model.y;
					theOne.r = points[i]._model.radius;
				}
			}

			var hitboxX = theOne.x || 0;
			var hitboxY = theOne.y || 0;
			var hitboxR = theOne.r || 0;

			var hitboxMinX = hitboxX - hitboxR - 1;
			var hitboxMaxX = hitboxX + hitboxR + 1;

			var hitboxMinY = hitboxY - hitboxR - 1;
			var hitboxMaxY = hitboxY + hitboxR + 1;

			var clickX = event.offsetX;
			var clickY = event.offsetY;

			var validX = (clickX >= hitboxMinX) && (clickX <= hitboxMaxX);
			var validY = (clickY >= hitboxMinY) && (clickY <= hitboxMaxY);

			var valid = validX && validY;
			var state = valid ? "YOU FUCKING WIN" : "you loooooser";


			//console.log("Valid: x = " + validX + " and y = " + validY);
			//console.log("TheOne: (x,y,r) = (" + theOne.x + "," + theOne.y + "," + theOne.r + ")");
			//console.log("Valid: ([m < x < M] , [m < y < M]) = ([" + hitboxMinX + " < x < " + hitboxMaxX + "] , [" + hitboxMinY + " < y < " + hitboxMaxY + "])");
			//console.log("Click: (x,y) = (" + clickX + "," + clickY + ")");
			$scope.message = state;
			$scope.showPopup();
		};

		function createChart() {
			var howMany = 30;
			$scope.series = [];
			$scope.data = [];

			injectTheOne($scope.series, $scope.data);

			$scope.series.push(`Others`);

			for (var i = 0; i < howMany; i++)
				$scope.data.push([{
					x: randomScalingFactor(),
					y: randomScalingFactor(),
					r: randomRadius()
				}]);
		}

		function createTheOne() {
			var x = randomScalingFactor(),
				y = randomScalingFactor(),
				r = randomRadius(),
				theOne = [{
					x, y, r
				}];
			//console.log("The One: (x,y) = (" + x + "," + y + ")");
			return theOne;
		}

		function injectTheOne(series, data) {
			if ($scope.theOne == null)
				$scope.theOne = createTheOne();

			series.push(`The One`);
			data.push($scope.theOne);
		}

		function randomScalingFactor() {
			return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
		}

		function randomRadius() {
			return Math.abs(randomScalingFactor()) / 3;
		}
	}]);

}());