angular.module('venue.map.controller', [])

.controller('VenueMapCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicScrollDelegate', function($scope, $ionicHistory, $rootScope, $ionicScrollDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = true;

	    $rootScope.hideAd = true;

	    $ionicScrollDelegate.$getByHandle('main-map-scroll').zoomTo(0.2);
	    $rootScope.showAd = false;

	});

}]);