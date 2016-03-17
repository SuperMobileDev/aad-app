angular.module('parking.controller', [])

.controller('ParkingCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$cordovaInAppBrowser', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $cordovaInAppBrowser) {

	$scope.$on('$ionicView.enter', function() {
		$rootScope.hideSubTitle = false;
	    $rootScope.showSubHeader = true;
	    deselectTabs($ionicTabsDelegate);
	    
	    $rootScope.subheading = "Parking & Surrounding Road";
	    $rootScope.showAd = true;
	});

	$scope.gautrainPrompt = function() {
		gautrainLinkOpen($cordovaInAppBrowser, 'http://join.gautrain.co.za/Default.aspx');
	}

}]);