OCD.main = {};
OCD.logout = {};

$(window).bind('ready', function() {
	OCD.main.page = $('#main-page');
	OCD.main.info = $('#main-page .info-lbl');
	OCD.main.search = $('#main-page .search-btn');
	OCD.main.logout = $('#main-page .logout-btn');
	OCD.main.signup = $('#main-page .signup-btn');
	OCD.main.login = $('#main-page .login-btn');
	OCD.logout.logout = $('#logout-page .logout-btn');
	OCD.logout.form = $('#logout-page .logout-form');
	OCD.logout.token = $('#logout-page .logout-form [name=csrfmiddlewaretoken]');
	
	
	// EVENTI VARI
	$(window).on('ocd/position-update', function(){
		$('#main-page .latitude').text(OCD.gps.current.coords.latitude);
		$('#main-page .longitude').text(OCD.gps.current.coords.longitude);
	});
	
	$(window).on('ocd/login', function() {
		OCD.main.search.removeClass('ui-disabled')
		OCD.main.logout.removeClass('ui-disabled')
		
		// Modifica a seguito dello spostamento in main della login
		OCD.main.search.show();
		OCD.main.logout.show();
		OCD.login.form.hide();
		OCD.main.signup.hide();
	});

	$(window).on('ocd/logout', function() {
		OCD.main.search.addClass('ui-disabled')
		OCD.main.logout.addClass('ui-disabled')
		
		// Modifica a seguito dello spostamento in main della login
		OCD.main.search.hide();
		OCD.main.logout.hide();
		OCD.login.form.show();
		OCD.main.signup.show();
	});

	$(window).on('ocd/token', function() {
		OCD.main.login.removeClass('ui-disabled');
		OCD.main.signup.removeClass('ui-disabled');
		
		// Settiamo il token
		OCD.logout.token.val(OCD.ajax.cookie['csrftoken']);
	});
	
	
	
	// TASTO LOGOUT
	OCD.logout.logout.on('click', function() {
		
		OCD.logout.form.ajaxSubmit({
			url : OCD.urls.geonode.logout,
			type : 'post',
			success : function(xhr, status) {
				OCD.main.info.text('Logout: ' + status);
				if(status == 'success'){
					$(window).trigger('ocd/logout');
				}
				
				$('#logout-page').dialog('close');
			},
		});
	});
	
	
	
	
	// TASTO REGISTRATI
	OCD.main.signup.on('click', function() {
		$.ajax({
			url : OCD.urls.geonode.token,
			type : 'get',
			success : function(data, status) {
				OCD.ajax.cookie = data;
				OCD.signup.token.val(data['csrftoken']);
			},
		});
	});
	
	OCD.ajax.token();	
	
	
	// DEBUG
//	OCD.comments.data.poi = "monaco_poi.327";
//	$.mobile.changePage($('#comments-page'));
});