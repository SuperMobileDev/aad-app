angular.module('social.media.controller', [])

.controller('SocialMediaCtrl', ['$scope', '$ionicHistory', '$rootScope', '$ionicTabsDelegate', '$timeout', '$http', function($scope, $ionicHistory, $rootScope, $ionicTabsDelegate, $timeout, $http) {

	// function selectSocialTab(index){

	// 	if(index == 0) {
	// 		$rootScope.subheading = "Twitter";
	// 		$ionicTabsDelegate.$getByHandle('social-media-tabs').select(index);

	// 		$scope.showTwitter = true;
	// 		$scope.showFacebook = false;
	// 		$scope.showInstagram = false;

	// 		TwitterREST.sync().then(function(tweets){
	// 	        console.log(tweets);
	// 	        $scope.tweets = tweets;
	// 	    });

	// 	} else if(index == 1) {

	// 		$rootScope.subheading = "Facebook";
	// 		$ionicTabsDelegate.$getByHandle('social-media-tabs').select(index);

	// 		$scope.showTwitter = false;
	// 		$scope.showFacebook = true;
	// 		$scope.showInstagram = false;

	// 		(function(d, s, id) {
	// 		  var js, fjs = d.getElementsByTagName(s)[0];
	// 		  if (d.getElementById(id)) return;
	// 		  js = d.createElement(s); js.id = id;
	// 		  p =/^http:/.test(d.location)?'http':'https';
	// 		  js.src = p+"://connect.facebook.net/en_US/sdk.js";
	// 		  fjs.parentNode.insertBefore(js, fjs);
	// 		}(document, 'script', 'facebook-jssdk'));

	// 	} else if(index == 2) {

	// 		$rootScope.subheading = "Instagram";
	// 		$ionicTabsDelegate.$getByHandle('social-media-tabs').select(index);

	// 		$scope.showTwitter = false;
	// 		$scope.showFacebook = false;
	// 		$scope.showInstagram = true;

	// 		$scope.items = [];
	// 	    $scope.newItems = [];
	// 	    $scope.noMoreItemsAvailable = false;

	// 	    var anchors = document.getElementById('lightwidget_61cc7e9a76').contentWindow.document.getElementsByTagName("a");

	// 	    for (var i in anchors) {
	// 	    	var link = anchors[i].getAttribute("href");
	// 	    	anchors[i].onclick = function() { 
	// 	    		window.open(""+link+"", "_blank", "location=yes");
	// 	    	};
	// 	    	anchors[i].href = 'javascript: void(0)';
		    	
	// 	    	console.log(anchors[i]); 
	// 	    }
		    
	// 	}
        
	// };

	$scope.$on('$ionicView.enter', function() {
	    $rootScope.showSubHeader = true;
	    $rootScope.hideSubTitle = false;
	    // $rootScope.showSubHeaderSocialMedia = true;
	    $rootScope.hideAd = false;
	    $rootScope.subheading = "#AADExpo16";
	    $rootScope.showAd = true;
	    // selectSocialTab(0);
	});

	$scope.$on('$ionicView.leave', function() {
	    $rootScope.showSubHeaderSocialMedia = false;
	    $rootScope.hideAd = false;
	});

	$rootScope.selectSocialTab = function(index) {
		selectSocialTab(index);
	}

}]);