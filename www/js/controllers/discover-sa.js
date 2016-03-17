angular.module('discover.sa.controller', [])

.controller('DiscoverSaCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = true;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.showAd = true;
	});

}]);