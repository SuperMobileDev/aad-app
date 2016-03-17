angular.module('general.enquiries.controller', [])

.controller('GeneralEnquiriesCtrl', ['$scope', '$ionicHistory', '$rootScope', '$file', function($scope, $ionicHistory, $rootScope, $file) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = true;
	    $rootScope.showAd = true;
	});

	$scope.submitProperty = function(propertyName, propertyData) {
		$file.createProperty("aad-data", propertyName, propertyData)
	}

	$scope.editProperty = function(propertyEditName, propertyEditData) {
		$file.editProperty("aad-data", propertyEditName, propertyEditData)
	}

	$scope.getFileObject = function() {
		var fileObject = $file.getFileObject("aad-data");
		console.log(fileObject);
	}

}]);