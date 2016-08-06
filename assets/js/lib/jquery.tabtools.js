define(['jquery','notify'],function ($) {
	
	/**
	 * Drill Down the table to the lower levels
	 */
	$.fn.drillDown = function(options) {
		
		//Defaults
        var settings = $.extend({
            event: 'click',
			postProcess : function(){}
        }, options );
		
		this.find('.clickrow').each(function(index,el){
			var arrow = $('<span></span>',{'class':'arrow'});
			$(el).children().first().prepend(arrow);
		});
		
		this.on(settings.event,'.clickrow',function(){
			if ($(this).hasClass('expanded') || $(this).hasClass('collapsed')){ //If the data exists then one of the classes should exist
				if ($(this).hasClass('expanded')){ //Collapse the rows
					$('.'+$(this).attr('id')).addClass('hidden');
					$('.'+$(this).attr('id')).filter(".expanded").removeClass("expanded").addClass("collapsed");
					$(this).removeClass('expanded').addClass('collapsed');					
				} else { //Expand the rows
					var classN = $.trim($(this).attr('class').replace("clickrow","").replace("collapsed","").replace("expanded","").replace("hidden","").replace("pclosed","").replace("view",""));
					if (classN==""){ var cnt = 0 } else { var cnt = classN.split(" ").length }
					$('.'+$(this).attr('id')).each(function(index,el){
						var classN2 = $.trim($(el).attr('class').replace("clickrow","").replace("collapsed","").replace("expanded","").replace("hidden","").replace("pclosed","").replace("view",""));
						if (classN2 == ""){ var cnt2 = 0 } else { var cnt2 = classN2.split(" ").length }						
						if(cnt2==cnt+1){ $(el).removeClass("hidden") }
					});
					$(this).removeClass('collapsed').addClass('expanded');
				}
			} else { //The data does not exits fetch it
				var that = $(this);
				var cellCount = that.children().length;
				$.ajax({
					url:'/'+that.attr('data-qs'),
					beforeSend:function(){
						$('<tr></tr>',{
							id	: 'loadrow',
							html: '<td colspan="'+cellCount+'" style="text-align:center"><img src="/assets/img/loading.gif" /></td>'
						}).insertAfter(that);
					}
				}).done(function(response){
					
					if(typeof(response)=="string"){
						$('#site-error').removeClass('hidden');
						$('#site-error-body').html(response);
					} else {
						$('#loadrow').remove();
						if (response.numrows > 0){
							var parent = that.parents('table').attr('id');
							$('#'+parent+' .col_expander').trigger('click');
							var padLeft = Number(that.children().first().css('padding-left').replace("px",""));
							var last_row;						
							$.each(response.data,function(index,value){
								//Create the row
								var row = $('<tr></tr>',{
									'html'	: value.row,
									'id'	: value.id,
									'class'	: value.className
								});
								//Add the classes from the parent
								row.addClass(that.attr('class')).addClass(that.attr('id')).removeClass("expanded");
								//If there is no qs, then there is no further click, remove the clickrow class
								if (typeof(value.qs) == "undefined"){
									row.removeClass('clickrow');
								} else { //Otherwise add in the qs.
									row.attr('data-qs',value.qs);
									var arrow = $('<span></span>',{'class':'arrow'});
									row.children().first().prepend(arrow);
								}
								//Add in the padding - increment 30 on the parent
								row.children().first().css('padding-left',(padLeft+20)+"px");
								if (row.children().first().attr('data-addlevel')){
									var add_pad = Number(row.children().first().attr('data-addlevel'));
									row.children().first().removeAttr('data-addlevel')
									row.children().first().css('padding-left',(padLeft+20+20*add_pad)+"px");
								}
								if (last_row)
									row.insertAfter(last_row);
								else
									row.insertAfter(that);
								last_row = row;
							});
							$('#'+parent+' .col_expander').trigger('click');
							that.addClass('expanded');
						} else {
							require['notify']
							that.notify('No Further Rows Found.',{position:'bottom',className: "info",showDuration:100,autoHideDelay: 2000});
						}
					}
				}).error(function(JQXHR){
					$('#site-error').removeClass('hidden');
					$('#site-error-body').html(JQXHR.responseText);
					$('#loadrow').remove();
				});
			}
		});	

		return this;
	};
	
	/**
 	 * Expand the columns by clicking on the headers
	 */
	$.fn.colExpander = function() {
	
		//Hide the columns for the expander
		this.children().find('.col_expander').each(function(index,el){
			$(el).addClass('col_collapsed');
			$(el).children('small').html('+')
			var num_cols = Number($(el).attr('data-ncols'));
			var parent = $(el).parents('table').attr('id');
			var ind = el.cellIndex
			for (i=ind+2;i<=ind+num_cols;i++){
				$('#'+parent+' th:nth-child('+i+')').addClass('hidden');
				$('#'+parent+' td:nth-child('+i+')').addClass('hidden');
			}
		});
		
		//Add the Expander Event
		this.on('click','.col_expander',function(){
			var parent = $(this).parents('table').attr('id');
			var num_cols = Number($(this).attr('data-ncols'));
			var ind = this.cellIndex
			if ($(this).hasClass('col_collapsed')){
				$(this).removeClass('col_collapsed');
				$(this).addClass('col_expanded');
				$(this).children('small').html('-');
				for (i=ind+2;i<=ind+num_cols;i++){
					$('#'+parent+' th:nth-child('+i+')').removeClass('hidden');
					$('#'+parent+' td:nth-child('+i+')').removeClass('hidden');
				}
			} else {
				$(this).addClass('col_collapsed');
				$(this).removeClass('col_expanded');
				$(this).children('small').html('+');
				for (i=ind+2;i<=ind+num_cols;i++){
					$('#'+parent+' th:nth-child('+i+')').addClass('hidden');
					$('#'+parent+' td:nth-child('+i+')').addClass('hidden');
				}
			}
		});
		
		return this;
	};
	
	/**
	 * Popup the data getting called via Ajax
	 */
	$.fn.popUpData = function() {
		
		//Add the popup div into the body
		var popup_div = $('<div></div>',{
			id:'popup',
			html:'<div class="pop_arrow"></div><div class="pop_arrow_s"></div><div class="pop_data">Loading...</div>'
		});
		popup_div.hide();
		$('body').append(popup_div);
		
		//Remove the popup if value is 0
		this.find('.popup').each(function(index,el){
			if ($(el).text=="" || $(el).text=="0"){
				$(el).removeClass('popup');
			}
		});
		
		this.on('click','.popup',function(e){
			e.stopPropagation();
			var info = $(this).attr('data-url');
			var position = $(this).position();
			var height = $(this).height();			
			var width = ($(this).width()-$('#popup').width())/2;
			$('#popup').show().css('left',(position.left+width)+'px').css('top',(position.top+height)+'px');
			$('#popup .pop_data').load(info);
			$(document).on('click',function(){
				$('#popup').hide();
			});
			
		});
		
		return this;
	}
});