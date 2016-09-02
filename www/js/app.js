(function(){

angular
	.module('game', ['ionic', 'game.controllers']);

angular
	.module('game')
	.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('bubbles', {
				url: '/bubbles',
				views: {
					'template': {
						templateUrl: 'templates/bubbles.html',
						controller: 'BubbleCtrl'
					}
				}
			})
			.state('welcome', {
				url: '/welcome',
				views: {
					'template': {
						templateUrl: 'templates/welcome.html',
						controller: 'WelcomeCtrl'
					}
				}
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/welcome');

	});

angular
	.module('game')
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

}());