OCD.poi_info = {};
OCD.poi_info.data = {};

//Variabili correnti
OCD.poi_info.data.info;

$(window).bind('ready', function() {
	OCD.poi_info.details = $('#poi-info-page .details-lst')
	
	$('#poi-info-page').on('pageshow', function() {
		
		var template = Handlebars.compile(OCD.urls.geonode.poi_detail);
		var url = template({poi_id: OCD.poi_details.data.poi_id});
		
		OCD.poi_info.details.empty();
		
		var template = Handlebars.compile($('#poi-info-template').html());
		var html = template(OCD.poi_info.data.info);
		OCD.poi_info.details.empty();
		OCD.poi_info.details.append(html);
		OCD.poi_info.details.listview('refresh');
		
	});
});