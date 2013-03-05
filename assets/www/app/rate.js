OCD.rate = {};
OCD.rate.data = {};

// Variabili
OCD.rate.data.poi_id;

OCD.rate.rate = function(value) {

	var template = Handlebars.compile(OCD.urls.geonode.set_rate);
	var url = template({
		poi_id : OCD.rate.data.poi_id
	});

	$.ajax({
		url : url,
		type : 'post',
		data : {
			rating : value,
			category : 'poi',
		},
		success : function(data, status) {
			$('#rate-page').dialog('close');
		},
	});
};