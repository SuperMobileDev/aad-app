angular.module('starter.factories', [])

.factory('$file', ['$cordovaFile', function($cordovaFile){

  return {
    createFile: function(fileName) {
      $cordovaFile.checkFile(cordova.file.dataDirectory, fileName+".txt")
        .then(function (success) {
          console.log("File "+fileName+".txt already exists");
        }, function (error) {
          console.log("File "+fileName+".txt does not exists: "+error);
          $cordovaFile.createFile(cordova.file.dataDirectory, fileName+".txt", false)
            .then(function (success) {
              console.log("File "+fileName+".txt created successfully");
            }, function (error) {
              console.error("File "+fileName+".txt created could not be created");
            });
        });   
    },
    createProperty: function(fileName, propertyName, propertyData) {
      $cordovaFile.readAsText(cordova.file.dataDirectory, fileName+".txt")
        .then(function (success) {

          var jsonString;
          var jsonObject = {};
          var propertyExists = false;

          if(success == "") {
            jsonObject[propertyName] = propertyData
            jsonString = JSON.stringify(jsonObject);
          } else {
            //get string and turn it into json
            var jsonFileObject = JSON.parse(success);
            if(jsonFileObject.hasOwnProperty(propertyName)) {
              propertyExists = true;
            } else {
              jsonFileObject[propertyName] = propertyData;
              jsonString = JSON.stringify(jsonFileObject);
            }
          }

          if(!propertyExists) {
            $cordovaFile.writeFile(cordova.file.dataDirectory, fileName+".txt", jsonString, true)
              .then(function (success) {
                console.log("Property added successfully in "+fileName+".txt");
                $cordovaFile.readAsText(cordova.file.dataDirectory, fileName+".txt")
                  .then(function (success) {
                    console.log(success);
                  }, function (error) {
                    console.log("File "+fileName+".txt does not exist: "+error);
                  }); 
              }, function (error) {
                console.log("Property could not be added to file "+fileName+".txt");
              });
          } else {
            console.log("Could not create "+propertyName+", the property already exists")
          }

        }, function (error) {
          console.log("File "+fileName+".txt does not exist: "+error);
        }); 
    },
    editProperty: function(fileName, propertyName, propertyData) {
      $cordovaFile.readAsText(cordova.file.dataDirectory, fileName+".txt")
        .then(function (success) {

          var jsonString;
          
          //get string and turn it into json
          var jsonFileObject = JSON.parse(success);
          if(jsonFileObject.hasOwnProperty(propertyName)) {

            jsonFileObject[propertyName] = propertyData;
            jsonString = JSON.stringify(jsonFileObject);

            $cordovaFile.writeFile(cordova.file.dataDirectory, fileName+".txt", jsonString, true)
              .then(function (success) {
                console.log("Property "+propertyName+" modified successfully in "+fileName+".txt");
                $cordovaFile.readAsText(cordova.file.dataDirectory, fileName+".txt")
                  .then(function (success) {
                    console.log(success);
                  }, function (error) {
                    console.log("File "+fileName+".txt does not exist: "+error);
                  }); 
              }, function (error) {
                console.log("Property "+propertyName+" could not be modified in file "+fileName+".txt");
              });
          } else {
            console.log("Property "+propertyName+" does not exist in file "+fileName+".txt")
          }

        }, function (error) {
          console.log("File "+fileName+".txt does not exist: "+error);
        }); 
    },
    getFileObject: function(fileName) {
      return $cordovaFile.readAsText(cordova.file.dataDirectory, fileName+".txt")
    }
  }
}])

