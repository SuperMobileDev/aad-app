angular.module('directions.detail.controller', [])

.controller('DirectionsDetailCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$stateParams', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $stateParams) {

	var airport;
	if($stateParams.airport == 'orthambo') {
		airport = 'From OR Thambo Airport'
		$scope.orthambo = true;
	} else if ($stateParams.airport == 'wonderboom') {
		airport = 'From Wonderboom Airport'
		$scope.wonderboom = true;
	} else if ($stateParams.airport == 'lanseria') {
		airport = 'From Lanseria Airport'
		$scope.lanseria = true;
	}

	$scope.$on('$ionicView.enter', function() {
		$rootScope.hideSubTitle = false;
	    $rootScope.showSubHeader = true;	    
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = airport;
	    $rootScope.showAd = false;
	});

	// -25.825048, 28.223029

	$scope.openGps = function(lat, long) {

		if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {

			function onConfirm(buttonIndex) {
				if (buttonIndex == 1)
			    	window.open('http://maps.apple.com/?q='+lat+','+long+'', '_system', 'location=yes');
			    else 
			    	window.open('http://maps.google.com/?q='+lat+','+long+'', '_system', 'location=yes');
			}

			navigator.notification.confirm(
			    'Choose a method to view the location',  // message
			    onConfirm,                  // callback to invoke
			    'Choose GPS',            // title
			    ['Apple Maps','Google Maps']
			);
		      
		}
		else if(ionic.Platform.isAndroid()) {
		    // window.open('http://maps.google.com/?q='+lat+','+long+'', '_system', 'location=yes')
		    window.open('geo:0,0?q='+lat+','+long+'(Label+Name)"', '_system', 'location=yes')
		}

	}

}]);