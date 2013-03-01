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
OCD.urls.geonode.host = 'http://localhost:8000';
OCD.urls.geonode.login = OCD.urls.geonode.host + '/mobile/login';
OCD.urls.geonode.logout = OCD.urls.geonode.host + '/mobile/logout';
OCD.urls.geonode.categories = OCD.urls.geonode.host + '/mobile/categories/';
OCD.urls.geonode.layers = OCD.urls.geonode.host + '/mobile/categories/{{slug}}/';
OCD.urls.geonode.search = OCD.urls.geonode.host + '/mobile/search/{{layer}}/{{bbox}}/';
OCD.urls.geonode.poi_detail = OCD.urls.geonode.host + '/mobile/{{poi_id}}/';


/**
 * GPS
 */
OCD.gps = {};
OCD.gps.current;

OCD.gps.watchId = navigator.geolocation.getCurrentPosition(function(position){
	if(position == null){
		alert();
	}
	OCD.gps.current = position;
	$(window).trigger('ocd/position-update');
});

OCD.gps.watchId = navigator.geolocation.watchPosition(function(position){
	if(position == null){
		alert();
	}
	OCD.gps.current = position;
	$(window).trigger('ocd/position-update');
});









