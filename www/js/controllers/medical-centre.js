angular.module('medical.centre.controller', [])

.controller('MedicalCentreCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Medical Centre"
	    $rootScope.showAd = true;
	});

}]);