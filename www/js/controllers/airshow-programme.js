angular.module('airshow.programme.controller', [])

.controller('AirShowProgrammeCtrl', ['$scope', '$rootScope', '$ionicTabsDelegate', function($scope, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
		$rootScope.hideSubTitle = false;
		$rootScope.showAd = true;
	    // deselect tabs
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Air Show Programme"
	});

}]);