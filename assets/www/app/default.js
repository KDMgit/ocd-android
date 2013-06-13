var OCD = {};

/**
 * INIT
 */
OCD.init = function(){
	
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	// $.mobile.phonegapNavigationEnabled = true
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
	$.mobile.selectmenu.prototype.options.hidePlaceholderMenuItems = false;
	
	// Spinner
	$(document).ajaxStart(function(){
		$.mobile.loading( 'show' )
	});
	
	$(document).ajaxStop(function(){
		$.mobile.loading( 'hide' )
	});
};

$(document).bind("mobileinit", function() {
	OCD.init();
});

$(window).bind('load', function(){
	OCD.init();
});

/**
 * URLS
 */
OCD.urls = {};
OCD.urls.geonode = {};

// http://localhost:5000/Proxy/?
//OCD.urls.geonode.host = 'http://192.168.0.67:8000';
//OCD.urls.geonode.host = 'http://95.110.167.11';
OCD.urls.geonode.host = 'http://localhost:8000';
OCD.urls.geonode.login = OCD.urls.geonode.host + '/mobile/login';
OCD.urls.geonode.logout = OCD.urls.geonode.host + '/mobile/logout';
OCD.urls.geonode.categories = OCD.urls.geonode.host + '/mobile/categories/';
OCD.urls.geonode.layers = OCD.urls.geonode.host + '/mobile/categories/{{slug}}/';
OCD.urls.geonode.search = OCD.urls.geonode.host + '/mobile/search/{{layer}}/{{bbox}}/';
OCD.urls.geonode.poi_detail = OCD.urls.geonode.host + '/mobile/{{poi_id}}/';
OCD.urls.geonode.comments = OCD.urls.geonode.host + '/mobile/{{poi_id}}/comments/';
OCD.urls.geonode.add_comment = OCD.urls.geonode.host + '/mobile/{{poi_id}}/comments/add';
OCD.urls.geonode.set_rate = OCD.urls.geonode.host + '/mobile/{{poi_id}}/rating/user/set';


/**
 * GPS
 */
OCD.gps = {};
OCD.gps.current;
OCD.gps.options = { maximumAge: 3000, timeout: 60000, enableHighAccuracy: true };

OCD.gps.onSuccess = function(position){
	OCD.gps.current = position;
	$(window).trigger('ocd/position-update');
};

OCD.gps.onError = function(error){
	OCD.main.info.text(error.code + ': ' + error.message);
};

OCD.gps.getCurrenthId = navigator.geolocation.getCurrentPosition(OCD.gps.onSuccess, OCD.gps.onError, OCD.gps.options);
OCD.gps.watchId = navigator.geolocation.watchPosition(OCD.gps.onSuccess, OCD.gps.onError, OCD.gps.options);
	



/**
 * AJAX FIX
 */
//using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
    	var csrftoken = getCookie('csrftoken');
        if (!csrfSafeMethod(settings.type)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


/**
 * HANDLEBARS
 */
Handlebars.registerHelper('forEach', function(context, options) {
    var ret = "";
    for(var prop in context)
    {
        ret = ret + options.fn({key:prop,value:context[prop]});
    }
    return ret;
});



