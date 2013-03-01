OCD.layer = {};
OCD.layer.data = {};

// Categoria corrente
OCD.layer.category;

$(window).bind('ready', function() {
	OCD.layer.layers = $('#layers-page .layers-lst');

	$('#layers-page').on('pageshow', function() {
		var template = Handlebars.compile(OCD.urls.geonode.layers);
		var url = template({slug: OCD.layer.category});
		
		$.ajax({
			url : url,
			type : 'get',
			success : function(data, status) {
				if (status == 'success') {
					// Salviamo i layers
					OCD.layer.data.layers = data;
					
					// Svuotiamo la lista
					OCD.layer.layers.empty();

					// Prepariamo il template
					var source = $("#layer-entry-template").html().trim();
					var template = Handlebars.compile(source);
					
					// Aggiungiamo gli elementi alla lista
					for(i in data){
						var l = data[i];
						var html = template(l);
						
						var li = $(html.trim()).on('click', function(){
							OCD.search.data.category = OCD.layer.category;
							OCD.search.data.layer = $(this).data('typename');
							
							$.mobile.changePage($('#search-page'));
						});
						
						OCD.layer.layers.append(li);
					}
					
					// Refresh
					OCD.layer.layers.listview( "refresh" );
				}
			},
		});
	});
});