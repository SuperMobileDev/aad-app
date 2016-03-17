angular.module('starter.functions', [])

function addToCalendar(title, location, notes, year, month, day, hours, minutes, $calendar, modal, $scope) {

	var startHour = parseInt(hours);
	var endHour = startHour+1;

	if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {

		// check if calendar exists else create the calendar
    	$calendar.createIosCalendar("aad-data");

		var startDate = new Date(parseInt(year), parseInt(month), parseInt(day), startHour, parseInt(minutes), 0, 0);
		var endDate = new Date(parseInt(year), parseInt(month), parseInt(day), endHour, parseInt(minutes), 0, 0);
		var fileName = "aad-data";

		$calendar.createEventWithOptions(title, location, notes, startDate, endDate, fileName, modal, $scope);

	} else if(ionic.Platform.isAndroid()) {

		var startDate = new Date(parseInt(year), parseInt(month), parseInt(day), startHour, parseInt(minutes), 0, 0);
		var endDate = new Date(parseInt(year), parseInt(month), parseInt(day), endHour, parseInt(minutes), 0, 0);

		$calendar.createEventWithOptions(title, location, notes, startDate, endDate, fileName, modal, $scope);

	}
}

function gautrainLinkOpen($cordovaInAppBrowser, url) {

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      EnableViewPortScale: 'yes'
    };

	if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {

		function onConfirmApple(buttonIndex) {
			if (buttonIndex == 1)
		    	$cordovaInAppBrowser.open('https://itunes.apple.com/za/app/gautrain/id457863526?mt=8', '_blank', options);
		    else if(buttonIndex == 2)
		    	$cordovaInAppBrowser.open(url, '_blank', options);
		}

		navigator.notification.confirm(
		    'Please note that there is a Gautrain app available',  // message
		    onConfirmApple,                  // callback to invoke
		    'Choose GPS',            // title
		    ['View Gautrain app','View Gautrain website', 'Cancel']
		);
	      
	}
	else if(ionic.Platform.isAndroid()) {
	    function onConfirmAndroid(buttonIndex) {
			if (buttonIndex == 1)
		    	cordova.plugins.market.open('com.afrigis.gautrain');
		    else if(buttonIndex == 2)
		    	$cordovaInAppBrowser.open(url, '_blank', options);
		}

		navigator.notification.confirm(
		    'Please note that there is a Gautrain app available',  // message
		    onConfirmAndroid,                  // callback to invoke
		    'Choose GPS',            // title
		    ['View Gautrain app','View Gautrain website', 'Cancel']
		);
	}
	
}

function openGps(lat, long) {
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
	    window.open('geo:'+lat+','+long+'?q='+lat+','+long+'(Label+Name)', '_system', 'location=yes')
	}
}

function openGpsQuery($cordovaInAppBrowser, query) {

	if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {

		window.open('http://maps.google.com?q='+query+'', '_system', 'location=yes');
	      
	}
	else if(ionic.Platform.isAndroid()) {
	    // window.open('http://maps.google.com/?q='+lat+','+long+'', '_system', 'location=yes')
	    window.open('geo:0,0?q='+query+'', '_system', 'location=yes')
	}
	
}

function deselectTabs($ionicTabsDelegate) {
	$ionicTabsDelegate.$getByHandle('general-tabs').select("");
  	$ionicTabsDelegate.$getByHandle('general-tabs-menu').select("");
}

function createIosCalendar($cordovaCalendar, $cordovaFile) {

	

}