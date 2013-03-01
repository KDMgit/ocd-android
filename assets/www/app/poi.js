OCD.poi = {};
OCD.poi.data = {};

// Variabili correnti
OCD.poi.data.poi;
OCD.poi.data.bbox;
OCD.poi.data.layer;

$(window).bind('ready', function() {
	OCD.poi.pois = $('#poi-page .pois-lst');

	$('#poi-page').on('pageshow', function() {
		var template = Handlebars.compile(OCD.urls.geonode.search);
		var url = template({
			layer : OCD.poi.data.layer,
			bbox : OCD.poi.data.bbox,
		});
		
		$.ajax({
			url : url,
			type : 'get',
			success : function(data, status) {
				if (status == 'success') {
					// Svuotiamo la lista
					OCD.poi.pois.empty();

					// Prepariamo il template
					var source = $("#poi-entry-template").html().trim();
					var template = Handlebars.compile(source);

					// Aggiungiamo gli elementi alla lista
					for (i in data.features) {
						var l = data.features[i];
						var html = template(l);

						var li = $(html.trim()).on('click', function() {
							OCD.poi_details.data.poi_id = $(this).data('id');
							$.mobile.changePage("#poi-details-page");
						});
						
						OCD.poi.pois.append(li);
					}

					// Refresh
					OCD.poi.pois.listview("refresh");
				}
			},
		});
	});
});