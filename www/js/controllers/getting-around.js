angular.module('getting.around.controller', [])

.controller('GettingAroundCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$cordovaInAppBrowser', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $cordovaInAppBrowser) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = true;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.hideSubTitle = false;
	    $rootScope.subheading = "Getting Around";
	    $rootScope.showAd = true;
	});

	$scope.gautrainBusPrompt = function() {
		gautrainLinkOpen($cordovaInAppBrowser, 'http://join.gautrain.co.za/Buses.aspx');
	}

	$scope.gautrainPrompt = function() {
		gautrainLinkOpen($cordovaInAppBrowser, 'http://join.gautrain.co.za/Default.aspx');
	}

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      EnableViewPortScale: 'yes'
    };
	$scope.browserOpen = function(url) {
		$cordovaInAppBrowser.open(url, '_blank', options);
	}

}]);