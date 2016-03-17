angular.module('rules.controller', [])

.controller('RulesCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "AAD Expo Rules";
	    $rootScope.showAd = false;
	});

}]);