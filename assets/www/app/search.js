OCD.search = {};
OCD.search.data = {};

// Variabili correnti
OCD.search.data.category;
OCD.search.data.layer;

$(window).bind('ready', function() {
	OCD.search.category = $('#search-page .category-lbl');
	OCD.search.layer = $('#search-page .layer-lbl');
	OCD.search.button = $('#search-page .search-btn');
	
	$(window).on('ocd/position-update', function(){
		OCD.search.button.removeClass('ui-disabled');
	});

	$('#search-page').on('pageshow pageinit', function() {
		var template = Handlebars.compile(OCD.urls.geonode.layers);
		var url = template({slug: OCD.layer.category});
		
		OCD.search.category.text(OCD.search.data.category);
		OCD.search.layer.text(OCD.search.data.layer);
	});
	
	OCD.search.button.on('click', function(){
		if(OCD.gps.current != null){
			var p = OCD.gps.current;
			
			var lat = p.coords.latitude;
			var lon = p.coords.longitude;
			
			var delta = 0.005;
			
			var b1 = lat - delta;
			var b2 = lon - delta;
			var b3 = lat + delta;
			var b4 = lon + delta;
			
			var bbox = b1 + ',' + b2 + ',' + b3 + ',' + b4;
			
			OCD.poi.data.bbox = bbox;
			OCD.poi.data.layer = OCD.search.data.layer;
			
			$.mobile.changePage("#poi-page");
		}
	});
});