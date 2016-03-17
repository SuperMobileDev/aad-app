angular.module('car.rental.controller', [])

.controller('CarRentalCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$cordovaInAppBrowser', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $cordovaInAppBrowser) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = true;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.hideSubTitle = false;
	    $rootScope.subheading = "Car Rental";
	    $rootScope.showAd = true;
	});

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      EnableViewPortScale: 'yes'
    };
	$scope.carRentalOpen = function(url) {
		$cordovaInAppBrowser.open(url, '_blank', options);
	}

}]);