.factory('$localstorage', ['$window', function($window){
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('$calendar', ['$window', '$cordovaCalendar', '$cordovaFile', function($window, $cordovaCalendar, $cordovaFile){

  function createCalendar(fileName) {
    $cordovaCalendar.listCalendars().then(function (result) {

      var calendarExists = false;
      var calendarExistsId;

      for (var x = 0; x < result.length; x++) {
        if(result[x].name == "AAD Event Calendar") {
          calendarExists = true;
          calendarExistsId = result[x].id;
        }
      }

      if (calendarExists == true) {
        var aadData = {"calendar-id" : calendarExistsId};
        var aadDataString = JSON.stringify(aadData);
        $cordovaFile.writeFile(cordova.file.dataDirectory, fileName+".txt", aadDataString, true)
        .then(function (success) {
          console.log("Calendar created successfully with calendarExists!")
        }, function (error) {
          console.error("File could not write in calendarExists: "+error)
        });
      } else {
        $cordovaCalendar.createCalendar({
          calendarName: 'AAD Event Calendar',
          calendarColor: '#004590'
        }).then(function (result) {
          var aadData = {"calendar-id" : result};
          var aadDataString = JSON.stringify(aadData);
          $cordovaFile.writeFile(cordova.file.dataDirectory, fileName+".txt", aadDataString, true)
            .then(function (success) {
              console.log("Calendar created successfully!")
            }, function (error) {
              console.error("File could not write: "+error)
            });
        }, function (err) {
          console.error("Could not create calendar: "+err)
        });
      }

      // console.log('createCalendar');
      // console.log(result);
    }, function (err) {
      console.log("Error retrieving calendars in createCalendar(): "+err)
    });
    // $cordovaCalendar.createCalendar({
    //   calendarName: 'AAD Event Calendar',
    //   calendarColor: '#004590'
    // }).then(function (result) {
    //   var aadData = {"calendar-id" : result};
    //   var aadDataString = JSON.stringify(aadData);
    //   $cordovaFile.writeFile(cordova.file.dataDirectory, fileName+".txt", aadDataString, true)
    //     .then(function (success) {
    //       console.log("Calendar created successfully!")
    //     }, function (error) {
    //       console.error("File could not write: "+error)
    //     });
    // }, function (err) {
    //   console.error("Could not create calendar: "+err)
    // });
  }

  return {
    createIosCalendar: function(fileName) {
      var iosCalendars;
      $cordovaCalendar.listCalendars().then(function (result) {

        iosCalendars = result;
        $cordovaFile.readAsText(cordova.file.dataDirectory, fileName+".txt").then(function (success) {

          var calendarIdExists = false;
          var aadObject = JSON.parse(success);
          //if the aad file exists make sure the aad event calendar exist
          for(var x = 0; x < iosCalendars.length; x++) {
            if(iosCalendars[x].id == aadObject["calendar-id"]) {
              calendarIdExists = true;
            }
          }
          if(calendarIdExists) {
            console.log("Calendar id exists");
          } else {
            console.log("Calendar id does not exist")
            createCalendar(fileName);
          }

        }, function (error) {
          console.error("Could not read "+fileName+".txt: "+error);
          createCalendar(fileName);
        });

      }, function (err) {
        console.log("Error retrieving calendars: "+err)
      });
    },
    createEventWithOptions: function(title, location, notes, startDate, endDate, fileName, modal, $scope) {

      $scope.modal = modal;

      if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
          
        $cordovaFile.readAsText(cordova.file.dataDirectory, fileName+".txt").then(function (result) {

          var jsonObject = JSON.parse(result);
          var calendarId = jsonObject['calendar-id'];

          $cordovaCalendar.listCalendars().then(function (result) {
            for(var x = 0; x < result.length; x++) {
              if(result[x].id == calendarId) {

                var calName = result[x].name
                $cordovaCalendar.findAllEventsInNamedCalendar(calName).then(function (result) {

                  var eventExists = false;

                  for(var x = 0; x < result.length; x++) {
                    if(title == result[x].title) {
                      eventExists = true;
                    }
                  }

                  if(!eventExists) {
                    $cordovaCalendar.createEventInNamedCalendar({
                      title: title,
                      location: location,
                      notes: notes,
                      startDate: startDate,
                      endDate: endDate,
                      calendarName: calName
                    }).then(function (result) {
                      $scope.modal.hide();
                      navigator.notification.alert(
                        'The event '+title+' has been successfully added to the calendar named '+calName+'',  // message
                        null,         // callback
                        'Event Added To Calendar',            // title
                        'Done'                  // buttonName
                      );
                    }, function (err) {
                      console.error("Could not create event in named calendar: "+calName+" error: "+err);
                    });

                  } else {
                    navigator.notification.alert(
                      'The event '+title+' already exists',  // message
                      null,         // callback
                      'Event Already Added',            // title
                      'Done'                  // buttonName
                    );
                  }
                  
                }, function (err) {
                  console.log("Could not find named calendar "+calName+" error: "+err);
                });

              }
            }
          }, function (err) {
            console.log(err);
          });

        }, function (err) {
          console.log(err)
        });      

      } else if(ionic.Platform.isAndroid()) {

        $cordovaCalendar.listEventsInRange(
          new Date(2016, 8, 12, 0, 0, 0, 0, 0),
          new Date(2016, 8, 17, 0, 0, 0, 0, 0)
        ).then(function (result) {

          var eventExists = false;
          for(var x = 0; x < result.length; x++) {
            if(result[x].title == title) {
              console.log("Event "+title+" already exists");
              eventExists = true;
            }
          }

          if(!eventExists) {
            $cordovaCalendar.createEvent({
              title: title,
              location: location,
              notes: notes,
              startDate: startDate,
              endDate: endDate
            }).then(function (result) {
              $scope.modal.hide();
              navigator.notification.alert(
                'The event '+title+' has been successfully added to your calendar',  // message
                null,         // callback
                'Event Added To Calendar',            // title
                'Done'                  // buttonName
              );
            }, function (error) {
              console.log("Event "+title+" was not created successfully: "+error);
            });
          } else {
            navigator.notification.alert(
              'The event '+title+' already exists',  // message
              null,         // callback
              'Event Already Added',            // title
              'Done'                  // buttonName
            );
          }

          console.log(result);
        }, function (error) {
          console.log(error);
        });

      }
    },
    listIosEvents: function(fileName, date) {
      $cordovaFile.readAsText(cordova.file.dataDirectory, fileName+".txt").then(function (result) {

        var jsonObject = JSON.parse(result);
        var calendarId = jsonObject['calendar-id'];

        $cordovaCalendar.listCalendars().then(function (result) {
          for(var x = 0; x < result.length; x++) {
            if(result[x].id == calendarId) {

              var calName = result[x].name
              $cordovaCalendar.findAllEventsInNamedCalendar(calName).then(function (result) {
                for(var x = 0; x < result.length; x++) {
                  var dateStr = String(result[x].startDate).slice(8,10);
                  var timeStr = String(result[x].startDate).slice(11);
                  if(dateStr == date) {
                    var timeDiv = angular.element(document.getElementById(timeStr));
                    timeDiv.addClass("event").html(result[x].title);
                  }
                  // console.log(dateStr.slice(8,10));
                }
              }, function (err) {
                console.log(err);
              });

            }
          }
        }, function (err) {
          console.log(err);
        });

      }, function (err) {
        console.log(err)
      });
    },
    listEvents: function(day) {
      return $cordovaCalendar.listEventsInRange(
        new Date(2016, 8, day, 0, 0, 0, 0, 0),
        new Date(2016, 8, day+1, 0, 0, 0, 0, 0)
      )
    }
  }

}])

.factory('$modal', ['$ionicModal', '$rootScope', '$calendar', '$ionicScrollDelegate', '$window', function($ionicModal, $rootScope, $calendar, $ionicScrollDelegate, $window){
  return {
    calendarModalInit: function($scope, type) {

      $ionicModal.fromTemplateUrl('templates/add-to-calendar-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal1 = modal;
        $rootScope.exhibitorCalendar = function(title, location) {

          if(type == 'complex') {
              var exhibitorObject = {
                title: title,
                location: location
              }
              $scope.titleClass = "";
              $scope.exhibitor = exhibitorObject;
          }
          $scope.dateSelected = "";
          $scope.dateError = false;
          $scope.startSelectedTime = "";
          $scope.timeError = false;
          $scope.modal1.show();
        }
        $scope.modal1Close = function() {
          $scope.modal1.hide();
        }
        $scope.submitItemToCalendar = function() {

          checkDate("date");
          checkDate("time");
          checkDate("title");

          if($scope.dateError == false && $scope.timeError == false && $scope.titleError == false) {

            var title = $scope.exhibitor['title'];
            var eventLocation = $scope.exhibitor['location'];
            var notes = $scope.exhibitor['notes'];

            // get day
            var date = $scope.dateSelected;
            var dateStr = String(date);
            var dateArr = dateStr.split(" ");
            var day = dateArr[2];

            var time = $scope.startSelectedTime;
            var timeStr = String(time);
            var timeSlice = timeStr.slice(0, -3);
            var timeArr = timeSlice.split(":");
            var hours = timeArr[0];
            var minutes = timeArr[1];

            // console.log($scope.dateSelected);

            addToCalendar(title, eventLocation, notes, 2016, 8, day, hours, minutes, $calendar, modal, $scope);

          } else {
            navigator.notification.alert(
              "Please fill in the required fields before submitting the event again",  // message
              null,         // callback
              'Field Input Missing',            // title
              'Done'                  // buttonName
            );
          }

        }
      });

      $scope.checkTitleInput = function() {
        if($scope.titleError) {
          $scope.exhibitor['title'] = "";
          $scope.titleClass = "";
        }
      }
      $scope.checkTitle = function() {
        if(typeof($scope.exhibitor['title']) === 'undefined' || $scope.exhibitor['title'] == "" || $scope.exhibitor['title'] == "Please enter title") {
          $scope.titleClass = "color-red-imp";
          $scope.exhibitor['title'] = "Please enter title";
          $scope.titleError = true;
        } else {
          $scope.titleError = false;
        }
      }

      function checkDate(input) {

        if(input == "date") {
          if(typeof($scope.dateSelected) === 'undefined' || $scope.dateSelected == "") {
            $scope.dateError = true;
          } else {
            $scope.dateError = false;
          }
        } else if(input == "time") {
          if(typeof($scope.startSelectedTime) === 'undefined' || $scope.startSelectedTime == "") {
            $scope.timeError = true;
          } else {
            $scope.timeError = false;
          }
        } else if(input == "title") {
          if(typeof($scope.exhibitor['title']) === 'undefined' || $scope.exhibitor['title'] == "" || $scope.exhibitor['title'] == "Please enter title") {
            $scope.titleClass = "color-red-imp";
            $scope.exhibitor['title'] = "Please enter title";
            $scope.titleError = true;
          } else {
            $scope.titleError = false;
            $scope.titleClass = "";
          }
        }
        
      }

      var datePickerCallback = function (val) {
        if (typeof(val) === 'undefined') {
          checkDate("date");
        } else {
          $scope.dateSelected = new Date(val);
          $scope.datepickerObject['inputDate'] = new Date(val);
          checkDate("date");
        }
      };

      function timePickerCallback(val) {
        if (typeof (val) === 'undefined') {
          checkDate("time");
        } else {

          var selectedTime = new Date(val * 1000);
          var timeOfDay;
          var minutes;

          if(selectedTime.getUTCHours() > 10) {
            timeOfDay = "PM";
          } else {
            timeOfDay = "AM";
          }

          if(selectedTime.getUTCMinutes() == 0) {
          minutes = "0";
          } else {
            minutes = "";
          }

          $scope.startSelectedTime = selectedTime.getUTCHours()+":"+minutes+""+selectedTime.getUTCMinutes()+" "+timeOfDay;
          $scope.timePickerObject['inputEpochTime'] = new Date(val);
          checkDate("time");

        }
      }

      $scope.datepickerObject = {
          titleLabel: 'Choose Event Starting Date',  //Optional
          todayLabel: 'Today',  //Optional
          closeLabel: 'Close',  //Optional
          setLabel: 'Set',  //Optional
          setButtonType : 'bg-green color-white',  //Optional
          todayButtonType : 'today-btn',  //Optional
          closeButtonType : 'button-stable',  //Optional
          inputDate: new Date(2016, 8, 14),  //Optional
          mondayFirst: true,  //Optional
          // disabledDates: disabledDates, //Optional
          // weekDaysList: weekDaysList, //Optional
          // monthList: monthList, //Optional
          templateType: 'popup', //Optional
          showTodayButton: 'true', //Optional
          modalHeaderColor: 'bar-positive', //Optional
          modalFooterColor: 'bar-positive', //Optional
          from: new Date(2016, 8, 14), //Optional
          to: new Date(2016, 8, 18),  //Optional
          callback: function (val) {  //Mandatory
            datePickerCallback(val);
          },
          dateFormat: 'dd MMM yyyy', //Optional
          closeOnSelect: false, //Optional
        };

        $scope.timePickerObject = {
        inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
        step: 15,  //Optional
        format: 12,  //Optional
        titleLabel: 'Choose Event Starting Time',  //Optional
        setLabel: 'Set',  //Optional
        closeLabel: 'Close',  //Optional
        setButtonType: 'bg-green color-white',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
          timePickerCallback(val);
        }
      };
    },
    mapModalInit: function($scope, type) {

      var exhibitorContentHeight = $window.innerHeight - 130;
      $scope.exhibitorContentHeight = exhibitorContentHeight+"px";
      console.log($window.innerHeight - 130);

      $ionicModal.fromTemplateUrl('templates/exhibitor-map-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal2 = modal;
        $rootScope.exhibitorLocation = function(title, location) {

          // if(type == 'complex') {
          //     var exhibitorObject = {
          //       title: title,
          //       location: location
          //     }
          //     $scope.titleClass = "";
          //     $scope.exhibitor = exhibitorObject;
          // }
          // $scope.dateSelected = "";
          // $scope.dateError = false;
          // $scope.startSelectedTime = "";
          // $scope.timeError = false;
          $scope.modal2.show();
          $ionicScrollDelegate.$getByHandle('hangar-map-scroll').zoomTo(0.2);
          var exhibitorLoc = angular.element(document.getElementsByClassName('1E1'));
          exhibitorLoc.css({'fill':'green'})
          console.log(exhibitorLoc);
        }
        $scope.modal2Close = function() {
          $scope.modal2.hide();
        }
        // $scope.submitItemToCalendar = function() {

        //   checkDate("date");
        //   checkDate("time");
        //   checkDate("title");

        //   if($scope.dateError == false && $scope.timeError == false && $scope.titleError == false) {

        //     var title = $scope.exhibitor['title'];
        //     var eventLocation = $scope.exhibitor['location'];
        //     var notes = $scope.exhibitor['notes'];

        //     // get day
        //     var date = $scope.dateSelected;
        //     var dateStr = String(date);
        //     var dateArr = dateStr.split(" ");
        //     var day = dateArr[2];

        //     var time = $scope.startSelectedTime;
        //     var timeStr = String(time);
        //     var timeSlice = timeStr.slice(0, -3);
        //     var timeArr = timeSlice.split(":");
        //     var hours = timeArr[0];
        //     var minutes = timeArr[1];

        //     // console.log($scope.dateSelected);

        //     addToCalendar(title, eventLocation, notes, 2016, 8, day, hours, minutes, $calendar, modal, $scope);

        //   } else {
        //     navigator.notification.alert(
        //       "Please fill in the required fields before submitting the event again",  // message
        //       null,         // callback
        //       'Field Input Missing',            // title
        //       'Done'                  // buttonName
        //     );
        //   }

        // }
      });

    }
  }
}])

