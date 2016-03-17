angular.module('accommodation.city.chosen.controller', [])

.controller('AccommodationCityChosenCtrl', ['$scope', '$ionicHistory', '$rootScope', '$http', '$localstorage', '$stateParams', '$timeout', function($scope, $ionicHistory, $rootScope, $http, $localstorage, $stateParams, $timeout) {

	$scope.$on('$ionicView.enter', function() {

	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
      $rootScope.showAd = false;
	    
	    $rootScope.subheading = $stateParams.cityName;
	    
	});

  $timeout(function() {
  	$http({
      method: 'GET',
      url: 'http://www.proportal.co.za/_mobi_app/accomm.php?city_id='+$stateParams.cityId
    }).then(function successCallback(response) {

    	$scope.contentLoaded = true;
    	$scope.accommodations = response.data  

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