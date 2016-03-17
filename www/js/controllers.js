angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$rootScope', '$ionicHistory', '$ionicTabsDelegate', '$ionicSideMenuDelegate', '$state', '$ionicFilterBar', '$ionicNativeTransitions', '$cordovaInAppBrowser',  function($scope, $rootScope, $ionicHistory, $ionicTabsDelegate, $ionicSideMenuDelegate, $state, $ionicFilterBar, $ionicNativeTransitions, $cordovaInAppBrowser) {

	$rootScope.tabSelectIndex = function(index) {

		// if($ionicSideMenuDelegate.$getByHandle('main-menu').isOpen()) {
		// 	$ionicSideMenuDelegate.$getByHandle('main-menu').toggleLeft();
		// }		
		$ionicTabsDelegate.$getByHandle('general-tabs').select(index);
	  	// $ionicTabsDelegate.$getByHandle('general-tabs-menu').select(index);

	  	if(index === 0) {
	  		$ionicNativeTransitions.stateGo('app.general-enq', {}, {
			    "type": "fade",
			    "duration": 250, // in milliseconds (ms), default 250
			});
	  	} else if(index === 1) {
	  		$ionicNativeTransitions.stateGo('app.plan-visit', {}, {
			    "type": "fade",
			    "duration": 250, // in milliseconds (ms), default 250
			});
	  	} else if(index === 2) {
	  		$ionicNativeTransitions.stateGo('app.venue-map', {}, {
			    "type": "fade",
			    "duration": 250, // in milliseconds (ms), default 250
			});
	  	} else if(index === 3) {
	  		$ionicNativeTransitions.stateGo('app.social-media', {}, {
			    "type": "fade",
			    "duration": 250, // in milliseconds (ms), default 250
			});
	  	}

	};

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      EnableViewPortScale: 'yes'
    };
	$rootScope.browserOpen = function(url) {
		$cordovaInAppBrowser.open(url, '_blank', options);
	}

	$scope.$on('$ionicView.enter', function() {
		var currentPage = $ionicHistory.currentStateName();
		if(currentPage == "app.general-enq") {
	    	$ionicTabsDelegate.$getByHandle('general-tabs').select(0);
	  		// $ionicTabsDelegate.$getByHandle('general-tabs-menu').select(0);
	  	} else if(currentPage == "app.plan-visit") {
	  		$ionicTabsDelegate.$getByHandle('general-tabs').select(1);
	  		// $ionicTabsDelegate.$getByHandle('general-tabs-menu').select(1);
	  	} else if(currentPage == "app.venue-map") {
	  		$ionicTabsDelegate.$getByHandle('general-tabs').select(2);
	  		// $ionicTabsDelegate.$getByHandle('general-tabs-menu').select(2);
	  	} else if(currentPage == "app.social-media") {
	  		$ionicTabsDelegate.$getByHandle('general-tabs').select(3);
	  		// $ionicTabsDelegate.$getByHandle('general-tabs-menu').select(3);
	  	}
	});

	$scope.$watch(function () {
    	return $ionicSideMenuDelegate.getOpenRatio();
  	},function (ratio) {

      	if (ratio == 1){
        	var ionicFilterBar = angular.element(document.getElementsByClassName("filter-bar"));
        	var ionicFilterBackdrop = angular.element(document.getElementsByClassName("filter-bar-backdrop"));
        	ionicFilterBar.css({'left':'275px'});
        	ionicFilterBackdrop.css({'display':'none'});
      	}

    });

    $scope.$watch(function () {
    	return $ionicSideMenuDelegate.getOpenRatio();
  	},function (ratio) {

      	if (ratio == 0){
        	var ionicFilterBar = angular.element(document.getElementsByClassName("filter-bar"));
        	var ionicFilterBackdrop = angular.element(document.getElementsByClassName("filter-bar-backdrop"));
        	setTimeout(function() {
        		ionicFilterBar.css({'left':'0'});
        		ionicFilterBackdrop.css({'display':'block'});
        	},100)
        	
      	}

    });

	$scope.innapBrowser = function (value) {
        window.open(value, '_blank');
 	};

}]);