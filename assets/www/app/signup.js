OCD.signup = {}

$(window).bind('ready', function() {
	OCD.signup.form = $('#signup-page .signup-form');
	OCD.signup.token = $('#signup-page .signup-form [name=csrfmiddlewaretoken]');
	
	$('#signup-page').on('pageshow pagehide ocd/singup/success', function() {
		
		OCD.signup.form.find(".error").each(function(i, e){
			$(e).text("");
		});
		
		OCD.signup.form.find("input").each(function(i, e){
			$(e).val("");
		});
	});
	
	$(window).on('ocd/token', function() {
		OCD.signup.token.val(OCD.ajax.cookie['csrftoken']);
	});

	$('#signup-page .signup-btn').bind('click', function() {
		OCD.signup.form.ajaxSubmit({
			url : OCD.urls.geonode.signup,
			type : 'post',
			success : function(data, status, xhr) {
				//OCD.main.info.text('SignUp: ' + status);
				$('#signup-page').dialog('close');
				
				if (status == 'success') {
					$(window).trigger('ocd/login');
					
					OCD.signup.form.find(".error").each(function(i, e){
						$(e).text("");
					});
				}
				
				OCD.ajax.cookie = data.cookie;
			},
			error : function(xhr, status, error){
				//OCD.main.info.text('SignUP: ' + error);
				$(window).trigger('ocd/logout');
				
				data = $.parseJSON(xhr.responseText);
				
				for(e in data.errors){
					sel = "." + e + "-error"
					text = data.errors[e][0]
					
					OCD.signup.form.find(sel).text(text);
				}
				
				//$('#signup-page').dialog('close');
			},
		});
	});
});