// // twitter functionality factories
// .factory('Base64', function(){
//     var self = this;
//     self.encode = function (input) {
//         // Converts each character in the input to its Unicode number, then writes
//         // out the Unicode numbers in binary, one after another, into a string.
//         // This string is then split up at every 6th character, these substrings
//         // are then converted back into binary integers and are used to subscript
//         // the "swaps" array.
//         // Since this would create HUGE strings of 1s and 0s, the distinct steps
//         // above are actually interleaved in the code below (ie. the long binary
//         // string, called "input_binary", gets processed while it is still being
//         // created, so that it never gets too big (in fact, it stays under 13
//         // characters long no matter what).

//         // The indices of this array provide the map from numbers to base 64
//         var swaps = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
//         var input_binary = "";      // The input string, converted to Unicode numbers and written out in binary
//         var output = "";        // The base 64 output
//         var temp_binary;        // Used to ensure the binary numbers have 8 bits
//         var index;      // Loop variable, for looping through input
//         for (index=0; index < input.length; index++){
//             // Turn the next character of input into astring of 8-bit binary
//             temp_binary = input.charCodeAt(index).toString(2);
//             while (temp_binary.length < 8){
//                 temp_binary = "0"+temp_binary;
//             }
//             // Stick this string on the end of the previous 8-bit binary strings to
//             // get one big concatenated binary representation
//             input_binary = input_binary + temp_binary;
//             // Remove all 6-bit sequences from the start of the concatenated binary
//             // string, convert them to a base 64 character and append to output.
//             // Doing this here prevents input_binary from getting massive
//             while (input_binary.length >= 6){
//                 output = output + swaps[parseInt(input_binary.substring(0,6),2)];
//                 input_binary = input_binary.substring(6);
//             }
//         }
//         // Handle any necessary padding
//         if (input_binary.length == 4){
//             temp_binary = input_binary + "00";
//             output = output + swaps[parseInt(temp_binary,2)];
//             output = output + "=";
//         }
//         if (input_binary.length == 2){
//             temp_binary = input_binary + "0000";
//             output = output + swaps[parseInt(temp_binary,2)];
//             output = output + "==";
//         }
//         // Output now contains the input in base 64
//         return output;
//     };

