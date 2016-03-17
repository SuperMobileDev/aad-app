angular.module('at.event.controller', [])

.controller('AtEventCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = true;
	    $rootScope.showAd = true;
	    // deselect tabs
	    deselectTabs($ionicTabsDelegate);
	});

}]);