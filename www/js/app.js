// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ngOnload', 'ionic-native-transitions', 'ionic-timepicker', 'ionic-ratings', 'jett.ionic.filter.bar', 'ionic-datepicker', 'things.to.do.detail.controller', 'things.to.do.controller', 'parking.controller', 'general.enquiries.detail.controller', 'prices.controller', 'park.ride.controller', 'starter.factories', 'starter.directives', 'starter.filters', 'starter.functions', 'starter.controllers', 'home.controller', 'social.media.info.controller', 'taxi.services.controller', 'noise.levels.controller', 'medical.centre.controller', 'lost.children.centre.controller', 'rules.controller', 'traffic.controller', 'getting.there.controller', 'at.event.controller', 'discover.sa.controller', 'help.desk.controller', 'plan.visit.controller', 'general.enquiries.controller', 'venue.map.controller', 'social.media.controller', 'airshow.controller', 'airshow.programme.controller', 'fun.activities.controller', 'trade.exhibition.controller', 'trade.exhibition.detail.controller', 'ticket.sales.controller', 'directions.controller', 'directions.detail.controller', 'accommodation.controller', 'accommodation.city.chosen.controller', 'accommodation.city.chosen.detail.controller', 'at.event.custom.controller', 'getting.around.controller', 'car.rental.controller'])

