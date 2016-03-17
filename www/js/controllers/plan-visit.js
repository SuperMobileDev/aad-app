angular.module('plan.visit.controller', [])

.controller('PlanVisitCtrl', ['$scope', '$ionicHistory', '$rootScope', '$location', '$ionicScrollDelegate', '$timeout', '$calendar', '$ionicTabsDelegate', '$ionicNativeTransitions', function($scope, $ionicHistory, $rootScope, $location, $ionicScrollDelegate, $timeout, $calendar, $ionicTabsDelegate, $ionicNativeTransitions) {

	function selectDateTab(index, date){

		$location.hash("06:00:00");
		$ionicScrollDelegate.$getByHandle('plan-visit-content').anchorScroll();

		$ionicTabsDelegate.$getByHandle('date-tabs').select(index);

		var eventDiv = angular.element(document.getElementsByClassName("event"));
		eventDiv.removeClass("event").html("");

		if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {

			$timeout(function() {
				$calendar.listIosEvents("aad-data", date);
			},500);

		} else if(ionic.Platform.isAndroid()) {

			$timeout(function() {
				$calendar.listEvents(date).then(function (result) {
					for(var x = 0; x < result.length; x++) {
						var dateStr = String(new Date(result[x].dtstart));
						var dateArray = dateStr.split(" ");
						var timeDiv = angular.element(document.getElementById(dateArray[4]));
						timeDiv.addClass("event").html(result[x].title);
					}			
		        }, function (err) {
		          	console.log("This is an error: "+err)
		        });
		    },500);

		}
        
	};

	$scope.$on('$ionicView.enter', function() {

	    $rootScope.showSubHeader = true;
	    $rootScope.showSubHeaderPlan = true;
	    $rootScope.showAd = false;
	    $rootScope.subheading = "September 2016";
	    $rootScope.hideSubTitle = false;  

	});

	$scope.$on('$ionicView.afterEnter', function() {
	    
	    selectDateTab(0, 14);    

	});

	$scope.$on('$ionicView.leave', function() {
	    $rootScope.showSubHeaderPlan = false;
	    $rootScope.hideAd = false;
	});

	var timeArray = [];
	for(var x = 1; x < 25; x++) {
		if(x > 9) {
			timeArray.push(x+":00");
		} else {
			timeArray.push("0"+x+":00");
		}		
	}
	timeArray.unshift("");
	$scope.timeArray = timeArray;

	// $timeout(function() {
		
	// },500);

	$rootScope.dateTabSelectIndex = function(index, date) {

		selectDateTab(index, date);

	}

	$scope.viewEvent = function(id) {
		var eventDiv = angular.element(document.getElementById(id+":00"));	

		if(eventDiv.html().length > 0) {
			alert(eventDiv.html())
		}
		// console.log(eventDiv.html())		
	}

}]);