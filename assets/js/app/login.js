define(['jquery','jquery.form','notify'],function($){
	$(document).ready(function(){

		/**
		 * Process Login
		 */
		$('#loginform').ajaxForm({
			success: function(response) {				
				$('#login_btn').notify(response,{position:'bottom'});
			},
			error:function (jqXHR){}
		});
	});
});
