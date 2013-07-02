OCD.category = {};
OCD.category.data = {};

$(window).bind('ready', function() {
	OCD.category.categories = $('#category-page .category-lst');

	$('#category-page').on('pageinit', function() {
		$.ajax({
			url : OCD.urls.geonode.categories,
			type : 'get',
			success : function(data, status) {
				if (status == 'success') {
					// Salviamo le categorie
					OCD.category.data.categories = data;
					
					// Svuotiamo la lista
					OCD.category.categories.empty();

					// Prepariamo il template
					var source = $("#category-entry-template").html();
					var template = Handlebars.compile(source);
					
					// Aggiungiamo gli elementi alla lista
					for(i in data){
						var c = data[i];
						var html = template(c);
						
						var li = $(html.trim()).on('click', function(){
							OCD.layer.category = $(this).data('slug');
							OCD.layer.category_name = $(this).data('name');
							$.mobile.changePage($('#layers-page'));
						});
						
						OCD.category.categories.append(li);
					}
					
					// Refresh
					OCD.category.categories.listview( "refresh" );
				}
			},
		});
	});
});