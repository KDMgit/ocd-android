OCD.poi_details = {};
OCD.poi_details.data = {};

//Variabili correnti
OCD.poi_details.data.poi_id;

$(window).bind('ready', function() {
	OCD.poi_details.details = $('#poi-details-page .details-lst')
	
	$('#poi-details-page').on('pageshow pageinit', function() {
		var template = Handlebars.compile(OCD.urls.geonode.poi_detail);
		var url = template({poi_id: OCD.poi_details.data.poi_id});
		
		OCD.poi_details.details.empty();
		
		$.ajax({
			url: url,
			type: 'get',
			success: function(data, status){
				var template = Handlebars.compile($('#poi-details-template').html());
				var html = template(data);
				OCD.poi_details.details.empty();
				OCD.poi_details.details.append(html);
				OCD.poi_details.details.listview('refresh');
			},
		});
	});
});