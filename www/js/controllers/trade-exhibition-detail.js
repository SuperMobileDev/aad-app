angular.module('trade.exhibition.detail.controller', [])

.controller('TradeExhibitionDetailCtrl', ['$scope', '$rootScope', '$ionicTabsDelegate', '$localstorage', '$modal', '$ionicPopup', function($scope, $rootScope, $ionicTabsDelegate, $localstorage, $modal, $ionicPopup) {

	var exhibitorObject = $localstorage.getObject("exhibitor");

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    $rootScope.showSubHeaderExhibitor = true;
	    $rootScope.showAd = false;
	    // deselect tabs
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = exhibitorObject.title;

	    $scope.exhibitor = exhibitorObject;
	    $scope.eventTitle = exhibitorObject.title;

	    // initialize modal
	    $modal.calendarModalInit($scope, 'simple');

	    //Rate
		$scope.ratingsObject = {
		    iconOn : 'ion-ios-star',
		    iconOff : 'ion-ios-star-outline',
		    iconOnColor: 'rgb(200, 200, 100)',
		    iconOffColor:  'rgb(1, 135, 60)',
		    rating:  3,
		    minRating:1,
		    callback: function(rating) {
		      $scope.ratingsCallback(rating);
		    }
		};

		var chosenRating = 3;

		$scope.ratingsCallback = function(rating) {
			chosenRating = rating;
	  	};

		$rootScope.exhibitorRate = function() {
			$ionicPopup.show({
			    template: '<ionic-ratings ratingsobj="ratingsObject"></ionic-ratings>',
			    title: 'Rate The Exhibition',
			    subTitle: 'Please rate this exhibition according to your experience',
			    scope: $scope,
			    buttons: [
			      { text: 'Cancel' },
			      {
			        text: '<b>Rate</b>',
			        type: 'bg-green color-white',
			        onTap: function(e) {
			        	alert("You have rated "+$scope.eventTitle+" a star rating of "+chosenRating)
			        }
			      }
			    ]
			});
		}

		$modal.mapModalInit($scope, 'complex');

	});

	$scope.$on('$ionicView.leave', function() {
	    $rootScope.showSubHeaderExhibitor = false;
	});
	
}]);