//     self.decode = function (input) {
//         // Takes a base 64 encoded string "input", strips any "=" or "==" padding
//         // off it and converts its base 64 numerals into regular integers (using a
//         // string as a lookup table). These are then written out as 6-bit binary
//         // numbers and concatenated together. The result is split into 8-bit
//         // sequences and these are converted to string characters, which are
//         // concatenated and output.
//         input = input.replace("=","");      // Padding characters are redundant
//         // The index/character relationship in the following string acts as a
//         // lookup table to convert from base 64 numerals to Javascript integers
//         var swaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
//         var output_binary = "";
//         var output = "";
//         var temp_bin = "";
//         var index;
//         for (index=0; index < input.length; index++) {
//             temp_bin = swaps.indexOf(input.charAt(index)).toString(2);
//             while (temp_bin.length < 6) {
//                 // Add significant zeroes
//                 temp_bin = "0"+temp_bin;
//             }
//             while (temp_bin.length > 6) {
//                 // Remove significant bits
//                 temp_bin = temp_bin.substring(1);
//             }
//             output_binary = output_binary + temp_bin;
//             while (output_binary.length >= 8) {
//                 output = output + String.fromCharCode(parseInt(output_binary.substring(0,8),2));
//                 output_binary = output_binary.substring(8);
//             }
//         }
//         return output;
//     };
    
