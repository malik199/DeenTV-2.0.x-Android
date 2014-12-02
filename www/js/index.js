/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
    initPushwoosh();
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
    init_app();
}
};




//*************************** Init function ***************************
function init_app(){
   $(function(){
    function checkConnection() {
        var networkState = navigator.connection.type;
        
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        
        if(states[networkState] == "No network connection"){
            alert("You have no internet connection");
        }
    }
    
    checkConnection();
    
    var deviceType = (device.platform == 'iOS' && screen.width == 768) ? 'ipad' : (
    deviceType = (device.platform == 'iOS' && screen.width < 768) ? 'iphone' : (
    deviceType = (device.platform == 'Android' && screen.width > 768) ? 'android-phone' : 'android-tab'));

    //var p = $("#list_videos");
    //var offset = p.offset();
    
    var p = $( "#wrapper" );
    var offset = p.offset();
    var padding = 16;
    
    var logo_video_search_height = Math.round($("#logo_video_search").height());
    var just_logo_header = Math.round($(".logo").height());
    var footer_height = $(".ui-footer").outerHeight();
    //$("#list_videos").height($(window).height() - ((logo_video_search_height + (padding * 2)) + footer_height));
    $("#wrapper").height($(window).height() - ((logo_video_search_height + (padding * 2)) + footer_height));
    $("#schedule_content, #about_content, #show_content").height($(window).height() - ((just_logo_header + (padding * 2)) + footer_height));
    
	//refresh pages
	$(".refresh").click(function(){
		window.location = "index.html";
	});
	
	
	
    }); // End of Jquery Function
} //*** End of init function ***



//*************************** PUSHWOOSH ***************************
function initPushwoosh() {
    var pushNotification = window.plugins.pushNotification;
    
    //set push notification callback before we initialize the plugin
    document.addEventListener('push-notification', function(event) {
                              //get the notification payload
                              var notification = event.notification;
                              
                              //display alert to the user for example
                              alert(notification.aps.alert);
                              
                              //clear the app badge
                              pushNotification.setApplicationIconBadgeNumber(0);
                              });
    
    //initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"0995F-2724A"});
    
    //register for pushes
    pushNotification.registerDevice(
                                    function(status) {
                                    var deviceToken = status['deviceToken'];
                                    console.warn('registerDevice: ' + deviceToken);
                                    },
                                    function(status) {
                                    console.warn('failed to register : ' + JSON.stringify(status));
                                    //alert(JSON.stringify(['failed to register ', status]));
                                    }
                                    );
    
    //reset badges on app start
    pushNotification.setApplicationIconBadgeNumber(0);
}