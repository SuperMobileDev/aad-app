angular.module('trade.exhibition.controller', [])

.controller('TradeExhibitionCtrl', ['$scope', '$rootScope', '$state', '$ionicTabsDelegate', '$calendar', '$localstorage', '$cordovaCalendar', '$file', '$ionicFilterBar', '$modal', '$ionicPopup', function($scope, $rootScope, $state, $ionicTabsDelegate, $calendar, $localstorage, $cordovaCalendar, $file, $ionicFilterBar, $modal, $ionicPopup) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeaderSearch = true;
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    $rootScope.hideAd = true;
	    $rootScope.showAd = false;
	    // deselect tabs
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Exhibitors";

	    $modal.calendarModalInit($scope, 'complex');

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

		$rootScope.exhibitorRate = function(eventTitle) {
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
			        	alert("You have rated "+eventTitle+" a star rating of "+chosenRating)
			        }
			      }
			    ]
			});
		}

		$modal.mapModalInit($scope, 'complex');
	});

	$scope.$on('$ionicView.leave', function() {
	    $rootScope.showSubHeaderSearch = false;
	    $rootScope.hideAd = false;
	});

	var exhibitorsArray;
	function buildExhibitors() {
		exhibitorsArray = [
			{
				id:"1",
				title:"Dummy Exhibitor 1",
				location:"Hangar 1, Stand 40",
				description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae urna sagittis, sodales eros nec, tempor orci. Morbi ac justo eu magna molestie sagittis et at orci. Nam fringilla neque ac magna ultrices, eget tincidunt elit convallis. Pellentesque facilisis massa eget sollicitudin bibendum. Integer convallis massa nec justo tristique, quis hendrerit augue scelerisque. Aliquam mattis volutpat scelerisque. Donec feugiat pulvinar ornare. Morbi porta tortor in magna mollis, in elementum metus viverra. Fusce rhoncus sagittis tellus, id lobortis arcu convallis at. Pellentesque augue augue, varius nec pharetra in, egestas at ipsum. Cras hendrerit nulla id tortor ultrices blandit. Pellentesque tincidunt lacus eget arcu interdum, varius cursus mauris euismod. Nunc fermentum enim a tortor porttitor, eu molestie lorem ultricies. Nullam at egestas sapien, a aliquam turpis."
			},
			{
				id:"2",
				title:"Dummy Exhibitor 2",
				location:"Hangar 2, Stand 43",
				description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae urna sagittis, sodales eros nec, tempor orci. Morbi ac justo eu magna molestie sagittis et at orci. Nam fringilla neque ac magna ultrices, eget tincidunt elit convallis. Pellentesque facilisis massa eget sollicitudin bibendum. Integer convallis massa nec justo tristique, quis hendrerit augue scelerisque. Aliquam mattis volutpat scelerisque. Donec feugiat pulvinar ornare. Morbi porta tortor in magna mollis, in elementum metus viverra. Fusce rhoncus sagittis tellus, id lobortis arcu convallis at. Pellentesque augue augue, varius nec pharetra in, egestas at ipsum. Cras hendrerit nulla id tortor ultrices blandit. Pellentesque tincidunt lacus eget arcu interdum, varius cursus mauris euismod. Nunc fermentum enim a tortor porttitor, eu molestie lorem ultricies. Nullam at egestas sapien, a aliquam turpis."
			},
			{
				id:"3",
				title:"Dummy Exhibitor 3",
				location:"Hangar 3, Stand 2",
				description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae urna sagittis, sodales eros nec, tempor orci. Morbi ac justo eu magna molestie sagittis et at orci. Nam fringilla neque ac magna ultrices, eget tincidunt elit convallis. Pellentesque facilisis massa eget sollicitudin bibendum. Integer convallis massa nec justo tristique, quis hendrerit augue scelerisque. Aliquam mattis volutpat scelerisque. Donec feugiat pulvinar ornare. Morbi porta tortor in magna mollis, in elementum metus viverra. Fusce rhoncus sagittis tellus, id lobortis arcu convallis at. Pellentesque augue augue, varius nec pharetra in, egestas at ipsum. Cras hendrerit nulla id tortor ultrices blandit. Pellentesque tincidunt lacus eget arcu interdum, varius cursus mauris euismod. Nunc fermentum enim a tortor porttitor, eu molestie lorem ultricies. Nullam at egestas sapien, a aliquam turpis. Morbi ac fringilla orci. Nunc sit amet turpis mattis, maximus mi in, dapibus lectus. Suspendisse in lectus eu metus auctor bibendum sed eu lectus. Sed sed posuere velit. Pellentesque scelerisque dictum elementum. Phasellus malesuada erat placerat vestibulum posuere. Sed varius tincidunt arcu ut malesuada. Praesent ac turpis nec tortor tempor placerat sed varius metus. Nulla finibus ligula libero, sit amet fringilla lorem accumsan in. Donec cursus efficitur tempus."
			},
			{
				id:"4",
				title:"Dummy Exhibitor 4",
				location:"Hangar 4, Stand 33",
				description:"Aenean quam neque, facilisis nec egestas non, scelerisque id velit. Suspendisse sodales, lacus nec tincidunt facilisis, diam lectus pretium libero, ut tincidunt sem sem vitae nisi. Sed accumsan leo sit amet ante vehicula egestas. Donec ut porttitor lorem, non luctus enim. Proin justo sem, hendrerit vitae enim hendrerit, tempus tempus lectus. Fusce a eros sed massa volutpat mollis ac in orci. Maecenas sit amet convallis lorem. Pellentesque tincidunt justo id metus fringilla, ac blandit lectus pharetra. Maecenas dictum ligula eu odio accumsan tincidunt. Sed venenatis rhoncus dolor ut iaculis. Quisque non ex quam. In maximus sit amet turpis quis molestie."
			}
		];

		$scope.exhibitorsArray = exhibitorsArray;
	}

	buildExhibitors();

	$scope.viewExhibitor = function(id){

		for(var x = 0; x < exhibitorsArray.length; x++) {
			if (id == exhibitorsArray[x].id) {
				$localstorage.setObject("exhibitor", exhibitorsArray[x]);
			}
		}

		$state.go('app.trade-exhibition-detail');
		
	};

	$rootScope.showSearchBar = function() {
		$ionicFilterBar.show();
	}

}]);