angular.module('accommodation.city.chosen.detail.controller', [])

.controller('AccommodationCityChosenDetailCtrl', ['$scope', '$ionicHistory', '$rootScope', '$http', '$stateParams', '$timeout', '$ionicScrollDelegate', '$cordovaInAppBrowser', function($scope, $ionicHistory, $rootScope, $http, $stateParams, $timeout, $ionicScrollDelegate, $cordovaInAppBrowser) {

	$scope.$on('$ionicView.enter', function() {

	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;

	    $rootScope.subheading = $stateParams.accommName;
	    selectAccommTab(0, false);

	    $rootScope.showAd = false;
	    
	});

	function selectAccommTab(index, loadType){

		if(loadType) {
			$ionicScrollDelegate.scrollTo(0, 200, true);
		}

		var tabs = angular.element(document.getElementsByClassName("accomm-tab"));
		tabs.removeClass('bg-dark-red-imp');

		var tabItem = angular.element(document.getElementById("accomm-tab-"+index));
		tabItem.addClass('bg-dark-red-imp');

		if(index == 0) {
			$scope.accommodationShow = true;
			$scope.facilitiesShow = false;
			$scope.activitiesShow = false;
		} else if(index == 1) {
			$scope.accommodationShow = false;
			$scope.facilitiesShow = true;
			$scope.activitiesShow = false;
		} else if(index == 2) {
			$scope.accommodationShow = false;
			$scope.facilitiesShow = false;
			$scope.activitiesShow = true;
		}
	}

	$timeout(function() {
		$http({
	      method: 'GET',
	      url: 'http://www.proportal.co.za/_mobi_app/accomm_detail.php?accomm_id='+$stateParams.accommId
	    }).then(function successCallback(response) {
			$scope.contentLoaded = true;
	    	var accommObject = response.data[0];
	    	$scope.accommodation = accommObject; 

	    	var accommGalStr = accommObject.g;
	    	var accommGalArray = accommGalStr.split(",");
	    	$scope.accomGallery = accommGalArray;

	    	if(accommObject.pl == "0.00") {
	    		$scope.priceShow = false;
	    	} else {
	    		$scope.priceShow = true;
	    	}

	    	var amenitiesData = accommObject.amen;
			if(amenitiesData != null) {
				$scope.amenities = amenitiesData.split(",");
			} else {
				$scope.amenities = ["Not available"];
			}    

			var facilitiesData = accommObject.fac;
			if(facilitiesData != null) {
				$scope.facilities = facilitiesData.split(",");
			} else {
				$scope.facilities = ["Not available"];
			}   

			var activitiesData = accommObject.act;
			if(activitiesData != null) {
				$scope.activities = activitiesData.split(",");
			} else {
				$scope.activities = ["Not available"];
			}

			// sanitize number
		    var number = accommObject.con;
		    $scope.number = number.replace(/[^a-z0-9\s]/gi, '').substring(0, 10);

	    	$scope.imgLoaded = function(id) {
		        var descriptionWrap = angular.element(document.getElementById(id));
		        descriptionWrap.css({"display":"none"})
		    }

		    $scope.selectTab = function(index, loadType) {
				selectAccommTab(index, loadType);
		    }

		    $scope.openMaps = function(lat, long) {
		    	openGps(lat, long);
	     	}

	    }, function errorCallback(response) {

	      navigator.notification.alert(
	        'We regret that there is a problem retrieving the accommodations, please try again later.',  // message
	        null,                     // callback
	        'Alert',                // title
	        'Done'                  // buttonName
	      );

	    });

    }, 500);

}]);