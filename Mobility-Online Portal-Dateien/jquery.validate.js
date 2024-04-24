/*
 * This functions checks where an entered date is valid or not.
 * It also works for leap year feb 29ths.
 * @year: The Year entered in a date
 * @month: The Month entered in a date
 * @day: The Day entered in a date
 */
function isValidDate(year, month, day){
    var date = new Date(year, (month - 1), day);
    var DateYear = date.getFullYear();
    var DateMonth = date.getMonth();
    var DateDay = date.getDate();
    if (DateYear == year && DateMonth == (month - 1) && DateDay == day) 
        return true;
    else 
        return false;
}
/*
 * This function checks if there is at-least one element checked in a group of check-boxes or radio buttons.
 * @id: The ID of the check-box or radio-button group
 */
function isChecked(id){
    var ReturnVal = false;
    var name = jQuery("#" + id).attr('name');
    var elems = jQuery('[name=\"'+name+'\"][type="radio"], [name=\"'+name+'\"][type="checkbox"]');
    elems.each(function(){
        if (jQuery(this).is(":checked")) 
            ReturnVal = true;
    });
    return ReturnVal;
}

/*
 * Base Function
 */
var id = 0;
var ValidationErrors = new Array();
var forcedElementsToValidate = new Array();
var validateFieldFunction = null;

