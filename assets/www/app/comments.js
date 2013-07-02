OCD.comments = {};
OCD.comments.data = {};

// Variabili
OCD.comments.data.poi;

$(window).bind('ready', function() {
	OCD.comments.comments = $('#comments-page .comments-lst');

	$('#comments-page').on('pageinit pageshow', function() {
		var template = Handlebars.compile(OCD.urls.geonode.comments);
		var url = template({poi_id: OCD.comments.data.poi});
		
		OCD.comments_form.data.poi_id = OCD.comments.data.poi;
		
		$.ajax({
			url : url,
			type : 'get',
			success : function(data, status) {
				if (status == 'success') {
					// Svuotiamo la lista
					OCD.comments.comments.empty();

					// Prepariamo il template
					var source = $("#poi-comments-template").html().trim();
					var template = Handlebars.compile(source);
					
					var html = template({comments: data});
					
					OCD.comments.comments.append(html);
					
					$('#new-comment').button();
					
					// Refresh
					OCD.comments.comments.listview( "refresh" );
				}
			},
		});
	});
});