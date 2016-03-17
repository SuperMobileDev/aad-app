angular.module('home.controller', [])

.controller('HomeCtrl', ['$scope', '$rootScope', '$ionicTabsDelegate', '$timeout', function($scope, $rootScope, $ionicTabsDelegate, $timeout) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = false;	    
	    // deselect tabs
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.showAd = true;
	    $rootScope.home = true;

	    // setTimeout(function(){
	    //   document.getElementById("custom-overlay").style.display = "none";      
	    // }, 4000);
	});

	$scope.$on('$ionicView.leave', function() {
		$rootScope.home = false;
	});

}]);