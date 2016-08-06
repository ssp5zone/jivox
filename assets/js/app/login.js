define(['jquery','jquery.form'],function($){
	$(document).ready(function(){
		
		/**
		 * Javascript Check
		 */
		$('#jscript').remove();
		$('#login_btn').prop('disabled',false);
		
		/**
		 * Process Login
		 */
		$('#loginform').ajaxForm({
			timeout:3000,
			beforeSubmit:  function() {
				$('#login_btn').prop('disabled',true).html("<span class='icon-wait animate-spin'></span> Authenticating...");
			},
			success: function(response) {
				if (response.logged){
					$('#login_btn').prop('disabled',true).html("<span class='icon-ok'></span> Redirecting...");
					window.location.href= response.to;
				} else {
					$('#login_btn').prop('disabled',false).html('Login');
					if (response.msg){
						$('#loginTxt').show().html(response.msg);
					} else {
						$('#loginTxt').show().html(response);
					}
					setTimeout(function(){$('#loginTxt').fadeOut();},8000)
				}
			},
			error:function (jqXHR,txtStatus){
				if (txtStatus=="timeout"){
					$('#loginTxt').show().html("Login request timed out.");
					$('#login_btn').prop('disabled',false).html('Login');
				} else {
					$('#loginTxt').show().html(jqXHR.responseText);
				}
			}
		});
	});
});