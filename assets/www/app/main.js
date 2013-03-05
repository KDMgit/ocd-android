OCD.main = {};

$(window).bind('ready', function() {
	OCD.main.info = $('#main-page .info-lbl');
	OCD.main.search = $('#main-page .search-btn');
	OCD.main.logout = $('#main-page .logout-btn');
	
	$(window).on('ocd/position-update', function(){
		$('#main-page .latitude').text(OCD.gps.current.coords.latitude);
		$('#main-page .longitude').text(OCD.gps.current.coords.longitude);
	});
	
	$(window).on('ocd/login', function() {
		OCD.main.search.removeClass('ui-disabled')
		OCD.main.logout.removeClass('ui-disabled')
	});

	$(window).on('ocd/logout', function() {
		OCD.main.search.addClass('ui-disabled')
		OCD.main.logout.addClass('ui-disabled')
	});

	OCD.main.logout.on('click', function() {
		$.ajax({
			url : OCD.urls.geonode.logout,
			type : 'get',
			success : function(xhr, status) {
				OCD.main.info.text('Logout: ' + status);
				if(status == 'success'){
					$(window).trigger('ocd/logout');
				}
			},
		});
	});
	
	// DEBUG
//	OCD.comments.data.poi = "monaco_poi.327";
//	$.mobile.changePage($('#comments-page'));
});