OCD.poi_details = {};
OCD.poi_details.data = {};
OCD.poi_details.details = {};

//Variabili correnti
OCD.poi_details.data.poi_id;

$(window).bind('ready', function() {
	OCD.poi_details.details = $('#poi-details-page .details-lst')
	
	$('#poi-details-page').on('pageshow', function() {
		
		OCD.poi_details.comments = $('#poi-details-page .comments-btn');
		
		var template = Handlebars.compile(OCD.urls.geonode.poi_detail);
		var url = template({poi_id: OCD.poi_details.data.poi_id});
		
		OCD.poi_details.details.empty();
		
		$.ajax({
			url: url,
			type: 'get',
			success: function(data, status){
				OCD.poi_info.data.info = data;
				
				var template = Handlebars.compile($('#poi-details-template').html());
				var html = template(data);
				OCD.poi_details.details.empty();
				OCD.poi_details.details.append(html);
				OCD.poi_details.details.listview('refresh');
				
				OCD.poi_details.comments = $('#poi-details-page .comments-btn');
				OCD.poi_details.comments.button();
				
				OCD.poi_details.comments.on('click', function(){
					OCD.comments.data.poi = $(this).data('id');
					$.mobile.changePage($('#comments-page'));
				});
				
				OCD.poi_details.rate = $('#poi-details-page .rate-btn');
				OCD.poi_details.rate.button();
				
				OCD.poi_details.rate.on('click', function(){
					OCD.rate.data.poi_id = $(this).data('id');
					$.mobile.changePage($('#rate-page'));
				});
				
				OCD.poi_details.info = $('#poi-details-page .info-btn');
				OCD.poi_details.info.button();
				
			},
		});
	});
});