.run(function($ionicPlatform, $file, $calendar) {
  $ionicPlatform.ready(function() {

    // navigator.splashscreen.hide();

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.overlaysWebView(false);
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByName("black")
    }

    function keyboardShowHandler(e){
      var footerTabs = angular.element(document.getElementById('footer-tabs'));
      var footerAdd = angular.element(document.getElementById('footer-add'));
      
      footerAdd.addClass('display-none');
      footerTabs.addClass('display-none');
    }
    function keyboardHideHandler(e){
      var footerTabs = angular.element(document.getElementById('footer-tabs'));
      var footerAdd = angular.element(document.getElementById('footer-add'));

      footerAdd.removeClass('display-none');
      footerTabs.removeClass('display-none');
    }
    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    if (window.cordova) {
      if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
        $calendar.createIosCalendar("aad-data");
      } else if(ionic.Platform.isAndroid()) {
        // $file.createFile("aad-data");
      }
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicNativeTransitionsProvider, $ionicFilterBarConfigProvider, $compileProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.swipeBackEnabled(false);

  // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|geo):/);
  
  // $compileProvider.directive('compile', function ($compile) {
  //   // directive factory creates a link function
  //   return function (scope, element, attrs) {
  //     scope.$watch(
  //         function (scope) {
  //           // watch the 'compile' expression for changes
  //           return scope.$eval(attrs.compile);
  //         },
  //         function (value) {
  //           // when the 'compile' expression changes
  //           // assign it into the current DOM
  //           element.html(value);

  //           // compile the new DOM and link it to the current
  //           // scope.
  //           // NOTE: we only compile .childNodes so that
  //           // we don't get into infinite loop compiling ourselves
  //           $compile(element.contents())(scope);
  //         }
  //     );
  //   };
  // });
  
  $ionicFilterBarConfigProvider.transition("horizontal");

  $ionicNativeTransitionsProvider.setDefaultOptions({
    duration: 300, // in milliseconds (ms), default 400,
    slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
    iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
    androiddelay: -1, // same as above but for Android, default -1
    winphonedelay: -1, // same as above but for Windows Phone, default -1,
    fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
    fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    triggerTransitionEvent: '$ionicView.afterEnter' // internal ionic-native-transitions option
  });

  $ionicNativeTransitionsProvider.setDefaultTransition({
    type: 'slide',
    direction: 'left'
  });

  $ionicNativeTransitionsProvider.setDefaultBackTransition({
    type: 'slide',
    direction: 'right'
  });

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.at-event', {
    url: '/at-event',
    views: {
      'menuContent': {
        templateUrl: 'templates/at-event.html',
        controller: 'AtEventCtrl'
      }
    }
  })

  .state('app.at-event-custom', {
    url: '/at-event-custom',
    views: {
      'menuContent': {
        templateUrl: 'templates/at-event-custom.html',
        controller: 'AtEventCustomCtrl'
      }
    }
  })

  .state('app.getting-there', {
    url: '/getting-there',
    views: {
      'menuContent': {
        templateUrl: 'templates/getting-there.html',
        controller: 'GettingThereCtrl'
      }
    }
  })

  .state('app.discover-sa', {
    url: '/discover-sa',
    views: {
      'menuContent': {
        templateUrl: 'templates/discover-sa.html',
        controller: 'AtEventCtrl'
      }
    }
  })

  .state('app.getting-around', {
    url: '/getting-around',
    views: {
      'menuContent': {
        templateUrl: 'templates/getting-around.html',
        controller: 'GettingAroundCtrl'
      }
    }
  })

  .state('app.car-rental', {
    url: '/car-rental',
    views: {
      'menuContent': {
        templateUrl: 'templates/car-rental.html',
        controller: 'CarRentalCtrl'
      }
    }
  })

  .state('app.accommodation', {
    url: '/accommodation',
    views: {
      'menuContent': {
        templateUrl: 'templates/accommodation.html',
        controller: 'AccommodationCtrl'
      }
    }
  })

  .state('app.accommodation-city-chosen', {
    url: '/accommodation-city-chosen/:cityId+cityName=:cityName',
    views: {
      'menuContent': {
        templateUrl: 'templates/accommodation-city-chosen.html',
        controller: 'AccommodationCityChosenCtrl'
      }
    }
  })

  .state('app.accommodation-city-chosen-detail', {
    url: '/accommodation-city-chosen-detail/accommId=:accommId+accommName=:accommName',
    views: {
      'menuContent': {
        templateUrl: 'templates/accommodation-city-chosen-detail.html',
        controller: 'AccommodationCityChosenDetailCtrl'
      }
    }
  })

  .state('app.plan-visit', {
    url: '/plan-visit',
    views: {
      'menuContent': {
        templateUrl: 'templates/plan-visit.html',
        controller: 'PlanVisitCtrl'
      }
    }
  })

  .state('app.help-desk', {
    url: '/help-desk',
    views: {
      'menuContent': {
        templateUrl: 'templates/help-desk.html',
        controller: 'HelpDeskCtrl'
      }
    }
  })

  .state('app.general-enq', {
    url: '/general-enq',
    views: {
      'menuContent': {
        templateUrl: 'templates/general-enq.html',
        controller: 'GeneralEnquiriesCtrl'
      }
    }
  })

  .state('app.venue-map', {
    url: '/venue-map',
    views: {
      'menuContent': {
        templateUrl: 'templates/venue-map.html',
        controller: 'VenueMapCtrl'
      }
    }
  })

  .state('app.social-media', {
    url: '/social-media',
    views: {
      'menuContent': {
        templateUrl: 'templates/social-media.html',
        controller: 'SocialMediaCtrl'
      }
    }
  })

  .state('app.airshow', {
    url: '/airshow',
    views: {
      'menuContent': {
        templateUrl: 'templates/airshow.html',
        controller: 'AirShowCtrl'
      }
    }
  })

  .state('app.airshow-programme', {
    url: '/airshow-programme',
    views: {
      'menuContent': {
        templateUrl: 'templates/airshow-programme.html',
        controller: 'AirShowProgrammeCtrl'
      }
    }
  })

  .state('app.fun-activities', {
    url: '/fun-activities',
    views: {
      'menuContent': {
        templateUrl: 'templates/fun-activities.html',
        controller: 'FunActivitiesCtrl'
      }
    }
  })

  .state('app.trade-exhibition', {
    url: '/trade-exhibition',
    views: {
      'menuContent': {
        templateUrl: 'templates/trade-exhibition.html',
        controller: 'TradeExhibitionCtrl'
      }
    }
  })

  .state('app.trade-exhibition-detail', {
    url: '/trade-exhibition-detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/trade-exhibition-detail.html',
        controller: 'TradeExhibitionDetailCtrl'
      }
    }
  })

  .state('app.ticket-sales', {
    url: '/ticket-sales',
    views: {
      'menuContent': {
        templateUrl: 'templates/ticket-sales.html',
        controller: 'TicketSalesCtrl'
      }
    }
  })

  .state('app.directions', {
    url: '/directions',
    views: {
      'menuContent': {
        templateUrl: 'templates/directions.html',
        controller: 'DirectionsCtrl'
      }
    }
  })

  .state('app.traffic', {
    url: '/traffic',
    views: {
      'menuContent': {
        templateUrl: 'templates/traffic.html',
        controller: 'TrafficCtrl'
      }
    }
  })

  .state('app.lost-children-centre', {
    url: '/lost-children-centre',
    views: {
      'menuContent': {
        templateUrl: 'templates/lost-children-centre.html',
        controller: 'LostChildrenCentreCtrl'
      }
    }
  })

  .state('app.directions-detail', {
    url: '/directions-detail/:airport',
    views: {
      'menuContent': {
        templateUrl: 'templates/directions-detail.html',
        controller: 'DirectionsDetailCtrl'
      }
    }
  })

  .state('app.medical-centre', {
    url: '/medical-centre',
    views: {
      'menuContent': {
        templateUrl: 'templates/medical-centre.html',
        controller: 'MedicalCentreCtrl'
      }
    }
  })

  .state('app.noise-levels', {
    url: '/noise-levels',
    views: {
      'menuContent': {
        templateUrl: 'templates/noise-levels.html',
        controller: 'NoiseLevelsCtrl'
      }
    }
  })

  .state('app.social-media-info', {
    url: '/social-media-info',
    views: {
      'menuContent': {
        templateUrl: 'templates/social-media-info.html',
        controller: 'SocialMediaInfoCtrl'
      }
    }
  })

  .state('app.taxi-services', {
    url: '/taxi-services',
    views: {
      'menuContent': {
        templateUrl: 'templates/taxi-services.html',
        controller: 'TaxiServicesCtrl'
      }
    }
  })

  .state('app.rules', {
    url: '/rules',
    views: {
      'menuContent': {
        templateUrl: 'templates/rules.html',
        controller: 'RulesCtrl'
      }
    }
  })

  .state('app.prices', {
    url: '/prices',
    views: {
      'menuContent': {
        templateUrl: 'templates/prices.html',
        controller: 'PricesCtrl'
      }
    }
  })

  .state('app.park-ride', {
    url: '/park-ride',
    views: {
      'menuContent': {
        templateUrl: 'templates/park-ride.html',
        controller: 'ParkRideCtrl'
      }
    }
  })

  .state('app.general-enq-detail', {
    url: '/general-enq-detail/enqType=:enqType',
    views: {
      'menuContent': {
        templateUrl: 'templates/general-enq-detail.html',
        controller: 'GeneralEnquiriesDetailCtrl'
      }
    }
  })

  .state('app.parking', {
    url: '/parking',
    views: {
      'menuContent': {
        templateUrl: 'templates/parking.html',
        controller: 'ParkingCtrl'
      }
    }
  })

  .state('app.things-to-do', {
    url: '/things-to-do',
    views: {
      'menuContent': {
        templateUrl: 'templates/things-to-do.html',
        controller: 'ThingsToDoCtrl'
      }
    }
  })

  .state('app.things-to-do-detail', {
    url: '/things-to-do-detail/province=:province',
    views: {
      'menuContent': {
        templateUrl: 'templates/things-to-do-detail.html',
        controller: 'ThingsToDoDetailCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})