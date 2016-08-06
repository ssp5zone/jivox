define(['jquery','jquery.form','notify'],function($){
	$(document).ready(function(){

		/**
		 * Process Login
		 */
		$('#loginform').ajaxForm({
			success: function(response) {
				if(response=='success') {
					window.location.href= '/jivox/products/product';
				} else{				
					$('#login_btn').notify(response,{position:'bottom'});
				}
			},
			error:function (jqXHR){}
		});
	});
});
