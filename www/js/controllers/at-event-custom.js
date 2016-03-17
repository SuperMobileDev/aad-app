angular.module('at.event.custom.controller', [])

.controller('AtEventCustomCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$modal', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $modal) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    $rootScope.showAd = true;
	    // deselect tabs
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Add Custom Event";

	    $modal.calendarModalInit($scope, 'complex');
	});

	// $ionicModal.fromTemplateUrl('templates/add-to-calendar-modal.html', {
	//     scope: $scope,
	//     animation: 'slide-in-up'
	// }).then(function(modal) {
	// 	$scope.modal = modal;
	// 	$rootScope.exhibitorCalendar = function() {
	// 		var exhibitorObject = {
	// 			title: "",
	// 			location: "",
	// 		}
	// 		$scope.dateSelected = "";
	// 		$scope.dateError = false;
	// 		$scope.startSelectedTime = "";
	// 		$scope.timeError = false;
	// 		$scope.exhibitor = exhibitorObject;
	// 		$scope.modal.show();
	// 	}
	// 	$scope.modalClose = function() {
	// 		$scope.modal.hide();
	// 	}
	// 	$scope.submitItemToCalendar = function() {

	// 		checkDate("date");
	// 		checkDate("time");
	// 		checkDate("title");

	// 		if($scope.dateError == false && $scope.timeError == false && $scope.titleError == false) {

	// 			var title = $scope.exhibitor['title'];
	// 			var eventLocation = $scope.exhibitor['location'];
	// 			var notes = $scope.exhibitor['notes'];

	// 			// get day
	// 			var date = $scope.dateSelected;
	// 			var dateStr = String(date);
	// 			var dateArr = dateStr.split(" ");
	// 			var day = dateArr[2];

	// 			var time = $scope.startSelectedTime;
	// 			var timeStr = String(time);
	// 			var timeSlice = timeStr.slice(0, -3);
	// 			var timeArr = timeSlice.split(":");
	// 			var hours = timeArr[0];
	// 			var minutes = timeArr[1];

	// 			// console.log($scope.dateSelected);

	// 			addToCalendar(title, $scope.eventLocation, notes, 2016, 8, day, hours, minutes, $calendar, modal, $scope);

	// 		} else {
	// 			navigator.notification.alert(
	//                 "Please fill in the required fields before submitting the event again",  // message
	//                 null,         // callback
	//                 'Field Input Missing',            // title
	//                 'Done'                  // buttonName
	//             );
	// 		}

	// 	}
	// });

	// $scope.checkTitleInput = function() {
	// 	$scope.exhibitor['title'] = "";
	// 	$scope.titleClass = "";
	// }
	// $scope.checkTitle = function() {
	// 	if(typeof($scope.exhibitor['title']) === 'undefined' || $scope.exhibitor['title'] == "") {
	// 		$scope.titleClass = "color-red-imp";
	// 		$scope.exhibitor['title'] = "Please enter an event title";
	// 		$scope.titleError = true;
	// 	} else {
	// 		$scope.titleError = false;
	// 	}
	// }

	// function checkDate(input) {

	// 	if(input == "date") {
	// 		if(typeof($scope.dateSelected) === 'undefined' || $scope.dateSelected == "") {
	// 			$scope.dateError = true;
	// 		} else {
	// 			$scope.dateError = false;
	// 		}
	// 	} else if(input == "time") {
	// 		if(typeof($scope.startSelectedTime) === 'undefined' || $scope.startSelectedTime == "") {
	// 			$scope.timeError = true;
	// 		} else {
	// 			$scope.timeError = false;
	// 		}
	// 	} else if(input == "title") {

	// 		if(typeof($scope.exhibitor['title']) === 'undefined' || $scope.exhibitor['title'] == "" || $scope.exhibitor['title'] == "Please enter title") {
	// 			$scope.titleClass = "color-red-imp";
	// 			$scope.exhibitor['title'] = "Please enter title";
	// 			$scope.titleError = true;
	// 		} else {
	// 			$scope.titleError = false;
	// 			$scope.titleClass = "";
	// 		}
	// 	}
		
	// }

	// var datePickerCallback = function (val) {
	// 	if (typeof(val) === 'undefined') {
	// 		checkDate("date");
	// 	} else {
	// 		$scope.dateSelected = new Date(val);
	// 		$scope.datepickerObject['inputDate'] = new Date(val);
	// 		checkDate("date");
	// 	}
	// };

	// function timePickerCallback(val) {
	//   if (typeof (val) === 'undefined') {
	//     checkDate("time");
	//   } else {

	//     var selectedTime = new Date(val * 1000);
	//     var timeOfDay;
	//     var minutes;

	//     if(selectedTime.getUTCHours() > 10) {
	//     	timeOfDay = "PM";
	//     } else {
	//     	timeOfDay = "AM";
	//     }

	//     if(selectedTime.getUTCMinutes() == 0) {
	// 		minutes = "0";
	//     } else {
	//     	minutes = "";
	//     }

	//     $scope.startSelectedTime = selectedTime.getUTCHours()+":"+minutes+""+selectedTime.getUTCMinutes()+" "+timeOfDay;
	//   	$scope.timePickerObject['inputEpochTime'] = new Date(val);
	//   	checkDate("time");

	//   }
	// }

	// $scope.datepickerObject = {
 //      titleLabel: 'Choose Event Starting Date',  //Optional
 //      todayLabel: 'Today',  //Optional
 //      closeLabel: 'Close',  //Optional
 //      setLabel: 'Set',  //Optional
 //      setButtonType : 'bg-green color-white',  //Optional
 //      todayButtonType : 'today-btn',  //Optional
 //      closeButtonType : 'button-stable',  //Optional
 //      inputDate: new Date(2016, 8, 14),  //Optional
 //      mondayFirst: true,  //Optional
 //      // disabledDates: disabledDates, //Optional
 //      // weekDaysList: weekDaysList, //Optional
 //      // monthList: monthList, //Optional
 //      templateType: 'popup', //Optional
 //      showTodayButton: 'true', //Optional
 //      modalHeaderColor: 'bar-positive', //Optional
 //      modalFooterColor: 'bar-positive', //Optional
 //      from: new Date(2016, 8, 14), //Optional
 //      to: new Date(2016, 8, 18),  //Optional
 //      callback: function (val) {  //Mandatory
 //        datePickerCallback(val);
 //      },
 //      dateFormat: 'dd MMM yyyy', //Optional
 //      closeOnSelect: false, //Optional
 //    };

 //    $scope.timePickerObject = {
	//   inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
	//   step: 15,  //Optional
	//   format: 12,  //Optional
	//   titleLabel: 'Choose Event Starting Time',  //Optional
	//   setLabel: 'Set',  //Optional
	//   closeLabel: 'Close',  //Optional
	//   setButtonType: 'bg-green color-white',  //Optional
	//   closeButtonType: 'button-stable',  //Optional
	//   callback: function (val) {    //Mandatory
	//     timePickerCallback(val);
	//   }
	// };

}]);