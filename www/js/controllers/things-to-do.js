angular.module('things.to.do.controller', [])

.controller('ThingsToDoCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$cordovaInAppBrowser', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $cordovaInAppBrowser) {

	$scope.$on('$ionicView.enter', function() {
		$rootScope.hideSubTitle = false;
	    $rootScope.showSubHeader = true;
	    deselectTabs($ionicTabsDelegate);
	    
	    $rootScope.subheading = "Things To Do";
	    $rootScope.showAd = true;
	});

	$scope.gautrainPrompt = function() {
		gautrainLinkOpen($cordovaInAppBrowser, 'http://join.gautrain.co.za/Default.aspx');
	}

}]);