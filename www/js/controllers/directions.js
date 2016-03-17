angular.module('directions.controller', [])

.controller('DirectionsCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
		$rootScope.hideSubTitle = false;
	    $rootScope.showSubHeader = true;	    
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Directions"
	    $rootScope.showAd = true;
	});

}]);