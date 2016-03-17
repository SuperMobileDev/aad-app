angular.module('park.ride.controller', [])

.controller('ParkRideCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Park & Ride Venues"
	    $rootScope.showAd = true;
	});

	$scope.openMaps = function(lat, long) {
		openGps(lat, long);
	}

}]);