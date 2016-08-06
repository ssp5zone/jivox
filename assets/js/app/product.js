define(['jquery','require','cookie','jquery-ui','jquery.form','notify'],function($){
	$(document).ready(function(){

		$('.container').on('click',function(){//alert($(this).attr('data-id'))
			unloadScrollBars();
			$('#review-page-overlay').css('top','0px');
			$('#review-page-overlay').height($(window).height()+10);
		
			$('#review-page-overlay').show().animate({left:($(window).width()-$('#review-page-overlay').width())+"px"});
			var that =$(this);
			$('#review-page-load').empty().load('/jivox/products/review/'+$(this).attr('data-id'),function(response,status,rev){
				$('#review-page-load').html(rev.responseText);
			});

			/**
			 * Pipeline comments form
			 */
			$('#review-page-overlay').height($(window).height()-$('#header').height()+10);
			$('#review-page-overlay').css('left',$(window).width()+'px');
			$('#review-page-overlay').resizable({handles:"w"})
					
			$('#rev-close').on('click',function(){
				$('#review-page-overlay').animate({left:$(window).width()+"px"},{
					complete:function(){
						$(this).hide();
						reloadScrollBars();
					}
				});
			});

			//Add reviews
			$('#review-form').ajaxForm({
				beforeSubmit:function(){
					if ($('#addRev').val()==''){
						$('#addRev').notify("Please enter Review",{position:'bottom'});
						return false;
					}
					$('#rev-btn').prop('disabled',true).val('Adding...');
				},
				success:function(data){
					var obj = {
						createdby	:data.createdby,
						timestamp	:data.timestamp,
						comment		:$('#addRev').val()
					}
					require(['template'],function(tmpl){
						var pip = tmpl("review_tmpl",obj);
						$('#review-page-load .scroll-section').prepend(pip);
						$("#review-page-load .scroll-section").scrollTop('0');
					});
					$('#rev-btn').prop('disabled',false).val('ADD');
					$('#rev-btn').notify('Review has been added',{position:'right',className:'success',showDuration:50})
				},
				error:function(JQXHR){
					alert(JQXHR.responseText);
					$('#rev-btn').prop('disabled',false).val('ADD');
				}
			});

			//Show the Scroll Bars
			function reloadScrollBars() {
				document.documentElement.style.overflow = 'auto';  // firefox, chrome
				document.body.scroll = "yes"; // ie only
			}
			//Hide the Scroll Bars
			function unloadScrollBars() {
				document.documentElement.style.overflow = 'hidden';  // firefox, chrome
				document.body.scroll = "no"; // ie only
			}
		});

	});
});
