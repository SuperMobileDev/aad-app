angular.module('social.media.info.controller', [])

.controller('SocialMediaInfoCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Social Media Information";
	    $rootScope.showAd = true;
	});

}]);