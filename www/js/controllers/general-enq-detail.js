angular.module('general.enquiries.detail.controller', [])

.controller('GeneralEnquiriesDetailCtrl', ['$scope', '$ionicHistory', '$rootScope', '$file', '$stateParams', '$http', function($scope, $ionicHistory, $rootScope, $file, $stateParams, $http) {

	var pageType;
	var pageTitle;
	var subjectType;

	if ($stateParams.enqType == 'exhibition') {
		pageType = "exhibitor";
		pageTitle = "Exhibition Enquiries";
		subjectType = "Exhibition Enquiry";

	} else if($stateParams.enqType == 'airshow') {
		pageType = "airshow";
		pageTitle = "Air Show Enquiries";
		subjectType = "Airshow Enquiry";
	}

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    $rootScope.showAd = false;
	    $rootScope.subheading = pageTitle;
	});

	$scope.firstName = "";
	$scope.email = "";
	$scope.message = "";

	$scope.checkInput = function(type, input) {
		if (type == 'name') {
			if (input.length < 3 || input.length == 0) {
				$scope.nameError = true;
			} else {
				$scope.nameError = false;
			}
		}
		if (type == 'email') {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!re.test(input) || input == 0) {
				$scope.emailError = true;
			} else {
				$scope.emailError = false;
			}
		}
		if (type == 'message') {
			if (input == 0) {
				$scope.messageError = true;
			} else {
				$scope.messageError = false;
			}
		}
	}

	$scope.submitContactForm = function(name, email, number, message) {

		$scope.checkInput('name', name);
		$scope.checkInput('email', email);
		$scope.checkInput('message', message);

		if(!$scope.nameError && !$scope.emailError && !$scope.messageError) {

			$scope.showSending = true;

			var contactUsFormObj = {
				subject: subjectType,
				name: name,
				email: email,
				number: number,
				message: message
			}

			$http({
	          method: 'POST',
	          url: 'http://www.aadexpo.co.za/portal/index.php?post',
	          data: contactUsFormObj,
	          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	        }).then(function successCallback(response) {

	        	console.log(response);

	          $scope.showSending = false;

	          // function enquireSuccess() {
	          //   cordova.plugins.Keyboard.close();
	          // }

	          navigator.notification.alert(
	            'Your email has been sent successfully.',  // message
	            null,                     // callback
	            'Alert',                // title
	            'Done'                  // buttonName
	          );

	        }, function errorCallback(response) {

	          navigator.notification.alert(
	            'We regret that there is was a problem sending your email. Please try again later',  // message
	            null,                     // callback
	            'Alert',                // title
	            'Done'                  // buttonName
	          );

	        });

		} else {
			navigator.notification.alert(
			    'Please correct the contact form for before submitting it again',  // message
			    null,         // callback
			    'Input Fields Missing Or Incorrect',            // title
			    'Done'                  // buttonName
			);
		}
	}

}]);