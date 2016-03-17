angular.module('ticket.sales.controller', [])

.controller('TicketSalesCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$cordovaInAppBrowser', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $cordovaInAppBrowser) {

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    deselectTabs($ionicTabsDelegate);
	    $rootScope.subheading = "Ticket Sales";
	    $rootScope.showAd = true;
	});

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      EnableViewPortScale: 'yes'
    };
	$scope.browserOpen = function(url) {
		$cordovaInAppBrowser.open(url, '_blank', options);
	}

}]);