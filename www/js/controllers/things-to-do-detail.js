angular.module('things.to.do.detail.controller', [])

.controller('ThingsToDoDetailCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$cordovaInAppBrowser', '$stateParams', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $cordovaInAppBrowser, $stateParams) {

	var province;

	if($stateParams.province == "pta") {
		$scope.pta = true;
		province = "Things to do Pretoria";
	} else if($stateParams.province == "mp") {
		$scope.mp = true;
		province = "Things to do Mpumalanga";
	} else if($stateParams.province == "nw") {
		$scope.nw = true;
		province = "Things to do North West";
	} else if($stateParams.province == "fs") {
		$scope.fs = true;
		province = "Things to do Free State";
	}

	$scope.$on('$ionicView.enter', function() {
		$rootScope.hideSubTitle = false;
	    $rootScope.showSubHeader = true;
	    deselectTabs($ionicTabsDelegate);
	    
	    $rootScope.subheading = province;
	    $rootScope.showAd = false;
	});

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      EnableViewPortScale: 'yes'
    };
	$scope.browserOpen = function(url) {
		$cordovaInAppBrowser.open(url, '_blank', options);
	}

	$scope.gpsOpen = function(query) {
		openGpsQuery($cordovaInAppBrowser, query)
	}

}]);