angular.module('fun.activities.controller', [])

.controller('FunActivitiesCtrl', ['$scope', '$rootScope', '$ionicTabsDelegate', function($scope, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    // deselect tabs
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Fun Activities"
	    $rootScope.showAd = true;
	});

}]);