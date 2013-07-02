OCD.comments_form = {};
OCD.comments_form.data = {};

// Variabili
OCD.comments_form.data.poi_id;

$(window).bind('ready', function() {
	OCD.comments_form.form = $('#new-comment-page .form');
	OCD.comments_form.submit = $('#new-comment-page .submit');
	OCD.comments_form.comment = $('#new-comment-page .comment');
	
	$('#new-comment-page').on('pageinit pageshow', function(){
		OCD.comments_form.comment.val('');
		OCD.comments_form.submit.addClass('ui-disabled');
	});
	
	$(document).on('keyup', function(){
		if(OCD.comments_form.comment.val() == ''){
			OCD.comments_form.submit.addClass('ui-disabled');
		} else {
			OCD.comments_form.submit.removeClass('ui-disabled');
		}
	});
	
	OCD.comments_form.submit.on('click', function(){
		
		var template = Handlebars.compile(OCD.urls.geonode.add_comment);
		var url = template({
			poi_id : OCD.comments_form.data.poi_id
		});
		
		OCD.comments_form.form.ajaxSubmit({
			url : url,
			type : 'post',
			success : function(data, status) {
				$('#new-comment-page').dialog('close');
			},
			error : function(xhr, status, error){
				OCD.main.info.text('Comment: ' + error);
				alert("Si è verificato un errore");
			},
		});
	});
});