//     return self;
// })

// .factory('TwitterREST', function($http, $q, Base64){

//     var self = this;
//     var authorization = null;
//     var consumerKey = "av0UAPWv5CGBZKym3XWdkV33t";
//     var consumerSecret = "FtO44ZSrqs6OPsQ5ay7WiAkvvCUoQDaXuDBS7xZRXIGBuuthsR";
//     var twitterTokenURL = "https://api.twitter.com/oauth2/token";
//     var twitterStreamURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=190004740&count=10"; //url query, this one is for hash tags
//     // var qValue = "%23belgrade"; //hash tag %23 is for #
//     // var numberOfTweets = "&count=10";

//     self.sync = function () {
//         var def = $q.defer();
//         //get authorization token
//         self.getAuthorization().then(function(){
//             var req1 = {
//                 method: 'GET',
//                 url: twitterStreamURL,
//                 headers: {
//                     'Authorization': 'Bearer '+authorization.access_token,
//                     'Content-Type': 'application/json'
//                 },
//                 cache:true
//             };
//             // make request with the token
//             $http(req1).
//                 success(function(data, status, headers, config) {
//                     def.resolve(data);
//                 }).
//                 error(function(data, status, headers, config) {

//                     def.resolve(false);
//                 });
//         });
//         return def.promise;
//     };

//     self.getAuthorization = function () {
//       var def = $q.defer();
//       var base64Encoded;

//       var combined = encodeURIComponent(consumerKey) + ":" + encodeURIComponent(consumerSecret);

//       base64Encoded = Base64.encode(combined);

//       // Get the token
//       $http.post(twitterTokenURL,"grant_type=client_credentials", {headers: {'Authorization': 'Basic ' + base64Encoded, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}).
//           success(function(data, status, headers, config) {
//             authorization = data;
//             if (data && data.token_type && data.token_type === "bearer") {
//                 def.resolve(true);
//             }
//           }).
//           error(function(data, status, headers, config) {
//             def.resolve(false);
//           });
//       return def.promise;
//     };

//     return self;
// });