(function(jQuery){
	ValidationErrors = new Array();
	//this can contain multiple elements if multiple forms are present
	//hiddens excluden
	var newThis = jQuery(this).filter(':not([type="hidden"])')[0];
    jQuery.fn.validate = function(options){
        options = jQuery.extend({
            expression: "return true;",
            message: "",
            error_class: "ValidationErrors",
            error_field_class: "ErrorField",
            live: true,
            withoutForm: false
        }, options);
		var newThis = jQuery(this).filter(':not([type="hidden"])')[0];
		var SelfID = jQuery(newThis).attr("id");
		if(SelfID != undefined) {
			SelfID = SelfID.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g,'\\$1');
		}
        var unix_time = new Date();
        unix_time = parseInt(unix_time.getTime() / 1000);
        if (!jQuery(newThis).parents('form:first').attr("id")) {
            jQuery(newThis).parents('form:first').attr("id", "Form_" + unix_time);
        }
        var FormID = jQuery(newThis).parents('form:first').attr("id");
        ValidationErrors[FormID] = new Array();
        if (options['live']) {
            if (jQuery(newThis).find('input').length > 0) {
                jQuery(newThis).find('input').bind('blur', function(){
                    if (validate_field("#" + SelfID, options)) {
                        if (options.callback_success) 
                            options.callback_success(newThis);
                    }
                    else {
                        if (options.callback_failure) 
                            options.callback_failure(newThis);
                    }
                });
                jQuery(newThis).find('input').bind('focus keypress click onchange', function(){
                	jQuery('#errImg'+SelfID).remove();
                	jQuery('[id^=error_'+SelfID.replace(/\d*$/g,'')+']').remove();
                    jQuery('#' + SelfID).removeClass(options['error_field_class']);
                    jQuery('#' + SelfID).qtip('destroy', true);
                    jQuery('#' + SelfID).attr('errortitle','');
                });
            }
            else {
            	// neue combo boxen // und listboxen
            	if(jQuery(newThis).is('select:not(:visible)')){
            		var select = jQuery(newThis);
            		var input = select.next().find('input').length > 0 ? select.next().find('input, [type="button"]') : select.next().add(select.next().children());
	                input.bind('blur forceRevalidate', function(){
	                	validate_field(select);
	                });
	                input.bind('keypress click select onchange forceRevalidate', function(){
	                    select.next('.' + options['error_class']).fadeOut("fast", function(){
	                        jQuery(newThis).remove();
	                    });
	                    jQuery('#error_'+SelfID).remove();
	                    select.removeClass(options['error_field_class']);
	                    input.removeClass(options['error_field_class']);
	                    input.qtip('destroy', true);
	                    input.attr('errortitle','');
	                });
            	}else{
            		//gsch img elemente nicht validieren ...
            		if(jQuery(newThis).is('img')){
            			return;
            		}
            		
	                jQuery(newThis).bind('blur', function(){
	                	if(!jQuery(newThis).datepicker( "widget" ).is(":visible"))
	                		validate_field(newThis);
	                	else{
	                		setTimeout(function(){
	                			validate_field(newThis);
	                		},50);
	                	}
	                });
	                //gsch bei file inputs ist das blur event bevor das file ausgewaehlt wurde
	                if(jQuery(newThis).is(':file')){
		                jQuery(newThis).bind('change', function(){
		                	validate_field(newThis);
		                });
	                }
	                jQuery(newThis).bind('keypress click select onchange change forceRevalidate', function(event){
	                	if(event.type=='forceRevalidate')
	                		validate_field(newThis);
	                	if(event.type=='click' || event.type=='select' || ValidationErrors[FormID].join("|").search($(newThis).attr('id')) == -1){
	                		jQuery(newThis).next('.' + options['error_class']).fadeOut("fast", function(){
	                    	jQuery(newThis).remove();
	                    	});
	                    	jQuery('[id^=error_'+SelfID.replace(/\d*$/g,'')+']').remove();
	                    	$('[name="'+newThis.name+'"]').removeClass(options['error_field_class']);
	                		if($('[name="'+newThis.name+'"]').hasClass('fileUploadOriginal'))
	                		$('[name="'+newThis.name+'"]').parent().children().removeClass(options['error_field_class']);
	                    	$('[name="'+newThis.name+'"]').qtip('destroy', true);
	                    	$('[name="'+newThis.name+'"]').attr('errortitle','');
	                	}
	                });
            	}
            }
        }
        if(!options['withoutForm']){
	        jQuery(newThis).parents("form").submit(function(){
	            if (!SelfID || validate_field('#' + SelfID)) 
	                return true;
	            else 
	                return false;
	        });
        }
////////// gsch 2015-03-09 gefixed, dass tooltips wieder angezeigt werden,        
        jQuery('img.online_help, i.online_help').each(function() {
        	/*
        	 * Neue QTips setzen für Hilfen
        	 */
        	jQuery(this).qtip({
        	    content: {
        	        text: function(api) {
        	            return jQuery(this).attr('title');
        	        },
        			position: {
        				viewport: $('body')
        			},
        	    },
        	     style: {
        	    	 classes: 'qtip-help'
        	     }
        	});
        });
        
        jQuery('.tooltip_display_class').each(function() {
        	/*
        	 * Neue QTips setzen für Hilfen
        	 */
        	jQuery(this).tooltip();
        });    
        function validate_field(id){
        	id = jQuery(id).filter(':not([type="hidden"])')[0];
            var self = jQuery(id).attr("id");
            var expression = 'function Validate(){' + options['expression'].replace(/VAL/g, 'jQuery(\'[id="' + self + '"]\').val()') + '} Validate()';
            var validation_state = eval(expression);
            
            // 2018-04-06 - hwMan - Schauen ob ich im MassUpdateServlet bin
            var splitted = self.split("_");
            if(splitted.length > 0) // ID Passt schonmal in das Schema von MassUpdate
        	{
	            var realId = splitted[splitted.length - 1];
	            if($("#auswahl_id_" + realId).size() > 0) // Es gibt ein Element wie das  zum auswählen aus dem MassUpdate
	            {
	            	if(!$("#auswahl_id_" + realId).is(":checked")) // Eintrag ist nicht ausgewählt, dann brauchen wir auch nix validieren
	            	{
	            		validation_state = true;
	            	}
	            }
        	}
            
            // Prüfen auf display: none
            var isDisplay = true;
            //gsch versteckte und neu auch disabled fields ignoriern 
            // 2018-04-19 - hwMan - Neues Array forcedElementsToValidate dort können Ids angegeben werden die trotz disabled Attribut validiert werden
            if( $(id).not($('.comboWrapper').siblings()).not($('.multiselectWrapper').children()).is(':not(:visible)') || $(id).parent().is(':not(:visible)') 
            		|| ($(id).is(':disabled') && (forcedElementsToValidate.length < 0 || forcedElementsToValidate.indexOf(self) == -1)))
            	// gsch ausser es is in einem zugeklapptem submenu
            	if($(id).closest('table.closed').size() == 0)
            		isDisplay = false;
            if (!validation_state && !(jQuery(id)[0].form && jQuery(id)[0].form.readNew && jQuery(id)[0].form.readNew.value == '1') && isDisplay) {
                if (jQuery(id).next('.' + options['error_class']).length == 0) {
                	jQuery('#error_'+self).remove();
                	var ele = jQuery(id);
                	if(ele.is('select') && !ele.is(":visible") ){// neue listbox styles
                		ele = ele.next('.ui-multiselect');
                		if(ele.length < 1)
                			ele = jQuery(id).next().find('input');
                	}
//                	ele.addClass('ErrorField');
                	if(ele.parent().hasClass("comboWrapper"))
            		{
                		ele.parent().addClass(options['error_field_class']);
            		}
                	ele.addClass(options['error_field_class']);

                	if(!ele.attr('title') && !ele.data('qtip')){
                		ele.attr('errortitle',options['message']);
                		ele.qtip({
                			content: {text: function(api) {return jQuery(this).attr('errortitle');}},
                			style: {classes: 'qtip-custom'},
                			position: {viewport: jQuery('body')}
                		});
                	}
          
                	var phi = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAIAAAC0D9CtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9wBEQ4EG5h6TlwAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAXdJREFUOE9j+M8giQVNmvMfCIAkmjgYUaiHV/V/QOL/qfP/7z38/807kB4guefw/wmz/nvF/OdSgquE6XEO/X/1Jkjdv3//f//+//cviA0kf8HY56+A1CD0+Mb9//oNpHrz7v/ukf+FNBFu41H5b+nzf/4KkCxQTVAyWI+Y7v+HT/7//fe/beJ/FhmISej+YZL+39gLsvDZi//SRgz/M8pB0nfu/+dVgarA1ANEQP9cugYSLG5k+L9yI4g1bzlCGogw9QBR/yyQ4IYdDP937AexOiajSGPVk1cDEtx1kOH/2q0g1pxlKNJ47Nm0k+F/UQOIdecBKH7g0ph64P4paWL4L6H//+lzUFBOnvufVRa7HmYZaLi9fvtf1hgcP8DoB4Y9EOw59N8vHiV+gGxgjG3YDo2f4BSgelg6sA/8f+4SSB1aOgCygSJAcOXGf9dwiGKk9AZ0MdCSaQv+HziGSG9ANlAE6BBggoCpRNKDjND8g4pI18MgCQA1qQnz4Uis2gAAAABJRU5ErkJggg==)';
                	var errorImage = jQuery('<div id="error_'+self+'" class="errorImage"></div>')
                		.css('background-image',phi).attr('errortitle',options['message']);
                	if(!jQuery(id).attr('placeholder'))
                		jQuery(id).attr('placeholder',options['message']);
                	//fileinput allen elementen klasse verpassen
                	if(jQuery(id).hasClass('fileUploadOriginal'))
                		jQuery(id).parent().children().addClass(options['error_field_class']);
                	else
            		{
                		var elementName = jQuery(id).attr("name");
                		
                		if(elementName != undefined)
                		{
                			// Validierungsklassen für alle Inputs mit dem gleichen Namen
                			jQuery("[name='" + elementName + "']").addClass(options['error_field_class']);
                		}
                		else
            			{
                			jQuery(id).addClass(options['error_field_class']);
            			}
            		}
                	if(jQuery(id).is('input[type="text"], input[type="date"], input[type="password"],input[type="email"],textarea, select:visible')){
                		jQuery(id).after(errorImage);
                	}else if(jQuery(id).next().is('.comboWrapper')){
                		jQuery(id).next().after(errorImage);
                	}else{
                		jQuery(id).parent().append(errorImage);
                	}
                	
                	jQuery('#error_'+self).qtip({
            			content: { text: function(api) { return jQuery(this).attr('errortitle'); }},
            			style: { classes: 'qtip-custom' },
            			position: { viewport: jQuery(window) }
            		})
                }
                if (ValidationErrors[FormID].join("|").search($(id).attr('id')+"|"+options['message'].hashCode()) == -1) 
                    ValidationErrors[FormID].push($(id).attr('id')+"|"+options['message'].hashCode());
                return false;
            }
            else {
                for (var i = 0; i < ValidationErrors[FormID].length; i++) {
                    if (ValidationErrors[FormID][i] == $(id).attr('id')+"|"+options['message'].hashCode()) 
                        ValidationErrors[FormID].splice(i, 1);
                }
                var ele = jQuery(id);
                
                var elementName = ele.attr("name");
                
        		if(elementName != undefined)
        		{
        			if(ele.next().hasClass("comboWrapper"))
            		{
                		ele.next().removeClass(options['error_field_class']).addClass(options['valid_field_class']);
            		}
        			
        			// Validierungsklassen für alle Inputs mit dem gleichen Namen
        			jQuery("[name='" + elementName + "']").removeClass(options['error_field_class']).addClass(options['valid_field_class']);
        		}
        		else
    			{
        			ele.removeClass(options['error_field_class']).addClass(options['valid_field_class']);
    			}
                
                return true;
            }
        }
        validateFieldFunction = validate_field;
    };
    
    jQuery.fn.validated = function(callback){
        jQuery(this).each(function(){
            if (this.tagName == "FORM") {
                jQuery(this).submit(function(){
                	setTimeout(function() {
	                	if (!ValidationErrors[jQuery(form).attr("id")] || ValidationErrors[jQuery(form).attr("id")].length == 0){ 
	                		if(!preventValidationSubmission) callback();
	                	}else{
	                		noresub = false;
	                		var ele = jQuery('#'+ValidationErrors[jQuery(form).attr("id")][0].split('|')[0]);
	                		if(ele.closest('table.closed').size() > 0)
	                			ele.closest('table.closed').find('b.closed').click();
	                		if(ele.is(':visible'))
	                			ele.focus();
	                		else if(ele.next('input, button').size() > 0)
	                			ele.next('input, button').focus().click();
	                		else
	                			ele.next().find('input, button').first().focus().click();
	                		ele.triggerHandler( "focus" );
	                	}
                	}, 500);
                	//check if resubmission, wenn submitted wird wird gesperrt, bei fehler in der validierung wieder freigegeben
                	if(noresub){
                		return false;
                	}else{
                		var ret = !(typeof cancelSubmission !== 'undefined' && cancelSubmission === true);
                		noresub = ret;
						return ret;
                	}
                });
            }
        });
    };
})(jQuery);

//gsch neuer selector bei email validierungen um den inhalt zu pruefen und trimmen
jQuery.extend(
		  jQuery.expr[':'],
		  {
		    /// check that a field's value property has a particular value
		    'field-value': function (el, indx, args) {
		      var a, v = $(el).val();
		      if ( (a = args[3]) ) {
		        switch ( a.charAt(0) ) {
		          /// begins with
		          case '^':
		            return v.substring(0,a.length-1) == a.substring(1,a.length);
		          break;
		          /// ends with
		          case '$':
		            return v.substr(v.length-a.length-1,v.length) == 
		              a.substring(1,a.length);
		          break;
		          /// contains
		          case '*': return v.indexOf(a.substring(1,a.length)) != -1; break;
		          /// equals
		          case '=': return v == a.substring(1,a.length); break;
		          /// not equals
		          case '!': return v != a.substring(1,a.length); break;
		          /// equals
		          default: return v == a; break;
		        }
		      }
		      else {
		        return !!v;
		      }
		    }
		  }
		);