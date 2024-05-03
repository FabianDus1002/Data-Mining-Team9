var fromSelect = false;
var localData = {};
var observer;
var wasOpen = false;

(function( $ ) {
	$.widget( "ui.combobox", {
	    options: {
	        max: 9999,
	        minLength: 1,
	        position: { my: "left top",at:"left bottom"},
	        // 2019-01-18 - hwMan - neuer Parameter bootstrapRequired
	        // gibt an ob um den Wrapper noch eine Bootstrap Input-Group gesetzt werden soll mit einen * zur Anzeige
	        // ob das Feld verpflichtend ist
	        bootstrapRequired: false,
	        // 2019-01-18 - hwMan - neuer Parameter isAutoWidth, 
			// gibt an ob die Breite der Combobox berechnet wird (so wie früher) oder nicht extra gesetzt (automatisch) wird
	        isAutoWidth: false,
	        // 2019-03-11 - DeFu - neuer Parameter isPreventClassCustomSelect
	        // gibt an ob die class Custom-select zu der Combobox hinzugefügt wird
	        isPreventClassCustomSelect: false,
			// gibt an ob man Bootstraü 5 verwendet (und somit der custom-select zu form-select wird)
			isUseBootstrap5: false,
			additionalClass: undefined
	    },
		_create: function() {
			var org_onchange = this.element.closest("select").prop("onchange");
			if(this.element.find('option').size() > this.options.max && (typeof ignoreMaxComboValues == 'undefined' || !ignoreMaxComboValues))
				return;
			var self = this,
				select = this.element.hide(),
				selected = select.find( ":selected" ),
				value = selected.val() ? selected.text() : "";
			var input = this.input = $( "<input>" )
				.val( value )
				.autocomplete({
					delay: 0,
					disabled: $(select).is(':disabled'),
					autoFill: true,
					autoFocus: false,
			        position: { my: self.options.position.my, at: self.options.position.at, collision: "fit"},
					minLength: self.options.minLength,
					source: function( request, response ) {
						var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
						response( select.find( "option" ).map(function() {
							var text = ($( this ).html().indexOf('...') > 0 && $( this ).attr('title')) ? $( this ).attr('title') : $( this ).html();
							//gsch html escaped value for display
							var html = ($( this ).html().indexOf('...') > 0 && $( this ).attr('title')) ? $( this ).attr('title') : $( this ).text();
							if ( !request.term || request.term.length < self.options.minLength || matcher.test(text) )
								return {
									label: request.term.length > 2 ? text.replace(
										new RegExp(
											"(?![^&;]+;)(?!<[^<>]*)(" +
											$.ui.autocomplete.escapeRegex(request.term) +
											")(?![^<>]*>)(?![^&;]+;)", "gi"
										), "<b>$1</b>" ) : text,
									value: html,
									option: this,
		                            category: $(this).closest("optgroup").attr("label")
								};
						}) );
					},
					select: function( event, ui ) {
						ui.item.option.selected = true;
						self._trigger( "selected", event, {
							item: ui.item.option
						});
						if(ui.item.label != $(this).attr('tempval')){
							$(this).attr('tempval','');
							fromSelect=true;
							if($(ui.item.option.parentElement).change)
								$(ui.item.option.parentElement).change();
							else if(ui.item.change)
								ui.item.change();
							else if(org_onchange)
								org_onchange();
						} else {
							$(this).attr('tempval','');
						}
					},
					change: function( event, ui ) {
						if ( !ui.item ) {
							var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
								valid = false;
							select.find( "option" ).each(function() {
								if ( $( this ).html().match( matcher ) ) {
									this.selected = valid = true;
									return false;
								}
							});
							if ( !valid && !$(this).attr('tempval')) {
								// remove invalid value, as it didn't match anything
								$( this ).val( "" );
								select.val( "" );
//								if($(ui.item.option.parentElement).change)
//									$(ui.item.option.parentElement).change();
//								else if(ui.item.change)
//									ui.item.change();
//								else 
								if(org_onchange)
									org_onchange();
								return false;
							}
						}else{
							if(ui.item && ui.item.change && !$(this).attr('tempval') && !fromSelect)
								ui.item.change();
							else if(org_onchange && !$(this).attr('tempval') && !fromSelect)
								org_onchange();
						}
						fromSelect=false;
					},
					open: function(event, ui) {
						try{
						    var autocomplete = $(".ui-autocomplete:visible", top.document);
						    if(autocomplete.offset() != null 
						    	&& $('#customHeaderMobilityOnlineWrapper',top.document).size() > 0
						    	&& $('#mm-0').size() == 0)
						    {
							    var oldTop = autocomplete.offset().top;
							    var newTop = oldTop + $('#customHeaderMobilityOnlineWrapper',top.document).height();
		
							    autocomplete.css("top", newTop+'px').css("z-index", parseInt(autocomplete.css("z-index")) +10);
						    }
						}catch(ex){}
					},
					close: function(event){
						if($(this).attr('tempval') && !$(this).val()){
							$(this).val($(this).attr('tempval'));
							event.preventDefault();
						}
						if($(this).attr('value') && $(this).val() == '...'){
							$(this).val($(this).attr('value'));
							event.preventDefault();
						}
						$(this).attr('tempval','');
					}
				}).focus(function() {
					$(this).autocomplete("option","minLength", 0);
				    $(this).autocomplete("search", "");
				    if(!input.attr('tempval') && input.val()){
						input.attr('tempval',input.val());
						input.val('');
				    }
				    $("ul.ui-autocomplete").zIndex(parseInt($("ul.ui-autocomplete").zIndex()) +10);
				})
				.addClass( "ui-widget ui-widget-content ui-corner-left" );
				input.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
				return $( "<li></li>" )
					.data( "ui-autocomplete-item", item )
					.append( "<a>" + item.label + "</a>" )
					.appendTo( ul );
			};
			input.data("ui-autocomplete")._renderMenu = function(ul, items) {
                var self = this,
                    currentCategory = "";
                $.each(items, function(index, item) {
                    if (item.category != currentCategory) {
                        if (item.category) {
                            ul.append("<li class='ui-autocomplete-category'><b>" + item.category + "</b></li>");
                        }
                        currentCategory = item.category;
                    }
                    self._renderItem(ul, item);
                });
            };
			this.element.change(function(){
				$(this).next('div.comboWrapper').find('input.ui-autocomplete-input').val($(this).find('option:selected').text());
			});
			if(observer === undefined){
				observer = new MutationObserver(function( mutations ) {
					mutations.forEach(function( mutation ) {
						if( mutation.addedNodes.length > 0 && $(mutation.target).next('div.comboWrapper').size() > 0) {
							$(mutation.target).next('div.comboWrapper').find('input.ui-autocomplete-input').val($(mutation.target).find('option:selected').text());
						}
					});    
				});
			}
			observer.observe(this.element[0], {childList: true});
			//zerst�rt alle browser da es rekursion verursacht
//			this.element.bind("DOMSubtreeModified",function(){
//				if($(this).next('div.comboWrapper').size() > 0)
//					$(this).next('div.comboWrapper').find('input.ui-autocomplete-input').val($(this).find('option:selected').html());
//			});
			var button = this.button = $( "<button type='button' " + ($(select).attr("aria-label") ? "aria-label='"+$(select).attr("aria-label")+"' " : "") + ">&nbsp;</button>" )
				.attr( "tabIndex", -1 )
				.button({
					icons: {
						primary: "ui-icon-triangle-1-s"
					},
					text: false
				})
				.removeClass( "ui-corner-all" )
				.addClass( "ui-corner-right ui-button-icon" )
				.on( "mousedown", function() {
					wasOpen = input.autocomplete( "widget" ).is( ":visible" );
				})
				.click(function() {
					if ( wasOpen || input.autocomplete( "widget" ).is( ":visible" ) ) {
						input.autocomplete( "close" );
						return;
					}
					$( this ).blur();
					input.focus();
					input.autocomplete("option","minLength", 0);
					input.autocomplete( "search", "" );
				});
			
			if(button.children().size() == 0)
				button.html('<span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\" style=\"float: right;\"></span>')
					  .attr('style', 'padding: 0px !important;');
			
			var classToAdd = "comboWrapper";
		
			if(!this.options.isPreventClassCustomSelect) 
			{
				if(this.options.isUseBootstrap5)
				{
					classToAdd += " form-select";
				}
				else
				{
					classToAdd += " custom-select";
				}
			}
			if(this.options.additionalClass != undefined)
		 	{			
				classToAdd += " " + this.options.additionalClass;
			}
			
			var wrapper = this.wrapper = $('<div style=\"display: inline-block\"></div>').addClass(classToAdd);
			$(input).addClass($(select).attr('class'));//.css('width',($(select).width()-20)+'px');
			
			// 2018-08-29 - hwMan - Für disabled selects den Titel der ausgewählten Option auf das div schreiben
			if($(select).is(':disabled')) {
				$(wrapper).attr('title',$(select).find('option:selected').attr('title'));
			}
			
			$(input).attr('placeholder',$(select).find('option:first').text());
			$(button).addClass($(select).attr('class'));
			if($(select).is(':disabled')){
				$(button).button( "option", "disabled", true );
				$(input).attr('disabled','true');
//				gsch keine ahnung warum das war, hat aber ein Problem verursacht
//				if(!$(select).is(':first-child')){
					$(select).css('width','auto');
					// 2019-01-18 - hwMan - siehe Kommentar oben bei der Option
					if(!this.options.isAutoWidth)
					{
						$(wrapper).css('width',($(select).width()+11)+'px');
					}
//				}
			}else if($(select).closest('.dialog').size() < 1 && $(select).width() > 10){
				if(!this.options.isAutoWidth)
				{
					$(wrapper).css('width',($(select).width()+11)+'px');
				}	
			}
			
			if($(select).attr("aria-label"))
			{
				$(input).attr("aria-label", $(select).attr("aria-label"));
			}
			
			// 2019-01-18 - hwMan - siehe Kommentar oben bei der Option
			if(this.options.bootstrapRequired)
			{
//				var x = 
//					"<div class=\"input-group\">" +
//					"	<div class=\"input-group-append\">" +
//					"		<span class=\"input-group-text\">*</span>" +
//					"	</div>" +
//					"</div>";
				
				$(select).after($($("<div class=\"input-group\">" + $($(wrapper).append(input).append(button)).prop("outerHTML") + "</div>")).append("<div class=\"input-group-append\"><span class=\"input-group-text\">*</span></div>"));
			}
			else
			{
				$(select).after($(wrapper).append(input).append(button));
			}			
		},
			destroy: function() {
				try
				{
					this.input.remove();
					this.button.remove();
					this.wrapper.remove();
					this.element.show();
					$.Widget.prototype.destroy.call( this );
				}
				catch(err){}
		}
	});
	
	$.widget( "ui.sopFileInput", {
		_create: function() {
			var self = this;
			var	fileInput = this.element;
			var input = $("<input>").addClass( "ui-widget ui-widget-content ui-corner-left fileUploadInput" );
			var button = this.button = $( "<button type='button'>&nbsp;</button>" )
				.attr( "tabIndex", -1 )
				.button({
					icons: {
						primary: "ui-icon-folder-open"
					},
					text: false
				})
				.removeClass( "ui-corner-all" )
				.addClass( "ui-corner-right ui-button-icon fileUploadButton" );
			if($(fileInput).is(':disabled')){
				$(button).button( "option", "disabled", true );
				$(input).attr('disabled','true');
			}
			$(input).addClass($(fileInput).attr('class'));//.css('width',($(fileInput).width()-25)+'px')
			//$(input).attr('placeholder',$(select).find('option:first-child').html());
			if($(this.element).attr("placeholder") != null)
			{
				$(input).val($(this.element).attr("placeholder"));
			}
			$(button).addClass($(fileInput).attr('class'));
			$(fileInput)
			.wrap($('<div style=\"display: inline-block;\" class=\"fileUploadWrapper comboWrapper\"></div>'))//width: '+($(fileInput).width())+'px
			.after(button).after(input)
			.addClass( "fileUploadOriginal" )
			.change(function(){$(this).next('input.fileUploadInput').val(($(this)[0].files && $(this)[0].files[0]) ? $(this)[0].files[0].name : $(this)[0].value);});
			if($(fileInput).attr("onfocus") && $(fileInput).attr("onfocus").indexOf("'") > 0){
				try {
					var dispHelp = $(fileInput).attr("onfocus").split("'")[1];
					$(input).attr("placeholder", dispHelp);
				}catch(err) {}
			}
		},
			destroy: function() {
			this.input.remove();
			this.button.remove();
			this.element.show();
			$.Widget.prototype.destroy.call( this );
		}
	});
	
	$.widget( "ui.autoTag", {
	    options: {
	        source: []
	    },
		_create: function() {
			var self = this;
			var	input = this.element;
			$(input)
			// don't navigate away from the field on tab when selecting an item
			.on( "keydown", function( event ) {
				if ( event.keyCode === $.ui.keyCode.TAB &&
						$( this ).autocomplete( "instance" ).menu.active ) {
					event.preventDefault();
				}
			})
			.autocomplete({
				minLength: 0,
				source: function( request, response ) {
					// delegate back to autocomplete, but extract the last term
					response( $.ui.autocomplete.filter(
							self.options.source, extractLast( request.term ) ) );
				},
				focus: function() {
					// prevent value inserted on focus
					return false;
				},
				select: function( event, ui ) {
					var terms = split( this.value );
					// remove the current input
					terms.pop();
					// add the selected item
					terms.push( ui.item.value );
					// add placeholder to get the comma-and-space at the end
					terms.push( "" );
					this.value = terms.join( ", " );
					return false;
				}
			})
			.on( "focusout", function(event){
				$(this).val($(this).val().substring(0, $(this).val().length - 2))
			})
			.on( "focusin", function(event){
				if($(this).val())
					$(this).val($(this).val()+', ');
			});	
		},
		destroy: function() {
		}
	});
})( jQuery );
function split( val ) {
	return val.split( /,\s*/ );
}
function extractLast( term ) {
	return split( term ).pop();
}
