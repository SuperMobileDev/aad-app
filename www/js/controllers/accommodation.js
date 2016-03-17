angular.module('accommodation.controller', [])

.controller('AccommodationCtrl', ['$scope', '$ionicHistory', '$rootScope', '$http', '$localstorage', '$state', function($scope, $ionicHistory, $rootScope, $http, $localstorage, $state) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
      $rootScope.showAd = false;
	    $rootScope.subheading = "Accommodation In Gauteng";
	});

	$http({
      method: 'GET',
      url: 'http://www.proportal.co.za/_mobi_app/accomm_search.php?province_id=3'
    }).then(function successCallback(response) {

      $scope.contentLoaded = true;
      var data = response.data;
      $scope.cities = response.data;

    }, function errorCallback(response) {

      navigator.notification.alert(
        'We regret that there is a problem retrieving the cities.',  // message
        null,                     // callback
        'Alert',                // title
        'Done'                  // buttonName
      );

    });

}]);