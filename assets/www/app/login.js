OCD.login = {}

$(window).bind('ready', function() {
	OCD.login.form = $('#main-page .login-form');
	$(window).trigger('ocd/logout');

	$('#main-page .login-btn').bind('click', function() {
		OCD.login.form.ajaxSubmit({
			url : OCD.urls.geonode.login,
			type : 'get',
			success : function(data, status, xhr) {
				OCD.main.info.text('Login: ' + status);
				//$('#login-page').dialog('close');
				if (status == 'success') {
					$(window).trigger('ocd/login');
				}
				
				OCD.ajax.cookie = data;
			},
			error : function(xhr, status){
				OCD.main.info.text('Login: ' + status);
				$(window).trigger('ocd/logout');
				//$('#login-page').dialog('close');
			},
		});
	});
});