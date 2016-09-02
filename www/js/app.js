// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular
	.module('starter', ['ionic', 'chart.js']);

angular
	.module('starter')
	.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('bubbles', {
				url: "/",
				templateUrl: "templates/bubbles.html",
				controller: 'BubbleCtrl'
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');

	});

angular
	.module('starter')
	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});

angular
	.module('starter')
	.config(['ChartJsProvider', function (ChartJsProvider) {
		'use strict';
		ChartJsProvider.setOptions({
			tooltips: {
				enabled: false
			}
		});
  }]);

angular
	.module('starter')
	.controller('BubbleCtrl', ['$scope', '$interval', function ($scope, $interval) {
		'use strict';

		Chart.defaults.global.elements.point.hoverRadius = 0;

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
		$interval(createChart, 1000);

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
			alert(state);
		};

		function createChart() {
			var howMany = 10;
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
			return Math.abs(randomScalingFactor()) / 2;
		}
  }]);
