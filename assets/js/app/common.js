define(['jquery','cookie','require','idle-timer'],function($,Cookie,require){

	$(document).ready(function(){
	
		var start = new Date().getTime();
		
		//Set the idletimer for timeout
		$(document).idleTimer(30*60*1000);		
		$(document).on("idle.idleTimer",function(event, elem, obj){
			window.location.href = "/login/logout";
		});
		
		//Adjust the document height
		if ($(document).height()-$('#footer').position().top>33){
			var inc = $(document).height()-34-$('#footer').position().top;
			$('#container').css('min-height',(525+inc)+'px');
			if ($('.left-bar').length>0){
				$('.left-bar').height($('#container').height()-5);
			}
		}
		
		/*--Menu Functions-------------------------*/
		//{ #MenuRegion
		if ($('#top-menu').length>0){
		
		//If the menu cookie is set show the required page
		var page = Cookie.get('top-menu');
		if (location.hash != '' && $(location.hash).length>0){
			var page = location.hash.replace('#','');
			$('.'+page).removeClass('hidden');
			$('#'+page).addClass('active');
			location.hash='';
			Cookie.set('top-menu',page);
		} else if (typeof page !== "undefined" && $('#'+page).length>0){
			$('.'+page).removeClass('hidden');
			$('#'+page).addClass('active');
			if ($('#'+page).attr('data-hide')){
				$('.'+$('#'+page).attr('data-hide')).addClass('hidden');
			}
		} else { //Show the first tab
			$('#top-menu ul li').first().addClass('active');
			$('.'+$('#top-menu ul li').first().attr('id')).removeClass('hidden');
		}
		
		//Click Event for Top tabs
		$('#top-menu ul').on('click','li',function(){
			$('.pages').addClass('hidden');
			$('.'+$(this).attr('id')).removeClass('hidden');
			$('#top-menu ul li.active').removeClass('active');
			$(this).addClass('active');
			if ($(this).attr('data-hide')){
				$('.'+$(this).attr('data-hide')).addClass('hidden');
			} else {
				$('.section').removeClass('hidden');
			}
			Cookie.set('top-menu',$(this).attr('id'));
		});
		
		} // End Top Menu Check
		
		if ($('#switch-role').length>0){		
			$('#switch-role').on('click','a',function(e){
				e.preventDefault();
				$.ajax({
					url:'/Settings/switch_role/'+$(this).attr("data-val")
				}).success(function(){
					location.reload();
				}).fail(function(JQXHR){
					//alert(JQXHR.responsText);
				});
			});
		}
		//}
		/*--End Menu Functions---------------------*/
		
		/*--X-Editable Functions-------------------*/
		//{ #XEditableRegion
		if ($('.ed_input').length>0 || $('.has_edit').length>0){
			
		require(['jquery-editable'],function(){
		
			$.fn.editable.defaults.mode = 'inline';
			$.fn.editable.defaults.showbuttons = false;
			
			$('.ed_input').each(function(index){
				$(this).data('pk',$(this).attr('data-pk'));
			});
			
			$(document).editable({
				selector	: '.ed_input',
				url			: '/XEdit/update',
				highlight	: '#FFCC00',
				inputclass	: 'ed_input_box',
				clear		: false,
				onblur		: 'submit',
				params		: {'csrf_tok':Cookie.get('csrf_cookie')},
				validate	: function (v){
					if($(this).hasClass('number') && (isNaN(v) || v=="")){
						return 'This needs to be a number';
					}
					//Precheck function
					var func = $(this).attr('data-valid');
					if (func!="" && typeof window[func] == "function"){
						var ret = window[func](v,$(this));
						return ret;
					}
				},
				success		: function (response,newVal){
					var func = $(this).attr('data-callback');
					if (func!="" && typeof window[func] == "function"){
						window[func](newVal,$(this));
					}
					$(this).attr('data-value',newVal);
					//If the change is made in a datatable, then update the internal cell cache					
					var that=$(this);
					if (that.parents('table').length>0 && that.parents('table').hasClass('dataTable')){
						setTimeout(function(){
							that.parents('table').DataTable().cell($("[data-name='"+that.attr('data-name')+"'][data-pk='"+that.attr('data-pk')+"']").parent()).data($("[data-name='"+that.attr('data-name')+"'][data-pk='"+that.attr('data-pk')+"']").parent().html());
						},500);
					}
				}
			});
			
		});
			
		} // End X-Editable Check
		//}
		/*--End X-Editable Functions---------------*/
		
		/*--Table Functions-------------------*/
		//{ #TableRegion
		
		//Check if the .tab table exists and add in the tables functions
		if ($('.tab').length>0){
			
			//Add the totals to the tables that required it
			if ($('.tab.has_total').length>0){
				$('.tab.has_total').each(function(index,table){
					var start = $(table).attr('data-tot-start') || 2;
					var type = $(table).attr('data-tot-type') || 'currency';
					if (!$(table).tFoot){  //Create the footer if it does not exist
						var footer=table.createTFoot();
						var row=footer.insertRow(0);
						for (i=0;i<=table.rows[0].cells.length-1;i++){row.insertCell(i);}
						row.cells[0].innerText = 'Total';
						row.cells[0].className = 'l';
						row.className='tot_line';
						
						//Calculate the totals and add them in
						for (i=start;i<=table.rows[0].cells.length-1;i++){
							if (!$(table.rows[0].cells[i]).hasClass("skiptot")){	//Column
								var tot=0;
								for (j=1;j<=table.rows.length-2;j++){
									if(!$(table.rows[j]).hasClass("skiptot")){  //Row`
										if (!$(table.rows[j].cells[i]).hasClass("skiptot")){ //Cell
											tot=tot+Number($(table.rows[j].cells[i]).text().replace(",","").replace("$",""));
										}
									}
								}
								if (type=="currency"){
									$(table.rows[table.rows.length-1].cells[i]).text('$'+tot.toFixed(2));
								} else {
									$(table.rows[table.rows.length-1].cells[i]).text(tot);
									$(table.rows[table.rows.length-1].cells[i]).addClass('c');
								}	
							}
						}
					}
				});
			}
			
			//Add the table tools
			require(['jquery.tabtools'],function(){
				if ($('.tab .col_expander').length>0) $('.tab').colExpander(); 
				if ($('.tab .clickrow').length>0) $('.tab').drillDown(); 
				if ($('.tab.has_popup').length>0) $('.tab').popUpData();				
				$('.tab').addClass('disp');
			});
			
		}
		
		
		/**
		 * Add in the tables to excel links
		 */
		if ($('.tab2xl').length>0){
			$('.tab2xl').on('click',function(){
				
				$(this).children('span').removeClass('excel').addClass('icon-wait').addClass('animate-spin');
				var that = $(this);
				
				var el    = $('#'+$(this).attr('data-table')),
					fn 	  = $(this).attr('data-fn'),
					table = new Array(),
					cnt	  = 0;
				
				$.each(el.find('thead tr,tbody tr'),function(index,row){
					if(!$(row).hasClass('skip_xl') && $(row).is(':visible')){
						var col = new Array();
						$.each($(row).children(),function(index,cell){
							if ($(cell).attr('class')==null){var c=0;} else {var c=$(cell).attr('class');}
							if ($(cell).css('padding-left')=='25px') {c =c+' l30'}
							var cont = $(cell).text().replace(",","").replace("$","").replace("+","").replace("&","n").trim();
							if (cont==""){cont="-"}
							if (isNaN(cont)){var d = cont} else {var d = Number(cont)}
							col.push(new Array(c,d));
						});
						table.push(col);
					}
				});
				
				$.each(el.find('tfoot tr'),function(index,row){
					if(!$(row).hasClass('skip_xl') && $(row).is(':visible')){
						var col = new Array();
						$.each($(row).children(),function(index,cell){
							if ($(cell).attr('class')==null){var c=0;} else {var c=$(cell).attr('class');}
							var cont = $(cell).text().replace(",","").replace("$","").replace("+","").replace("&","n").trim();
							if (cont==""){cont="-"}
							if (isNaN(cont)){var d = cont} else {var d = Number(cont)}
							col.push(new Array(c,d));
						});
						table.push(col);
					}
				});
				
				
				//Create a form and submit the data.
				var form=$('<form></form>',{
					action:'/reports/tab2excel',
					method:'post',
					id:'xls_form',
					style:'display:none',
					html:'<input type="hidden" name="csrf_tok" value="'+Cookie.get('csrf_cookie')+'"><textarea name="v">'+JSON.stringify(table)+'</textarea><input name="fn" value="'+fn+'" /><input type="submit" value="Go" />'
				});
				$('body').append(form);
				form.submit();
				form.remove();
				
				var attempts = 30;
				downloadTimer = window.setInterval( function() {
					var token = Cookie.get('downloadToken');
					if((token == 'downloadToken') || (attempts == 0) ) {
						window.clearInterval(downloadTimer);
						Cookie.remove("downloadToken");
						that.children('span').addClass('excel').removeClass('icon-wait').removeClass('animate-spin');
					}
					attempts--;
				}, 1000 );
			});
		}
		
		//}
		/*--End Table Functions---------------*/
		
		var end = new Date().getTime();
		var time = end - start;
		//alert('Execution time: ' + time);
		
	});
});