angular.module('getting.there.controller', [])

.controller('GettingThereCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$cordovaInAppBrowser', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $cordovaInAppBrowser) {

	$scope.$on('$ionicView.enter', function() {
		$rootScope.hideSubTitle = true;
	    $rootScope.showSubHeader = true;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.showAd = true;
	});

	$scope.gautrainPrompt = function() {
		gautrainLinkOpen($cordovaInAppBrowser, 'http://join.gautrain.co.za/Default.aspx');
	}

}]);