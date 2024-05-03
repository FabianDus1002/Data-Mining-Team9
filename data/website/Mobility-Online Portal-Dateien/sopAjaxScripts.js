var preventValidationSubmission = false;
function addQuickSubmit(clearHiddenFields, quickSubmitUrl){
	//reiter links nur navigieren wenn formvalidierung passt und als submit behandeln
	$('a.reiter[href!="#reiter"]').click(function(e){
		$('form')[0].manSubmit.value = '1';
		$('form')[0].isRedirect.value = '1';
		$('form')[0].redirectServlet.value = $(this).attr('href');
		submitForm($('form')[0]);
		$('form')[0].manSubmit.value = '';
		$('form')[0].isRedirect.value = '';
		$('form')[0].redirectServlet.value = '';
		e.preventDefault();
		return false;
	});
	
	// onsubmit funktion der form und submit handler holen damit diese vor async aufruf ausgefuehrt werden kann
	var newOnSub;
  	if($('form').attr('onsubmit')){
  		$('form').attr('onsubmit',$('form').attr('onsubmit').replace(new RegExp('(startCheckLoading\\(|deactivateAllButtonsForUpload\\(|activateDeactivateScreen\\()[^;]+;','g'),''))
  		newOnSub = $('form').prop('onsubmit');
  		$('form').removeProp('onsubmit');
  	}
  	//falls keinen submit button dann parameter dazuhaengen damit man das beim reiter wechsel abfangen kann
  	if($('form input[type="submit"').length == 0){
  		$('form').prepend('<input type="hidden" name="submitButtonFound" value="0">');
  	}
  	preventValidationSubmission = true;
  	// submit ueberlagern
  	$('form').submit(function(e) {
  		//onsub ist ueberlagerte submit funktion der inline validierung
 	  	if(typeof onsubWithoutLoading !== 'undefined' && onsubWithoutLoading)
  	  		newOnSub = onsubWithoutLoading;
 	  	if(clearHiddenFields)
 	  		$('input:hidden[name!="isRedirect"][name!="redirectServlet"][name!="manSubmit"]').attr('disabled', true);
 	  	//wenn kein redirect gesetzt f�r reiter navi dann auf jetztige seite redirecten
 	  	if(!$('[name="redirectServlet"]').val()){
 	  		$('form')[0].manSubmit.value = '1';
 	  		$('form')[0].isRedirect.value = '1';
 	  		$('form')[0].redirectServlet.value = window.location.href;
 	  	}
 	  	//action der form aendern
 	  	if(quickSubmitUrl){
 	  		quickSubmitUrl = quickSubmitUrl.replace('&quickMessage=1','') + '&quickMessage=1';
 	  		$('form').attr('action',quickSubmitUrl);
 	  	}
 	  	return newOnSub();
 	  	//wenn redirect dann normales submit sont async
// 	  	if($('[name="redirectServlet"]').val()){
// 	  		//damit die message in userPara gespeichert wird
// 	  		quickSubmitUrl = quickSubmitUrl.replace('&quickMessage=1','') + '&quickMessage=1';
// 	  		$('form').attr('action',quickSubmitUrl);
// 	  		return newOnSub();
// 	  	}else{
// 	  		//wenn kein redirect dann am servlet bleiben und async die stammdaten aktualisieren
// 	  		$('form')[0].manSubmit.value = '1';
// 	  		$('form')[0].isRedirect.value = '1';
// 	  		$('form')[0].redirectServlet.value = window.location.href;
// 	  		quickSubmitUrl = quickSubmitUrl.replace('&quickMessage=1','') + '&quickMessage=1';
// 	  		$('form').attr('action',quickSubmitUrl);
////kein ajax submit mit neuer validierung da checkform nicht passt
//// 	  		$(this).ajaxSubmit({
//// 	  			type: 'post',
//// 	  			url: quickSubmitUrl,
//// 	  			success: showResponse,
//// 	  			beforeSubmit: newOnSub
//// 	  		});
//// 	  		return false;
// 	  		return newOnSub();
// 	  	}
    });
}

function submitForm(form) {
    var button = form.ownerDocument.createElement('input');
    button.style.display = 'none';
    button.style.position = 'fixed';
    button.style.left = '0px';
    button.style.top = '0px';
    button.type = 'submit';
    form.appendChild(button).click();
    form.removeChild(button);
}
var oldImageHeight=0;
function addToggleForTablesOnFirstRow(tableSelector, openLabel, closeLabel, openAllLabel, closeAllLabel, iconCloseClass, iconOpenClass, iconColor, openSelector){
	var openCloseAllTag = '<span class="openAll">'+openAllLabel+'</span><span class="closeAll">'+closeAllLabel+'</span';
	var styleTag = '<style>'+
	  ' span.openAll, span.closeAll {margin-left: 10px; font-weight: normal !important; cursor: pointer; text-decoration: underline;}' +
	  ' td.progSubTitle i {vertical-align: middle !important; cursor: pointer;}  td.progSubTitle i::before {cursor: pointer; color: '+iconColor+'}' +
//	  ' table tr b.open:before { content: "\\25bc"; display: inline-block; margin-right: 5px; line-height: 20px;} '+
//	  ' table tr b.closed:before { content: "\\25bc"; margin-right: 5px; display: inline-block; transform: rotate(-90deg); line-height: 20px;}'+
	  ' td.progSubTitle b {border-right: none; border-top: none; border-left: none; line-height: 20px}'+
	  ' table.progInput.onlineFormHeader td.progSubTitle {border-top-left-radius: 10px; border-top-right-radius: 10px}'+
	  ' table.progInput.onlineFormHeader.closed td.progSubTitle {border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;}' +
	  ' table.progInput tr:first-child + tr td:last-child, table.progInput tr:first-child + input + tr td:last-child {border-top-right-radius: 0px}'+
	  '</style>';
	var tables = $('table'+tableSelector);
	//gsch bei manchen ist es anders?
	if($('table.bottom').size() == 1){
		tables = $('table.bottom');
	}
	var isInSettings = tables.size() == 1;
	var header = isInSettings ? tables.find('td.progSubTitle').wrapInner('<b></b>').find('b') : tables.find('tr:first b');
	oldImageHeight = $('#foto_div').outerHeight() + 42;
	header
    .addClass('open')
    .css('cursor','pointer')
    .on('click',function(){
		$(this).prev('i').remove();
        if($(this).is('.open')){
        	$(this).before('<i class="closed '+iconOpenClass+'"></i>');
        	$(this).removeClass('open').addClass('closed').attr('title',openLabel);
        	$(this).closest('table').removeClass('open').addClass('closed');
        	if($('#foto_div').size() > 0 && $(this).is(tables.find('tr:first b').first())){
        		$('#foto_div').hide()        		
        		tables.first().css('height','auto');
        	}
        }else{
        	$(this).before('<i class="open '+iconCloseClass+'"></i>');
        	$(this).removeClass('closed').addClass('open').attr('title',closeLabel);
        	$(this).closest('table').removeClass('closed').addClass('open');
        	if($('#foto_div').size() > 0 && $(this).is(tables.find('tr:first b').first())){
        		$('#foto_div').show();
        		tables.first().css('height',oldImageHeight+'px');
        	}
        }
        $(this).closest('tr').nextUntil('tr.toggleHeaderRow').not('script').toggle();
    });
	$('b.open').before('<i class="open '+iconCloseClass+'"></i>');
	$(document).on('click','i',function(){
		$(this).next('b').click();
	});
	$('td.progSubTitle.startClosed b').click();
	header.closest('tr').addClass('toggleHeaderRow');
	header.first().after(openCloseAllTag);
	$('span.openAll').click(function(){
		$('tr.toggleHeaderRow b.closed').click();
	});
	$('span.closeAll').click(function(){
		$('tr.toggleHeaderRow b.open').click();
	});
	//automatisch welche offen oder zu
	if(openSelector)
		$('tr.toggleHeaderRow b.open').not(openSelector).click();
	$(styleTag).appendTo('head'); 
	$('table.progInput.onlineFormHeader td.progSubTitle').css('background-color', $('td.progSubTitle b').css('background-color'));
}

function addTopButtons(copyOnlyButtons, onlyOnLargeForms){
	var directSelector = 
		'form > div > input[type="submit"], ' +
		'form > div > input[type="button"], ' +
		'form > div > input[type="reset"], ' +
		'form > div > table:last-child input.button,' +
		'form > input[type="submit"], ' +
		'form > input[type="button"], ' +
		'form > input[type="reset"], ' +
		'form > table:last-child input.button:not(.not_in_top)';
	var parentSelector = 
		'form > div:not(#tableheader) > table input.button:last, ' +
		'form > table input.button:last';
	
	if(onlyOnLargeForms && ( $('form').height() + 50 ) < $(window).height()) 
		return;
	
  if($('.topButtonTable').length == 0){
	if($('.table input[type="reset"], .table input[type="submit"]').length > 0){
		$("td:empty:first").closest('table').addClass('topButtonTable')
		.append(
			$('<tr></tr>').append(
				$('.table input[type="reset"], .table input[type="submit"]').parent().first().clone()
				.css("border-left",($(".reiterAktiv2, .reiterInaktivLeft2").length > 0 ? "10px transparent solid" : ""))
			)
		)
		.append($("#allRows_filter"));
	} else if ($('.empty input[type="submit"]').lenght > 0){
		$("table.help").after($("table.help").clone().attr("id","buttop").removeClass("help").addClass("topButtonTable"));
		$("table.help").after($("<table><tr><td></td></tr></table>"));
		$("#buttop tr").remove();
		$("#buttop").append($('<tr></tr>')
		.append($('.empty input[type="submit"]').parent().first().clone())
		.append($("#allRows_filter")));
	} else if($(directSelector).length > 0){
		var ele = $('table.progTitle:first');
		if(!ele.has('.selectActionTitle')){
			ele = ele.next().after($("<table><tr><td></td></tr></table>"));
		}
		ele
		.after($("<table class=\"topButtonTable\"></table>")
		.append($("<tr></tr>")
		.append($("<td></td>")
		.append($(directSelector).clone().addClass("topButton").attr('form',$('form.inputForm').attr('id'))
		.append($("#allRows_filter")))
		)));
	} 
	else if($(parentSelector).length > 0){
		$('table.progTitle:first')
		.next()
		.after($("<table><tr><td></td></tr></table>"))
		.after($("<table class=\"topButtonTable\"></table>")
		.append($("<tr></tr>")
		.append($(parentSelector).parent().first().clone()
		.append($("#allRows_filter"))
		)));
	}
//	else if($('form > div > table:last-child input.button').length > 0){
//		$('table.progTitle:first').next().after($("<table><tr><td></td></tr></table>"))
//		.after($("<table class=\"topButtonTable\"></table>").append($("<tr></tr>").append(
//				$("<td></td>").append($('form > div > table:last-child input.button').clone())
//		)));
//	// TL 2015-09-25 weiterer Selector, bei Problemen loeschen und bescheid sagen
	
	//gsch top buttons falls ausserhalb des forms dort dazu geben
	// 2017-12-19 - hwMan - nur auch wirklich die Ids hinzufügen die nicht existieren.
	$('form').each(function(index, element){
		if($(element).attr('id') === undefined){
			if($('#'+$(element).attr('name')).size()>0)
				$(element).attr('id', "Form_" + parseInt((new Date()).getTime() / 1000));
			else
				$(element).attr('id', $(element).attr('name'));
				
		}
	});
	$('table.topButtonTable input').attr('form', $('form').attr('id'));
	
	//gsch ids anpassen damit nicht doppelt
	var tbi = 0;
	$('table.topButtonTable input.button').each(function(){
		$(this).attr('id',$(this).attr('id')+''+(tbi++))
	});
	if(copyOnlyButtons)
		return;
	// header fixieren
	var headerElements = $('.topButtonTable');
	var headerElem = $('.topButtonTable');
	while(headerElem.prev().length > 0){
		headerElem = headerElem.prev();
		if(!headerElem.is('input:hidden'))
			headerElements = headerElements.add(headerElem);
	}
	headerElements = headerElements.add($('a[name="reiter"]'));
	headerElements = headerElements.add($('a[name="reiter"]').prevAll('table'));
	headerElements = headerElements.add($('a[name="reiter"]').next('table'));
	headerElements = headerElements.wrapAll('<div class="fixedHeaderWithButtons fixed"><div></div></div>');
	if($('#ocTopBar').size() > 0){
		$('.fixedHeaderWithButtons').css('padding-top',($('#ocTopBar').outerHeight()+$('#ocTopBar').offset().top+10)+'px');
		if($('.pageWrapper').size() > 0)
			$('.pageWrapper').css('margin-bottom',($('#customFooterMobilityOnlineWrapper').outerHeight())+'px');
		else
			$('body').css('margin-bottom',($('#customFooterMobilityOnlineWrapper').outerHeight())+'px');
	}
	setTimeout(function(){
		var oldMargin = $('.pageWrapper').size() > 0 ? $('.pageWrapper').css('margin-top') : $('body').css('margin-top');
		if($('.pageWrapper').size() > 0)
			$('.pageWrapper').css('margin-top',($('.fixedHeaderWithButtons').outerHeight())+'px');
		else
			$('body').css('margin-top',($('.fixedHeaderWithButtons').outerHeight())+'px');
		if($('#foto_div').size() > 0)
			$('#foto_div').css('top',($('#foto_div').offset().top - parseInt(oldMargin) + $('.fixedHeaderWithButtons').outerHeight())+'px');
	},200);
	
	$('input:not([type=button], [type=submit]), button, textarea, select').focus(function(){
		scrollHeader(this);
	});
	
	$('.topButtonTable input:submit').click(function(e){
		if($(this).closest('form').size() == 0){
		    e.preventDefault();
			$('form').find('input:submit[name="'+this.name+'"]').last().click();
		}
	});
  }
}
function scrollHeader(ele){
	//jquery und normale elemente erlauben
    if (typeof jQuery === "function" && ele instanceof jQuery) {
        ele = ele[0];
    }
    if($(ele).not(':visible').length > 0){
    	ele = $(ele).next()[0];
    }
    var distance = $(ele).hasClass('ui-multiselect') ? 50 : 5;
	//um fixed header weiter nach oben scrollen bei focus
	if(ele && ele.getBoundingClientRect !== undefined 
		&& ((ele.getBoundingClientRect().top - $('.fixedHeaderWithButtons').outerHeight()) <= 0
		  || ele.getBoundingClientRect().bottom+distance > (window.innerHeight || document.documentElement.clientHeight)))
		$(window).scrollTop($(ele).offset().top - $('.fixedHeaderWithButtons').outerHeight()-20);
}
// Details Tooltips 
function addDetailToolTips(){
	$('.showLinkAsTooltip').each(function(){
		$(this).mouseout(function(event){clearTimeout($(this).qtip('api').timers.show);}).qtip({
			content: {
			text: function(event, api) {
			$.ajax({url: $(this).attr('href')+'&insideToolTip=true'})
			.then(function(content) {
				var d = $('<div />').append($.parseHTML(content)).find('#formBody');
				d.find('*').addClass('inToolTip');
				api.set('content.text', d);
			}, function(xhr, status, error) {});
			return '';
		}
		},
		hide: {
			fixed: true,
			delay: 500 
		},
		show: {
			solo: true,
			event: 'mouseover',
			delay: 500,
			effect: false,
			modal: {on: true}
		},
		position: {
			my: 'right center',
			at: 'left center',
			adjust: {method: 'shift'},
			effect: false,
			viewport: $(window)
		},
		events: { 
			render: function(event, api) {
				$(this).draggable({ handle: api.elements.titlebar });
				$('.mouseOver').mouseout();
			}
		},
		style: { classes: 'detailsToolTip', tip: false }
		});
	});
}

/////////////////////////////////////////
//         WebSocket Comm
/////////////////////////////////////////
var socket = window.atmosphere;
var socketfunctions = new Object();
var subSocket;
var transport = 'websocket';
var shared = false;
var fallbackTransport = 'long-polling'
var connected = false;
var uuid = 0;
var lastrequest;
var loadingservlet;

console.log = function() {};
// Atmosphere WebSocket Framework https://github.com/Atmosphere/atmosphere

function connectSocket(broadcaster, init) {
	// We are now ready to cut the request
	var request = { url: document.location.toString().substring(0,document.location.toString().lastIndexOf("/")+1) + 'atmosphere/' + broadcaster,
			contentType: "application/json",
			logLevel: 'debug',
			shared: shared,
			transport: transport,
			reconnectInterval: 1000,
            trackMessageLength : false,
			fallbackTransport: fallbackTransport};
	
	top.globalbroadcaster = broadcaster;
	
	request.onOpen = function (response) {
		console.log('Atmosphere connected using ' + response.transport);
		transport = response.transport;
		uuid = response.request.uuid;
	};
	
	request.onReopen = function (response) {
		console.log('Atmosphere re-connected using ' + response.transport);
	};
	
	request.onLocalMessage = function(response) {
	    this.onMessage(response);
	};
	
	request.onMessage = function (response) {
		console.log('Message received in '+window.location.pathname + " -- " + response.responseBody);
		top.lastmessage = response;
		var messages = response.responseBody.split("\n");

		for (var i in messages) {
			var message = messages[i];
			try {
				var json = $.parseJSON(message);
			} catch (e) {
				console.log('This doesn\'t look like a valid JSON: ', message);
				return;
			}
			var target = json.target;
			if(!target && json[0])
				target = json[0].target;
			
			if(target && socketfunctions[target])
				socketfunctions[target](json);
		}
	};
	
	request.onClose = function (response) {
		console.log('Connection closed');
		//subSocket.push($.stringifyJSON({message: 'disconnecting'}));
	};
	
	request.onError = function (response) {
		console.log('Error occured, reestablishing connection.');
		setTimeout(function(){
			if(top.lastmessage && lastrequest){
				lastrequest.onMessage(top.lastmessage);
				top.lastmessage = null;
			}
		}, 500);
	};
	
	request.onReconnect = function (request, response) {
		console.log('Connection lost, trying to reconnect. Trying to reconnect ' + request.reconnectInterval);
	};
	lastrequest = request;
	if(init || !top.infobox){
		subSocket = socket.subscribe(request);
		
		if(window.name == 'infoBox')
			top.infobox = true;
		
		// interval das schaut ob lokale messages gesendet werden sollen und die �bermittelt
		setInterval(function(){
			if(top.lastsentmessage){
				subSocket.push(top.lastsentmessage);
				top.lastsentmessage='';
			}
		},200);
	}else{
	// interval das schaut ob lokale messages vorhanden sind und die ausf�hrt
		setInterval(function(){
			if(top.lastmessage){
				lastrequest.onMessage(top.lastmessage);
				top.lastmessage='';
			}
		},200);
	}
	
	
}

function sendSocketMessage(msg){
//	if(!subSocket && top.globalbroadcaster)
//		connectSocket(top.globalbroadcaster,true);
	if(subSocket)
		subSocket.push(atmosphere.util.stringifyJSON({ data : msg ? msg : "<null>" }));
	else
		top.lastsentmessage=atmosphere.util.stringifyJSON({ data : msg ? msg : "<null>" });
}

function sendSocketRequest(url){
//	if(!subSocket && top.globalbroadcaster)
//		connectSocket(top.globalbroadcaster,true);
	if(subSocket)
		subSocket.push(atmosphere.util.stringifyJSON({ url : url ? url : "<null>" }));
	else
		top.lastsentmessage=atmosphere.util.stringifyJSON({ url : url ? url : "<null>" });
}

function sendSocketRequest(url, funktionsname, funktion){
	if(funktionsname && funktion)
		socketfunctions[funktionsname] = funktion;
	if(url && funktionsname)
		if(url.indexOf('?') > 0)
			url += '&jscallbackfunction='+funktionsname;
		else
			url += '?jscallbackfunction='+funktionsname;
	
//	if(!subSocket && top.globalbroadcaster)
//		connectSocket(top.globalbroadcaster,true);
	if(subSocket)
		subSocket.push(atmosphere.util.stringifyJSON({ url : url ? url : "<null>" }));
	else
		top.lastsentmessage=atmosphere.util.stringifyJSON({ url : url ? url : "<null>" });
}

/////////////////////////////////////////
//         Mail Client 
/////////////////////////////////////////
var upload_number = 1;
var ccNr = 1;
var url = '';
var servpath = '';
var req;
var filesfinished = 1;
var progressBarValue = 0;
var localvar;

function addEmpfaenger(servletname, servletpath) {
	url = servletname;
	servpath = servletpath;
	 	jQuery("#ccs").append(
 			jQuery(document.createElement("input"))
 				.attr("type", "text")
 				.attr("name", "cc"+ccNr)
 				.attr("class", "ccnr"+ccNr)
 				.attr("size", "50")
	 	);
	 	var del = jQuery(document.createElement("a"))
 			.attr("href", "javascript:removeEmpfaenger('"+ccNr+"');")
 			.attr("class", "ccnr"+ccNr)
 			.attr("style","font-size: 16px;")
 			.html("")
 			.append(jQuery(document.createElement("img"))
 				.attr("class", "attachmenticon")
 				.attr("src", servpath+"/images/delete.jpg")
 			)
 		;
 		jQuery("#ccs").append(del);
	 	jQuery("#ccs").append(jQuery(document.createElement("br")).attr("class", "ccnr"+ccNr));
	 	ccNr++;
}

function removeEmpfaenger(i) {
	jQuery(".ccnr"+i).remove();
}

function addFileInput(servletname, servletpath) {
	url = servletname;
	servpath = servletpath;

 	var form = jQuery(document.createElement("form"))
 		.attr("id", "uplformnr"+upload_number)
 		.attr("name", "uplformnr"+upload_number)
 		.attr("enctype", "multipart/form-data")
 		.attr("method", "post")
 		.attr("target", "uploadFramenr"+upload_number)
 		.attr("action", servletname)
 		.attr("style", "margin-bottom: 0px; margin-top: 0px;")
 		.attr("class","nr"+upload_number)
 		.attr("onload","funcReadyStateChange(this.className);")
 		.submit(function() {
				$('iframe#uploadFrame'+this.className).load(function (){funcReadyStateChange(this.className);});
 			ajaxFunction(this.className);
 			finishLoading();
		})
 	;

 	
 	var del = jQuery(document.createElement("a"))
 		.attr("href", "javascript:removeFileInput('uplformnr"+upload_number+"');")
 		.attr("style","font-size: 16px;")
 		.append(jQuery(document.createElement("img"))
 			.attr("class", "attachmenticon")
 			.attr("src", servpath+"/images/delete.jpg")
 		)
 	;
		var hframe = jQuery(document.createElement("iframe"))
	 		.attr("id","uploadFramenr"+upload_number)
	 		.attr("name","uploadFramenr"+upload_number)
	 		.attr("class","nr"+upload_number)
	 	;
 	
 	var file = jQuery(document.createElement("input"))
 		.attr("type", "file")
 		.attr("name", "attachmentnr"+upload_number)
 		.attr("class", "nr"+upload_number)
    ;
// 	var subm;
    	file.change(function() { 
    					jQuery("form."+jQuery(this).attr("class")).submit();
    				});
    
 	var div = jQuery(document.createElement("div"))
 		.attr("id", "hiddendivnr"+upload_number)
 		.hide()
 		.append(hframe)
 	;
 	
	 	jQuery("#Uploads").append(
	 		form.append(file)
	 			.append(del)
	 			.append(div)
	 		)
	 	;
 		jQuery("input.nr"+upload_number).click();
 	upload_number++;
}


function removeFileInput(i) {
	// async
	$.ajaxSetup({'async': false});
	// Disable caching of AJAX responses
	$.ajaxSetup ({'cache': false});
	jQuery.get(jQuery("#"+i).attr('action'),"form="+i);
	jQuery("#"+i).remove(); 
}

function ajaxFunction(nummer){
	jQuery('#loadingbar'+nummer).remove();
 	jQuery('form#uplform'+nummer).append(
		jQuery(document.createElement("img"))
			.attr("id", "loadingbar"+nummer)
			.attr("class", "loadingbar")
 			.attr("src", servpath+"/images/load_bar.gif")
	);
}
             
function funcReadyStateChange(nummer){     
	if($('#uploadFrame'+nummer) && $('#success', $('#uploadFrame'+nummer)[0].contentDocument).size() > 0)
		jQuery('#loadingbar'+nummer)
	 		.attr("src", servpath+"/images/green.png")
	 		.attr("class", "attachmenticon")
	 	;
	else{
		if(filesfinished < 2){
			$('#uploadFrame'+nummer).closest('form').submit();
			filesfinished--;
		}else{
			jQuery('#loadingbar'+nummer)
 				.attr("src", servpath+"/images/red.png")
 				.attr("class", "attachmenticon")
 			;
		}
	}
 	filesfinished++;
 	finishLoading();
}

/////////////////////////////////////////
//         Loading Screen     	
/////////////////////////////////////////
var fileDownloadCheckTimer;
var fileDownloadUpdateTimer;
var servlet;
var isfinish= false ;

function startLoadingScreenForFileCreation(sopAjaxServlet){
	startLoadingScreenForFileCreation(sopAjaxServlet, "fileComplete?", false)
}

function startLoadingScreenForFileCreation(sopAjaxServlet, msgCompleted, redirectUrl, withReload){	
	startLoadingScreenForFileCreation(sopAjaxServlet, msgCompleted, redirectUrl, withReload,"#d3d3d3")
}
function startLoadingScreenForFileCreation(sopAjaxServlet, msgCompleted, redirectUrl, withReload,backgroundColor){
	
	// falls socket einfach weiter sonst ajax
	if(socket){
		startCheckLoading(sopAjaxServlet+"&start=true",withReload);
	}else{
		servlet = sopAjaxServlet;		
//		var myLoadingDiv = $("#loadingDiv");
//		myLoadingDiv.show();
//		myLoadingDiv.progressbar({disabled:true}); 
//		myLoadingDiv.progressbar("enable");
//		myLoadingDiv.progressbar("value", 0); 
		$.ajax({
            type: 'GET',
            url: servlet+'&start=true',
            cache: false,
                    async: true,
                    dataType: "json",
            success: function(data)
            {           	
            	if (data[0].isProgressBarLoading == "true") {
//					if(data[0].maximum > 0){
//					myLoadingDiv.progressbar("value", data[0].current * 100 / data[0].maximum); 
//					//	myLoadingDiv.progressbar("value", data[0].current);
//					}else{
//						myLoadingDiv.progressbar("value", localvar);
//						localvar += 2;
//						if(localvar > 99)
//							localvar = 10;
//					}
				if(data[0].fileNameComplete != null && data[0].fileNameComplete != '' && data[0].fileready == "true" && isfinish == false){						
					isfinish = true ; 					
					if(msgCompleted != null && msgCompleted != '' && data[0].fileDownloadURL != null && data[0].fileDownloadURL != '' && redirectUrl != null && redirectUrl != "newPage" ) {
					// 	var test_url= msgCompleted + "!<br><br><a class=\"button-link\" href=\""+data[0].fileDownloadURL +"\" target=\"_blank\" onClick=\"goToURL('"+redirectUrl+"','');\">"+data[0].hrefLabel+"</a><br><br>" ;
					 	var test_url= msgCompleted + "!<br><br> <input class=\"button\" type=\"button\" onClick=\"goToURL('" +data[0].fileDownloadURL +"')\" value=\"" +data[0].hrefLabel + "\"><br>" ;					
					}
					else if(redirectUrl == "newPage"){
					//	var test_url= msgCompleted + "!<br><br><a class=\"button-link\" href=\""+data[0].fileDownloadURL +"\" target=\"_blank\">"+data[0].hrefLabel+"</a><br><br><br>" ;
						var test_url= msgCompleted + "!<br><br> <input class=\"button\" type=\"button\" onClick=\"goToURL('" +data[0].fileDownloadURL +"')\" value=\"" +data[0].hrefLabel + "\"><br>" ;					
					}
					else{
						var test_url= data[0].msgError+"<br><br><a class=\"button-link\" href=\"/FileDownloadServlet\" target=\"_blank\">"+data[0].hrefLabel+"</a><br><br>" ;
						
					}
					$('#msgBody').html(test_url);
				
				    $.getJSON(servlet+'&end=true', function(data) {							
					
				    });
				  
				}
				$('#transparentPage').height($(document).height());
			}else{
					if(withReload)
						finishLoadingWithReload();
				else
						finishLoading();
			}
            },
            complete: function()
            {
            	deactivateGlobalLoadingFrame();
            },
            error: function(data)
            {
            	deactivateGlobalLoadingFrame();
            	alert(data);
            }                     
       });	
	}
	
}

function startInstantLoading(sopAjaxServlet){
	startInstantLoading(sopAjaxServlet, false);
}
function startInstantLoading(sopAjaxServlet, withReload){
	// falls socket einfach weiter sonst ajax
	if(socket){
		startCheckLoading(sopAjaxServlet+"&start=true",withReload);
	}else{
		servlet = sopAjaxServlet;
			var myLoadingDiv = $("#loadingDiv"); 
			$('#ersatzloading').hide();
			myLoadingDiv.show();
			activateDeactivateScreen("visible");
			myLoadingDiv.progressbar({disabled:true}); 
			myLoadingDiv.progressbar("enable");
			myLoadingDiv.progressbar("value", 0); 
			$('body').css('overflow', 'hidden');
			$('#transparentPage').width($(document).width());
			localvar = 0;
			fileDownloadCheckTimer = window.setInterval(function () {
				var myLoadingDiv = $("#loadingDiv"); 
				myLoadingDiv.progressbar("value", localvar);
				localvar += 2;
				if(localvar > 99)
					localvar = 10;
			}, 800);
			fileDownloadUpdateTimer = window.setInterval(function () {
				
				var myLoadingDiv = $("#loadingDiv"); 
				$.getJSON(servlet, function(data) { 
					if (data && data[0].isloading == "true") {
						if(data[0].maximum > 0){
							myLoadingDiv.progressbar("value", data[0].current * 100 / data[0].maximum); 
						}else{
							myLoadingDiv.progressbar("value", localvar);
							localvar += 2;
							if(localvar > 99)
								localvar = 10;
						}
						$('#transparentPage').height($(document).height());
					}else{
						if(withReload)
							finishLoadingWithReload();
						else
							finishLoading();
					}
				});
			}, 1000);
		}
}

(function ($) {
	$.fn.circlos = function () {
		// deafualt options 
		var DEFAULTS = {
			backgroundColor: '#bdc3c7', // default background color 
			progressColor: '#004596', // default progress color 
			percent: 87, // default percent value
			duration: 0, // default duration value
			percentageColor: '#000000'
		};	
		$(this).each(function () {
			var $target  = $(this);
              // options of circle 	
			var options = {
             // if isset value of background if not use the default value of background color 
			backgroundColor: $(this).attr("data-color") ? $(this).attr("data-color").split(',')[0] : DEFAULTS.backgroundColor,
		     // if isset value of progress if not use the default value of progress color 
			progressColor: $(this).attr("data-color") ? $(this).attr("data-color").split(',')[1] : DEFAULTS.progressColor,
			  // if isset value of percent  if not use the default value of percent  
			percent: $(this).attr("data-percent") ? $(this).attr("data-percent") : DEFAULTS.percent,
			 // if isset value of duration if not use the default value of duration
			duration:$(this).attr("data-duration") ? $(this).attr("data-duration") : DEFAULTS.duration,
			// if isset value of percentage color if not use the default black color
			percentageColor:$(this).attr("percentage-color") ? $(this).attr("percentage-color") : DEFAULTS.percentageColor		
			};
			 console.log(options);
	         // add divs for structure
			$target.append('<div class="background"></div><div class="rotate"></div><div class="left"></div><div class="right"></div><div class=""><span>' + options.percent + '%</span></div>');
	         // change style of the circle with the options values 
			$target.find('.background').css('background-color', options.backgroundColor);
			$target.find('.left').css('background-color', options.backgroundColor);
			$target.find('.rotate').css('background-color', options.progressColor);
			$target.find('.right').css('background-color', options.progressColor);
			$target.find('span').css('color', options.percentageColor);
			var $rotate = $target.find('.rotate');
			setTimeout(function () {	
				$rotate.css({
					'transition': 'transform ' + options.duration + 'ms linear',
					'transform': 'rotate(' + options.percent * 3.6 + 'deg)'
				});
			},1);		

			if (options.percent > 50) {
				// add animation for the right class and left class 
				var animationRight = 'toggle ' + (options.duration / options.percent * 50) + 'ms step-end';
				var animationLeft = 'toggle ' + (options.duration / options.percent * 50) + 'ms step-start';  
				$target.find('.right').css({
					animation: animationRight,
					opacity: 1
				});
				$target.find('.left').css({
					animation: animationLeft,
					opacity: 0
				});
			} 
		});
	}
})(jQuery);

function startCheckLoadingProgressBar(sopAjaxServlet, withReload, circleColor, loadingMsg, checkProgressBarLoading){
	setTimeout(function() {
		$.getJSON(sopAjaxServlet, function(data) 
		{ 
			if(typeof checkProgressBarLoading === "undefined")
				checkProgressBarLoading = true;
			if(data && data[0].isProgressBarLoading == "true" || !checkProgressBarLoading) 
			{ 
				var myLoadingDiv = $(".circleC").size() > 0 ? $(".circleC") : $(".circleC",parent.document); 
				$('#ersatzloading').hide();
				myLoadingDiv.show();
				$('#cancelRequestDivLoadingProgressBar').show();
				activateDeactivateScreen("visible");
				$('#globalLoadingPage').show();
				if(typeof loadingMsg === "undefined" || loadingMsg === '' || loadingMsg === '')
					loadingMsg = data[0].loadingMsg;
				var loadingText = $("#loadingText");
				loadingText.text(loadingMsg);
				$('#ProgressBarLoadingMsgDiv').show();
				$('#ProgressBarLoadingMsgDiv').text(loadingMsg);					
				
				var x= Math.round(data[0].current * 100 / data[0].maximum);
				var color= "#bdc3c7,"+circleColor;
				myLoadingDiv.attr("data-percent",x);
				myLoadingDiv.attr("data-color",color);
				myLoadingDiv.circlos({
				});				
				localvar = 0;
				setTimeout("updateLoadingProgressBar('"+sopAjaxServlet+"','"+withReload+"');", 200);
			}
			else
			{
				//if example file creation is done but loading screen is still there it should be deactivated so includesFileUpload=false;
				includesFileUpload=false;
				finishLoading();
			}
		});
	}, 1000);
}

function updateLoadingProgressBar(sopAjaxServlet, withReload){
	var myLoadingDiv = $(".circleC").size() > 0 ? $(".circleC") : $(".circleC",parent.document); 
	$.getJSON(sopAjaxServlet, function(data) { 
		if (data && data[0].isProgressBarLoading == "true") {
			if(data[0].maximum > 0){				
				var x= Math.round(data[0].current * 100 / data[0].maximum) ;
					myLoadingDiv.attr("data-percent",x) ;
					myLoadingDiv.circlos({
					  });			
				//myLoadingDiv.progressbar("value", data[0].current * 100 / data[0].maximum); 
			}else{
				//myLoadingDiv.progressbar("value", localvar);
				myLoadingDiv.attr("data-percent",localvar) ;
				myLoadingDiv.circlos({
				  });
				
				localvar += 2;
				if(localvar > 99)
					localvar = 10;
			}
			$('#transparentPage').height($(document).height());
			setTimeout("updateLoadingProgressBar('"+sopAjaxServlet+"','"+withReload+"');", 500);
		}else{
			//if example file creation is done but loading screen is still there it should be deactivated so includesFileUpload=false;
			includesFileUpload=false;
			finishLoading();
			if(withReload == "true"){
				document.location.reload();
			}
		}
	}); 
}

function startCheckLoading(sopAjaxServlet){
	startCheckLoading(sopAjaxServlet, 'false');
}

function startCheckLoading(sopAjaxServlet, withReload){
	//websocket oder ajax
	if(socket){
		var myLoadingDiv = $("#loadingDiv"); 
		$('#ersatzloading').hide();
		myLoadingDiv.show();
		activateDeactivateScreen("visible");
		myLoadingDiv.progressbar({disabled:true}); 
		myLoadingDiv.progressbar("enable");
		myLoadingDiv.progressbar("value", 0); 
		$('body').css('overflow', 'hidden');
		$('#transparentPage').width($(document).width());
		localvar = 0;
		
		fileDownloadCheckTimer = window.setInterval(function () {
			var myLoadingDiv = $("#loadingDiv"); 
			myLoadingDiv.progressbar("value", localvar);
			localvar += 2;
			if(localvar > 99)
				localvar = 10;
		}, 800);
		
		updateLoading(sopAjaxServlet,withReload);
	}else{
		setTimeout(function() {
			$.getJSON(sopAjaxServlet, function(data) { 
				if (data && data[0].isloading == "true") { 
					var myLoadingDiv = $("#loadingDiv"); 
					$('#ersatzloading').hide();
					myLoadingDiv.show();
					activateDeactivateScreen("visible");
					myLoadingDiv.progressbar({disabled:true}); 
					myLoadingDiv.progressbar("enable");
					myLoadingDiv.progressbar("value", data[0].current * 100 / data[0].maximum); 
					$('body').css('overflow', 'hidden');
					$('#transparentPage').width($(document).width());
					localvar = 0;
					setTimeout("updateLoading('"+sopAjaxServlet+"','"+withReload+"');", 200);
				}else{
					finishLoading();
				}
			});
		}, 1000);
	}
}

function startCheckLoadingV2(sopAjaxServlet, withReload, loadingText){
	//websocket oder ajax
	if(socket){		
		updateLoadingV2(sopAjaxServlet,withReload);
	}else{
		setTimeout(function() {
			$.getJSON(sopAjaxServlet, function(data) { 
				if (data && data[0].isloading == "true") { 
					activateGlobalLoadingFrame(loadingText);
					setTimeout("updateLoadingV2('"+sopAjaxServlet+"','"+withReload+"');", 200);
				}else{
					finishLoadingV2();
				}
			});
		}, 1000);
	}
}

function updateLoading(sopAjaxServlet, withReload){
	//websocket oder ajax
	if(socket){
		loadingservlet = sopAjaxServlet;
		sendSocketRequest(sopAjaxServlet, 'jscallbackupdateloading', function(data) {
			var myLoadingDiv = $("#loadingDiv");
			if (data && data[0].isloading == "true") {
				if(data[0].maximum > 0){
					myLoadingDiv.progressbar("value", data[0].current * 100 / data[0].maximum); 
				}else{
					myLoadingDiv.progressbar("value", localvar);
					localvar += 2;
					if(localvar > 99)
						localvar = 10;
				}
				$('#transparentPage').height($(document).height());
			}else{
				if(withReload)
					finishLoadingWithReload();
				else
					finishLoading();
			}
		});	
	}else{
		var myLoadingDiv = $("#loadingDiv"); 
		$.getJSON(sopAjaxServlet, function(data) { 
			if (data && data[0].isloading == "true") {
				if(data[0].maximum > 0){
					myLoadingDiv.progressbar("value", data[0].current * 100 / data[0].maximum); 
				}else{
					myLoadingDiv.progressbar("value", localvar);
					localvar += 2;
					if(localvar > 99)
						localvar = 10;
				}
				$('#transparentPage').height($(document).height());
				setTimeout("updateLoading('"+sopAjaxServlet+"','"+withReload+"');", 500);
			}else{
				finishLoading();
				if(withReload == "true"){
					document.location.reload();
				}
			}
		}); 
	}
}

function updateLoadingV2(sopAjaxServlet, withReload){
	//websocket oder ajax
	if(socket){
		loadingservlet = sopAjaxServlet;
		sendSocketRequest(sopAjaxServlet, 'jscallbackupdateloading', function(data) {
			if (data && data[0].isloading == "true") {
			}else{
				if(withReload)
					finishLoadingWithReloadV2();
				else
					finishLoadingV2();
			}
		});	
	}else{
		$.getJSON(sopAjaxServlet, function(data) { 
			if (data && data[0].isloading == "true") {				
				setTimeout("updateLoadingV2('"+sopAjaxServlet+"','"+withReload+"');", 500);
			}else{
				finishLoadingV2();
				if(withReload == "true"){
					document.location.reload();
				}
			}
		}); 
	}
}

function finishLoading() {
	//gsch wenn ein file hochgeladen wird kann der submit lange dauern, dann keinen ladeschirm entfernen
	if(includesFileUpload)
		return;
	 var myLoadingDiv = $("#loadingDiv"); 
	 window.clearInterval(fileDownloadCheckTimer);
	 window.clearInterval(fileDownloadUpdateTimer);
	 activateDeactivateScreen("hidden");
	 $('#ersatzloading').show();	 
	 myLoadingDiv.hide();
	 //hide progressbar in global loading page
	 $(".circleC",parent.document).hide();
	 $('body').css('overflow', '');
	 if(inputsDeactivated){
		 $("input").removeAttr('disabled');
	 }
	 try{if(!(noresub === undefined)){
		 noresub = false;
	 }}catch(err){}
	 deactivateGlobalLoadingFrame();
	 $('#cancelRequestDivLoadingProgressBar').hide();
	 $('#ProgressBarLoadingMsgDiv').hide();
//	 try{
//			if($('#globalLoadingPage').size() > 0){
//				$('#globalLoadingPageErsatzloading').show();
//				$('#globalLoadingPageLoadingDiv').show();
//				$('#cancelRequestDiv').show();
//				$('#globalLoadingPageLoadingMsgDiv').show();
//				
//			}				
//			else if($('#globalLoadingPage', parent.document).size() > 0){
//				$('#globalLoadingPageErsatzloading', parent.document).show();
//				$('#globalLoadingPageLoadingDiv', parent.document).show();
//				$('#cancelRequestDiv', parent.document).show();
//				$('#globalLoadingPageLoadingMsgDiv', parent.document).show();
//			}			
//		}catch(ex){}
}
function finishLoadingV2() {
	deactivateGlobalLoadingFrame();
}

function finishLoadingWithReload() {
	 finishLoading();
	 location.reload();
}
/////////////////////////////////////////
// Replace Tag by reading HTML via servlet	
/////////////////////////////////////////
function replaceTagByExternalReadingServlet(tagId, readingServlet, startLoadingScreen, ignoreDecodeResponse, removeTagByResponse)
{
	//alert("test bei tagId="+tagId+" mit servlet="+readingServlet+" und startLoadingScreen="+startLoadingScreen);
	// Lade-Bildschrim aktivieren
	if(startLoadingScreen > 0)
		activateDeactivateScreen('visible');
	// async
	$.ajaxSetup({'async': false});
	// Disable caching of AJAX responses
	$.ajaxSetup ({'cache': false});
	$.getJSON(readingServlet, function(data) 
	{
	  //alert("length=");
	  if(data[0].newHTML == "msg")
		  alert(data[0].msg);
	  // Ausgabe
	  else
	  {
		  var htmlText = data[0].newHTML;
		  // Achtung! alles decoden
		  if(!isNotNullAndNotZero(ignoreDecodeResponse)) 
		  {
			  htmlText = $("<div/>").html(htmlText).text();
		  }
		  if(isNotNullAndNotZero(removeTagByResponse))
		  {
			  $('#'+tagId).replaceWith(htmlText);
		  }
		  else
		  {
			  changeTextOfHrefByElementId(tagId,htmlText);
		  }
	  }
	}); 
	// Lade-Bildschrim deaktivieren
	if(startLoadingScreen > 0)
		activateDeactivateScreen('hidden');
}
// funktionen um html zu escapen / unescapen (funktionieren in allen Browsern)
function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}
function htmlUnescape(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

// replace content for qtip by reading data via ajax
// a-element needs class hasTooltipForReadDynamicContent, and href with given URL for reading data via ajax
function buildJsCodeForToolTipWithReadDynamicContent(toAddDetailToolTips)
{ 
	// Tooltip
	if(toAddDetailToolTips == true)
		addDetailToolTips();
	$('.hasTooltipForReadDynamicContent').each(function() { // Notice the .each() loop, discussed below
		$(this).qtip({
			position: {
				my: 'left center',
				at: 'right center',
				adjust : {
			        resize : true
			    },
				effect: false,
				viewport: $(window)
			},
			style: { classes: 'qtip_hasTooltipForReadDynamicContent qtip_resizable' },
	        content: {	         
	        	text: function(event, api) {
	        		if($(this).hasClass('contentNotLoaded')){
		        		// read data by using href
		        		$.ajax({
		                    url: this.attr('href')
		                })
		                .then(function(content) {
		                    // Set the tooltip content upon successful retrieval
		                    api.set('content.text', content.data);
		                    api.reposition();
				        	if(api.elements.tooltip.position().left<0)
				        		api.elements.tooltip.css('left','5px');
		                    /*
		                    $('#qtip-'+api.get('id')+'-content').resizable({
		                        aspectRatio: true,
		                        handles: 'ne, se, sw, nw'
		                    });
		                    */
		                    /*
		                    $('#'+api.elements.tooltip[0].id).resizable({
		                        aspectRatio: true,
		                        handles: 'ne, se, sw, nw'
		                    });
		                    */	                    
		                }, function(xhr, status, error) {
		                    // Upon failure... set the tooltip content to the status and error value
		                    api.set('content.text', status + ': ' + error);
		                });
		        		$(this).removeClass('contentNotLoaded');
		        		//loading text
		                return '<img src="./images/loading_animated2.gif" alt="Loading..." />';
	        		}
                }
				
				//,title: {
	            //     text: 'Click and drag me to move the tooltip',
	            //     button: true
	            // }
	        },
	        events: {
		        show: function(event, api) {		        	
		        	$( "div.qtip" ).css( "background-color", "white" );
		        },
		        render: function(event, api) {
                	$(this).draggable({
                    	containment: 'window',
                    	handle: api.elements.content
                	});
		        },
		        visible: function(event, api) {
		        	if(api.elements.tooltip.position().left<0)
		        		api.elements.tooltip.css('left','5px');
		        }
	        },		
	        show: {
				event: 'mouseover',
				delay: 500
			},
	        hide: {
	        	event:'mouseout unfocus',
	        	fixed: true, 
	        	delay: 200
	        }
	    }).click(function(event) { event.preventDefault(); });//.draggable({ containment: 'window'});
	});
	// Mouse-Click verbieten
	$('.preventMouseClick').click(function (event)
	{
		$("#preventMouseClick").toggle();
	    return false;
	});
	
}
var isReadPeriodicallyAlreadyRunning = 0;
function getInformationAboutNewEmails(readingServlet, readPeriodically)
{
	if(subSocket){
		// callback function setzen fuer messages
		socketfunctions.infobox = function(data){
			//alert("length=");
			if(data[0].newHTML == "msg")
				alert(data[0].msg);
			// Ausgabe
			else
			{
				var htmlText = data[0].newHTML;
				var image = data[0].image;
				htmlText = htmlUnescape(htmlText);
				parent.text.showResponse(htmlText,'',image);
				// Falls der Service sagt, dass es mind. 1 Postfach gibt, und bisher noch nicht periodisch gelesen wird, dann jetzt lesen
				var emailsCheckingActivate = data[0].emailsCheckingActivate;
				if(readPeriodically === 1 || (readPeriodically === 0 && isReadPeriodicallyAlreadyRunning === 0 && emailsCheckingActivate === 1))
				{
					isReadPeriodicallyAlreadyRunning = 1;
					setTimeout("getInformationAboutNewEmails('"+readingServlet+"', 1);", 60000);
				}
			}
		};
		// event an den server schicken
		sendSocketRequest(readingServlet);
	}else{
		$.ajaxSetup({'async': true});
		$.ajaxSetup ({'cache': false});
		
		$.getJSON(readingServlet, function(data){
			if(data[0].newHTML == "msg")
				alert(data[0].msg);
			else{
				var htmlText = data[0].newHTML;
				var image = data[0].image;
				htmlText = htmlUnescape(htmlText);
				parent.text.showResponse(htmlText,'',image);
				// Falls der Service sagt, dass es mind. 1 Postfach gibt, und bisher noch nicht periodisch gelesen wird, dann jetzt lesen
				var emailsCheckingActivate = data[0].emailsCheckingActivate;
				if(readPeriodically === 1 || (readPeriodically === 0 && isReadPeriodicallyAlreadyRunning === 0 && emailsCheckingActivate === 1))
				{
					isReadPeriodicallyAlreadyRunning = 1;
					setTimeout("getInformationAboutNewEmails('"+readingServlet+"', 1);", 60000);
				}
			}
		}); 
//		if(reloadFunction > 0)
//			setTimeout("loadBinaryFilesForInfoBox('"+tagId+"','"+readingServlet+"',"+startLoadingScreen+","+reloadFunction+");", 10000);	
	}
}
function loadBinaryFilesForInfoBox(tagId, readingServlet, startLoadingScreen, reloadFunction)
{
	if(subSocket){
		// callback function setzen fuer messages
		socketfunctions.infobox = function(data){
			//alert("length=");
			if(data[0].newHTML == "msg")
				alert(data[0].msg);
			// Ausgabe
			else
			{
				var htmlText = data[0].newHTML;
				htmlText = htmlUnescape(htmlText);
				$('#'+tagId).html(htmlText);
				if(htmlText.indexOf("loading_mini_rotate.gif") > 0){
					setTimeout("loadBinaryFilesForInfoBox('"+tagId+"','"+readingServlet+"',"+startLoadingScreen+","+reloadFunction+");", 5000);
				}
			}
		};
		// event an den server schicken
		sendSocketRequest(readingServlet);
	}else{
		$.ajaxSetup({'async': true});
		$.ajaxSetup ({'cache': false});
		
		$.getJSON(readingServlet, function(data){
			if(data[0].newHTML == "msg")
				alert(data[0].msg);
			else{
				var htmlText = data[0].newHTML;
				htmlText = htmlUnescape(htmlText);
				$('#'+tagId).html(htmlText);
				if(htmlText.indexOf("loading_mini_rotate.gif") > 0){
					setTimeout("loadBinaryFilesForInfoBox('"+tagId+"','"+readingServlet+"',"+startLoadingScreen+","+reloadFunction+");", 5000);
				}
			}
		}); 
//		if(reloadFunction > 0)
//			setTimeout("loadBinaryFilesForInfoBox('"+tagId+"','"+readingServlet+"',"+startLoadingScreen+","+reloadFunction+");", 10000);	
	}
}

function checkFieldViaService(fieldName, fieldValue, readingServlet, serviceUnreachableMSG)
{
	return checkFieldViaService(fieldName, fieldValue, readingServlet, serviceUnreachableMSG, 'alert');
}

function checkFieldViaService(fieldName, fieldValue, readingServlet, serviceUnreachableMSG, isalert)
{
	//alert("formName="+formName+" fieldName="+fieldName+" wert="+wert);
	readingServlet = readingServlet + "&"+fieldName+"="+fieldValue;
	$.getJSON(readingServlet, function(data) 
	{
	  //alert("length=");
	  if(data[0].newHTML == "msg")
	  {
		  if(isalert == 'alert')
			  alert(data[0].msg);
		  return false;
	  }
	  // Ausgabe
	  else
	  {
		  return true;
	  }
	}); 
	alert(serviceUnreachableMSG);
	return false;
}

function changeFieldViaService(fieldName, urlFieldName, fieldValue, oldValue, readingServlet, startLoadingScreen, serviceUnreachableMSG)
{
	if(startLoadingScreen > 0)
	{
	  activateDeactivateScreen('visible');
	  //alert("startLoadingScreen="+startLoadingScreen);
	}
	// async
	$.ajaxSetup({'async': false});
	// Disable caching of AJAX responses
	$.ajaxSetup ({'cache': false});
	// servlet
	readingServlet = readingServlet + "&"+urlFieldName+"="+fieldValue;
	$.getJSON(readingServlet, function(data) 
	{
	  // Lade-Bildschrim deaktivieren
	  if(startLoadingScreen > 0)
		activateDeactivateScreen('hidden');
	  //alert("length=");
	  if(data[0].msg == "1")
	  {
		return true;
	  }
	  // Ausgabe
	  else
	  {
		alert(data[0].msg);
		searchAndGetElementByName(fieldName).value=oldValue;
		return false;
	  }
	}); 
	// Lade-Bildschrim deaktivieren
	if(startLoadingScreen > 0)
	  activateDeactivateScreen('hidden');
	// Service noch reachable
	searchAndGetElementByName(fieldName).value=oldValue;
	alert(serviceUnreachableMSG);
	return false;
}

/////////////////////////////////////////
//         Fixed Footer Header    	
/////////////////////////////////////////
var totalHeight=0;

function resizeBody(){
  if ($('#tablebody').height() > ($(window).height() - $('#tableheader').height() - $('#tablefooter').height())
	   && 20 < ($(window).height() - $('#tableheader').height() - $('#tablefooter').height())) {
	$('#tablebody').height($(window).height() - 30 - $('#tableheader').outerHeight() - $('#tablefooter').outerHeight());
	$('body').css('overflow','hidden');
  }else{
	$('#tablebody').height('auto');
	$('body').css('overflow','auto');
	$('#resizetd').remove();
  }
}

/////////////////////////////////////////
//         Ajax Areas    	
/////////////////////////////////////////

function showHide(divClass, sender){
	divClass = divClass.split(' ')[0];
	if($('div.'+divClass+' > div[id=empty]').length > 0){
		$('div.'+divClass+' > div[id=empty]').remove();
		$('div.'+divClass).load($('div.'+divClass).attr('url'));
	}
	if($('div.'+divClass).is(":visible")){
		$('div.'+divClass).hide();
		$(sender).attr('src', $(sender).attr('src').replace('minus','plus'));
		var tmptitle =$(sender).attr('title');
		$(sender).attr('title', $(sender).attr('title2'));
		$(sender).attr('title2', tmptitle);
	}else{
		$('div.'+divClass).show();
		$(sender).attr('src', $(sender).attr('src').replace('plus','minus'));
		var tmptitle =$(sender).attr('title');
		$(sender).attr('title', $(sender).attr('title2'));
		$(sender).attr('title2', tmptitle);
	}
}

function sync(trClass,parentDiv, urlcall){
	if(urlcall){
		$.post(urlcall,{},function(val){
			accordionMessage(0, val, 0);
		});
	}
	$('tr.'+trClass).remove();
	if($('tr','div.'+parentDiv+'_body').length < 1){
		$('div.'+parentDiv+'_body').remove();
		$('div.'+parentDiv+'_head').remove();
		if($('div','div.SyncDivBody').length < 2){
			$('#allSyncDone').show();
		}
	}
}

function applicant(trClass,parentDiv, urlcall){
	$.post(urlcall,{},function(val){
		accordionMessage(0, val, 0);
	});
	$('tr.'+trClass).remove();
	if($('tr.dispNormal, tr.dispReverse','div.'+parentDiv+'_body').length < 1){
		$('div.'+parentDiv+'_body').remove();
		$('div.'+parentDiv+'_head').remove();
		if($('div','div.applicantsOutBody').length < 2){
			$('#allAppOutDone').show();
		}
		if($('div','div.applicantsIncBody').length < 2){
			$('#allAppInDone').show();
		}
		if($('div','div.learnagreeBody').length < 2){
			$('#allLearnAgreeDone').show();
		}
	}
}

/////////////////////////////////////////
//         jQuery UI Accordion functions  	
/////////////////////////////////////////

// f�gt unter das accordion einen neuen eintrag als kopie des vormals letzten hinzu und baut das accordion neu
function csfunction(event, ui, label_insert){
	if($('#accordion').find('h3.ui-state-active')[0] == $('#accordion').find('h3').last()[0]){
  		$('#accordion').append('<h3><a>'+label_insert+'</a></h3><div>'+$(this).find('div').last().html()+'</div>')
  		.accordion('destroy')
  		.accordion({active:  $('#accordion').find('h3').eq(-2),	change: csfunction});
  	}
  }

// f�gt in einen accordion header eine erfolgs / fehler meldung ein die nach 3 sekunden wieder verschwindet
function accordionMessage(id, val, row){
	var c=val.split(' ')[0];
	var m=val.substr(val.indexOf(' '));
	$('body, html').animate({scrollTop : 0}, 'slow');
	$('body').append('<span class=\"accordionmess '+c+'\" id=\"mess'+id+'\"><p>'+m+'</p></span>');
	setTimeout(function(){$('#mess'+id).fadeOut('slow', function () {$('#mess'+id).remove();});}, 1500);
}

// �bermittelt das form innerhald eines accordions an das action servlet mit den inhalten des formulars 
// und einer callback funktion f�r das ergebnis zur anzeige im header der form "error errortext" oder "success erfolgstext"
function submitInterface(id, row, button){
	var columns = new Array();
	$('#sortable1'+id+' > li').each(
		function() {
			columns.push($(this).attr('nr'));
		}
	);
	$('input[type=hidden][name=columns]').val(columns);
	var formData = $('form.'+id).serialize();
	$('#accordion').accordion("option", "active", row);
	$.post($('form.'+id).attr('action')+'?'+formData+'&action='+$(button).attr('name'),{},function(val){
		accordionMessage(id, val, row);
	});
}

// f�gt in #desc und #rest die attribute des ui objektes ein
function updateInfo(ui, id){
	$('#desc'+id).text($(ui).attr('desc'));
	$('#rest'+id).text($(ui).attr('rest'));
}

function loadAccordionContent(accordion, divClass){
	if($('div.'+divClass+' > div[id=empty]').length > 0){
		$('div.'+divClass+' > div[id=empty]').remove();
		$('div.'+divClass).show();
		$('div.'+divClass+'> div[id=content]').load($('div.'+divClass).attr('url'));
		accordion
		.accordion('destroy')
  		.accordion({
			collapsible: true,
			active: divClass,
			header: '>h3',
			autoHeight: false,
			changestart: function(event, ui){
				loadAccordionContent($(this), $(this).find('.ui-state-hover').attr('id'));
			}
		});
	}
}
/////////////////////////////////////////
//Combo Box Sort    	
/////////////////////////////////////////

var atend;

function addComboBoxSort(imgAddress, titleText, iconsetVersion, color){
	var option = $('select[name^="pipe_id"],select[name^="step_id"],select[name^="studr_id"],select[name^="isced_id"],select[name^="sub_id"],select[name^="inst_id"],select[name^="lv_id"],select[name^="field_name"],select[name^="inst_art_id"],select[name^="wirt_zweig_id"],select[name^="col_name"],select[name^="left_col_name"],select[name^="right_col_name"],select[name^="listbox_col_name"]')
	.filter(':not(fieldset select)').filter(':not(:disabled)').not('#tableheader select')
	.find('option:nth-child(2):contains(" - "), option:nth-child(2)[title*=" - "]');
	
	// 2019-07-11 - hwMan - Parent suchen in folgender Reihenfolge, 1. td welches andere Icons enthält, 2. comboWrapper oder multiselectWrapper zur Not dann parent().parent()
	var parent;
	// 2019-10-04 - hwMan - auf ParentsUtil geändert da sonst z.B. auf Students wenn Tabellen und Tds verschachtelt sind teilweise zusätzliche Sortiericons in der Übergeordneten Tabelle gelandet sind
	if(option.parentsUntil("td").find("a").size() > 0)
	{
		parent = option.parents("td");
	}
	//das war falsch und wir wollen eh nicht den wrapper sondern das td
//	else if(option.parent().next(".comboWrapper, .multiselectWrapper").size() > 0)
//	{
//		parent = option.parent().next(".comboWrapper, .multiselectWrapper");
//	}
	else
	{
		parent = option.parent().parent();
	}

	//gsch parent ist das td, innerhalb dieses den ersten link nehmen und davor das sortier icon platzieren.
	if(iconsetVersion != undefined && isFontIconVersion(iconsetVersion))
	{
		if(color != undefined)
		{
			parent.find('a:first-of-type').before('<a aria-label="'+titleText+'" href="javascript:void(0)" class="sortComboLink"><i class="moi moi-v'+iconsetVersion+' '+imgAddress+'" title="'+titleText+'" style="cursor:pointer; color: ' + color + '"></i></a>');
		}
		else
		{
			parent.find('a:first-of-type').before('<a aria-label="'+titleText+'" href="javascript:void(0)" class="sortComboLink"><i class="moi moi-v'+iconsetVersion+' '+imgAddress+'" title="'+titleText+'" style="cursor:pointer;"></i></a>');			
		}
	}
	else
	{
		parent.find('a:first-of-type').before('<a aria-label="'+titleText+'" href="javascript:void(0)" class="sortComboLink"><img src="'+imgAddress+'" title="'+titleText+'"/></a>');
	}	

	$('a.sortComboLink').click(function(){
		sortComboBox($(this).parent().find('select'));
	});
	atend='';
}

function sortComboBox(selectObject){
	var $dd = selectObject;
	if ($dd.length > 0) {

	    // save the selected value
	    var selectedVal = $dd.val();

	    // get the options and loop through them
	    var $options = $('option', $dd);
	    var arrVals = [];
	    var name = ' '+$(selectObject).attr('name')+' ';
	    if(atend.indexOf(name) >= 0)
	    	atend = atend.replace(name, '');
	    else
	    	atend = atend+name;
	    
	    $options.each(function(){
	        // push each option value and text into an array
	    	var title = $(this).attr('title');
	    	var txt = $(this).text();
	    	if(txt.indexOf(' - ') > 0 || ($(this).hasClass('oversize') && title.indexOf(' - ') > 0) ){
	    		if($(this).hasClass('oversize')){
	    			var len = txt.length;
	    			if(atend.indexOf(name) >= 0)
		    			title = title.substring(title.lastIndexOf(' - ') + 3) + ' - ' + title.substring(0,title.lastIndexOf(' - '));
		    		else
		    			title = title.substring(title.indexOf(' - ') + 3) + ' - ' + title.substring(0,title.indexOf(' - '));
	    			txt = title.substring(0,len-3)+'...';
	    		}else {
		    		if(atend.indexOf(name) >= 0)
		    			txt = txt.substring(txt.lastIndexOf(' - ') + 3) + ' - ' + txt.substring(0,txt.lastIndexOf(' - '));
		    		else
		    			txt = txt.substring(txt.indexOf(' - ') + 3) + ' - ' + txt.substring(0,txt.indexOf(' - '));
	    		}
	    	}
	    	$(this).text(txt);
	    	$(this).attr('title', title);
	    });

	    var options = $('option', $dd);                    // Collect options         
	    options.detach().sort(function(a,b) {               // Detach from select, then Sort
	        var at = $(a).text();
	        var bt = $(b).text();         
	        return (at > bt)?1:((at < bt)?-1:0);            // Tell the sort function how to order
	    });
	    $dd.append(options); 

	    // set the selected value back
	    $dd.val(selectedVal);
	    
	    if($dd.is('[multiple]:not(:visible)')){
	    	$dd.multiselect('refresh');
	    }
	}
}
/////////////////////////////////////////
//         asyc Message display  	
/////////////////////////////////////////
var hideMessageTimeout;
// zeigt die message responseText an img kann false / true oder imgUrl sein, bei true wird anhand statusText img gewaehlt 
function showResponse(responseText, statusText, img) {
	// normale Nachricht oder Nachricht aus messDiv extrahieren ?	
	if(responseText.indexOf('<div class="messDiv">') >= 0) {
		responseText = responseText.slice(responseText.indexOf('<div class="messDiv">'));
		responseText = responseText.slice(0,responseText.indexOf('<table>'));
		responseText = responseText + '</div>';
		responseText = responseText.replace("'","\\'");		
	}
	if((!img || !(typeof img == 'string' || img instanceof String)) && statusText) {
		img = (statusText == 'success' ? './images/msg_ok.png' : (statusText == 'error' ? './images/msg_err.png' : './images/msg_inf.png' ) )
	}
	if(img){
		responseText = '<div class="messImg" style="background-image:url(\''+img+'\')"></div>' + responseText;
	}
		
	//falls keine messagebox vohanden eine bauen
	if($('#messagebox').length < 1)
		$('table.progTitle:first').after('<div id="messagebox"></div>');
	if($('#messagebox').length < 1)
		$('body').prepend('<div id="messagebox"></div>');
	$('#messagebox').children().remove();
	//damit nicht doppelt ausgef�hrt werden kann
	$('#messagebox').hide().stop(true);
	clearTimeout(hideMessageTimeout);
	$('#messagebox').html(responseText).fadeIn(500, function(){
		if($('.fixedHeaderWithButtons').length > 0)
			$('body').css('margin-top',$('.fixedHeaderWithButtons').outerHeight()+'px');
	});
	try{
		finishLoading();
	}catch(err){}
	$('#messagebox').on('click',     function(){$('#messagebox').hide();});
	$('#messagebox').on('click', '*',function(){$('#messagebox').hide();});
	$('#messagebox').dequeue();
	hideMessageTimeout = setTimeout(function(){
		$('#messagebox').fadeOut(500)
	},4000);
}

/////////////////////////////////////////
//Connect Wizard Stuff  	
/////////////////////////////////////////

function impRelation(servlet, newImage, newText, imgElement, successText){
	$.get(servlet,
		function(data){
			alert(data);
			if(data.indexOf(successText) >= 0){
				$(imgElement).attr('src', newImage);
				$(imgElement).attr('title', newText);
			}
		}
	);
}

//�bermittelt das form innerhald eines accordions an das action servlet mit den inhalten des formulars 
//und einer callback funktion f�r das ergebnis zur anzeige im header der form "error errortext" oder "success erfolgstext"
function submitMergeCal(){
	var columns = new Array();
	$('#sortable02 > li').each(
		function() {
			columns.push($(this).attr('val'));
		}
	);
	$('input[type=hidden][name=yearsown]').val(columns);
	columns = new Array();
	$('#sortable03 > li').each(
		function() {
			columns.push($(this).attr('val'));
		}
	);
	$('input[type=hidden][name=yearspartner]').val(columns);
	columns = new Array();
	$('#sortable06 > li').each(
			function() {
				columns.push($(this).attr('val'));
			}
	);
	$('input[type=hidden][name=termsown]').val(columns);
	columns = new Array();
	$('#sortable07 > li').each(
			function() {
				columns.push($(this).attr('val'));
			}
	);
	$('input[type=hidden][name=termspartner]').val(columns);
	
	var formData = $('form').serialize();
//	$.post($('form').attr('action')+'?'+formData+'&action='+$('.button').attr('name'),{},function(val){});
}

//zeigt ein formular in einem dialog an, form muss in ein div eingebettet sein mit entsprechendem title attribut
function showFormAsDialog(formId, cancelLabel, submitLabel){
	$("#"+formId).parent().dialog({
		modal: true,
		dialogClass: 'class_of_'+formId,
		buttons: [{
		    text: cancelLabel,
		    id: 'id_of_button_cancel_'+formId,
		    click: function() { $( this ).dialog( "close" ); }
		},{
			text: submitLabel, 
			id: 'id_of_button_submit_'+formId,
			click: function() { $('#'+formId).submit(); $( this ).dialog( "close" ); }
		}]
	});
}

function changeDownloadIconLinks(){
	$('#printall, #zipdownload, #pdfdownload, #pdfsInZip, #deleteUploadsFromDatabase').each(function(){
		if($(this).attr('href').indexOf('?match=') > 0)
			$(this).attr('href',$(this).attr('href').replace(/\?match=[^']*('?)/g,"?prog="+$(this).attr('id')+"$1")); 
	});
	$('#printall, #zipdownload, #pdfdownload, #pdfsInZip, #deleteUploadsFromDatabase ').click(function( event ) {
		var sendAll = false;
		var anzSelectedCheckboxes = 0;
		if(!$('input[type=\"checkbox\"][name^=\"upload_\"]:checked').length || $('input[type=\"checkbox\"][name^=\"upload_\"]:checked').length < 1)
			sendAll=true;
		// remove all hiddens in case of delete
		$('#deleteUploadsFromDatabaseDialog').find(":hidden").remove();
		$('#deleteUploadsFromDatabaseDialog').append('<input type=\"hidden\" name=\"prog\" value=\"deleteUploadsFromDatabase\"></input');
		
		$('input[type=\"checkbox\"][name^=\"upload_\"]').each(function(i) {
			if($('#zipdownload').size() > 0)
				$('#zipdownload').attr('href',$('#zipdownload').attr('href').replace('&dl[]='+$(this).val(),''));
			if($('#pdfsInZip').size() > 0)
				$('#pdfsInZip').attr('href',$('#pdfsInZip').attr('href').replace('&dl[]='+$(this).val(),''));
			if($('#pdfdownload').size() > 0)
				$('#pdfdownload').attr('href',$('#pdfdownload').attr('href').replace('&dl[]='+$(this).val(),''));
			if($('#printall').size() > 0)
				$('#printall').attr('href',$('#printall').attr('href').replace('&dl[]='+$(this).val(),''));
			
			if (sendAll || $(this).is(':checked')) {
				if($('#zipdownload').size() > 0)
					$('#zipdownload').attr('href',$('#zipdownload').attr('href')+'&dl[]='+$(this).val());
				if($('#pdfsInZip').size() > 0)
					$('#pdfsInZip').attr('href',$('#pdfsInZip').attr('href')+'&dl[]='+$(this).val());
				if($('#pdfdownload').size() > 0)
					$('#pdfdownload').attr('href',$('#pdfdownload').attr('href')+'&dl[]='+$(this).val());
				if($('#printall').size() > 0)
					$('#printall')   .attr('href',$('#printall')   .attr('href')+'&dl[]='+$(this).val());//.replace(/(\?[^']*)'/g,"$1&dl[]="+$(this).val()+"'"));
			}
			if (!sendAll && $(this).is(':checked'))
			{
				$('#deleteUploadsFromDatabaseDialog').append('<input type=\"hidden\" name=\"dl[]\" value=\"'+$(this).val()+'\"></input');
				anzSelectedCheckboxes += 1;
			}
		});
		// if no upload selected, then do not show dialog
		if(anzSelectedCheckboxes == 0)
		{
			$("#id_of_button_submit_deleteUploadsFromDatabaseDialog").hide();
			$("#delete_dialog_div_0").show();
			$("#delete_dialog_div_1").hide();
			$("#delete_dialog_div_n").hide();
		}
		// if 1 dataset was selected
		else if(anzSelectedCheckboxes == 1)
		{
			$("#delete_dialog_div_0").hide();
			$("#delete_dialog_div_n").hide();
			
			$("#delete_dialog_div_1").show();
			$("#delete_dialog_span_1").html(""+anzSelectedCheckboxes);
		}
		// n datasets
		else
		{
			$("#delete_dialog_div_0").hide();
			$("#delete_dialog_div_1").hide();
			$("#delete_dialog_div_n").show();
			$("#delete_dialog_span_n").html(""+anzSelectedCheckboxes);		
		}
		// set css
		$("#id_of_button_cancel_deleteUploadsFromDatabaseDialog").addClass('button');
		$("#id_of_button_submit_deleteUploadsFromDatabaseDialog").addClass('button');
		$(".class_of_deleteUploadsFromDatabaseDialog").css('width', 'auto');
		$("#id_of_button_cancel_deleteUploadsFromDatabaseDialog").blur();
	});
}

// run over all icons with class urlForSendAsPostByUsingOnlyURL and set sendLinkAsPost
$(document).ready(function() {
    setTimeout(function() {
    	$('.urlForSendAsPostByUsingOnlyURL').sendLinkAsPost();
    }, 1);
});

// einen link als post senden
$.fn.sendLinkAsPost = function() { 
	$(this).click(function(event){
		event.preventDefault();
		// alte Form entfernen
		if($('form#linkPostForm').length > 0)
		{
			$('form#linkPostForm').remove();
		}
		//ggf form erstellen
		if($('form#linkPostForm').length == 0){
			$('body').append('<form id=\"linkPostForm\" style=\"height:0px; width:0px;\" method=\"post\"></form>');	
		}
		var removedOnClickAttribute;
		var link = $(this).attr('href');
		if(!link || link == '#'){
			removedOnClickAttribute = $(this).attr('onClick');
			link = $(this).attr('onClick').replace("window.open('","").split("'")[0];
			$(this).removeAttr('onClick');
			$('#linkPostForm').attr('target','_blank');
		}
		var action = '';
		var query = '';
		if(link.indexOf('?') > 0){
			action = link.split('?')[0];
			query =  link.split('?')[1].split('&');
		}else{
			action = link;
		}
		$('#linkPostForm').attr('action',action).empty();
		$('#linkPostForm').append('<input type=\"hidden\" name=\"switchRequest\" value=\"fromPOSTtoGET\"></input');
		$.each(query, function(key,value){
			$('#linkPostForm').append('<input type=\"hidden\" name=\"'+value.split('=')[0]+'\" value=\"'+value.split('=')[1]+'\"></input');
		});
		$('#linkPostForm').submit();
		if(removedOnClickAttribute)
			$(this).attr('onClick', removedOnClickAttribute);
	});
	return $(this); 
}

  /**
   * Append a field to a form
   *
   */
  $.fn.appendField = function(data) {
    // for form only
    if (!this.is('form')) return;
    // wrap data
    if (!$.isArray(data) && data.name && data.value) {
      data = [data];
    }
    var $form = this;
    // attach new params
    $.each(data, function(i, item) {
      $('<input/>')
        .attr('type', 'hidden')
        .attr('name', item.name)
        .val(item.value).appendTo($form);
    });

    return $form;
  };

// EWP gsch
var actionMode = '';
function addEwpLinks(){
	$('.ewpFieldLink').click(function(){
		//links #TODO factsheets wesites usw
		if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($(this).prev('.ewpFieldData').data('href')) && actionMode !== 'insert'){
			$.ajax({
				url: "AppDataServlet?prog=ewpUpload&href="+encodeURIComponent($(this).prev('.ewpFieldData').data('href')), 
				success: function( data ){
					document.inputForm.readNew.value='1'; 
					document.inputForm.readCol.value=$(this).closest('tr').prevAll().find('input').last().attr('name'); 
					document.inputForm.manSubmit.value=true; 
					jQuery(inputForm).trigger('submit');
				},
				error: function( data ){
					switch(data.status){
					case 404:
						alert("Error: source not found!");
						break;
					case 403:
						alert("Error: forbidden!");
						break;
					case 500:
						alert("Error: internal Error!");
						break;
					}
				}
			});
		}
		//Selects
		else if($(this).closest('tr').prev('tr').find('select').size() > 0){
			$(this).closest('tr').prev('tr').find('select').find('option:contains("'+$(this).prev('.ewpFieldData').text()+'")').prop('selected', true); //select
			$(this).closest('tr').prev('tr').find('input.ui-autocomplete-input').val($(this).prev('.ewpFieldData').text()); //input bei autocomp dropdown
			$(this).closest('tr').prev('tr').find('select[multiple]').multiselect('refresh'); //multiselect
		}
		//inputs
		else{
			$(this).closest('tr').prevAll().find('input:visible,textarea:visible').last().val($(this).prev('.ewpFieldData').text());
			$('input.ErrorField:first').click();
		}
	});
	$('.ewpFieldData:not(.generalInfo):contains("http")').each(function(){
		$(this).qtip({
			content: $('<img class="ewpDataImage"  src="'+$(this).text()+'" />'),
			style: 'ewpToolTip'
		}); 
		$(this).data('href',$(this).text());
		$(this).text($(this).attr('oldtitle'));
	});
}

function clickAllEwpLinks(newActionMode){
	actionMode = newActionMode;
	$('.ewpFieldLink').each(function(){
		$(this).click();
	});
}

function setEwpIdForFurtherLinks(para,value){
	$('table.progSubTitle a[href]').each(function(){
		$(this).attr('href',$(this).attr('href').replace(new RegExp('\\?('+para+'=[^&]+&)?',"g"),'?'+para+'='+value+'&'));
	});
}

function initEwpEinzelZuord(dropLabel){
	$('.ewpRowsTable').prepend($("<thead class=\"progSubTitle\"></thead>").append($('.headerTable tbody tr').clone()));
	$('.ewpRowsTable thead tr td *:not(b)').remove();
	$('.ewpRowsTable tr td').css('cursor','move');
	
	$('.ewpSetIdIcon').hover(
		       function(){ $(this).addClass('hover') },
		       function(){ $(this).removeClass('hover')}
	).click(function(){ 
		//wenn direkt geklickt wurde dann danach neuen stammdatensatz anlegen damit
		if($(this).is('.hover')){
			setTimeout(function(){
				if($('.headerStammIcon').size() > 0){
					$('.headerStammIcon')[0].click();
				}else{
					$('.headerInsertIcon')[0].click();
				}
			},1);
		}
	});
	//wenn bereits eintraege dann da drauf droppen lassen
//	if($('.tableBbody td:not(:empty)').size() > 0){
		$('.ewpRowsTable tr').draggable({
			helper: function(event) {
				return $('<div class="drag-row ewpDragElement"><table class="ewpRowsTable dragTable"></table></div>').find('table').append($(event.target).closest('tr').clone()).end();
			},
			start: function() {
				$('#tablebody table tr table tr').each(function( index, value ) {
					  $(this).find('td[width$="%"]').first().append($('<div class="ewpDropTarget">'+dropLabel+'</div>').prepend($('.ewpPlaneIcon:first').clone()));
				});
			},
			stop: function() {
				$('.ewpDropTarget').remove();
			}
		});
		$('#tablebody table tr table tr').droppable({
			drop: function( event, ui ) {
				ui.draggable.find('.ewpSetIdIcon')[0].click();
				if($( this ).find('.stammIcon')[0])
					$( this ).find('.stammIcon')[0].click();
				else
					$( this ).find('.updateIcon')[0].click();
			},
			hoverClass: 'ewp-droppable-hover'
		});
//	}
}

function initEwpBuildForm(){
	if($(".ewpFieldData").size() > 0){
		$('.ewpFieldData').draggable({
			helper: function(event) {
				return $('<div class="ewpDragElement"></div>').append($(event.target).clone());
			}
		}).css('cursor','move');
		$('form[name="inputForm"] input[type="text"], form[name="inputForm"] textarea').droppable({
			drop: function( event, ui ) {
				$(this).val(
					($(this).val() 
					? $(this).val() + (
						$(this).is('input')
						?' '
						:'\n')
					:'') 
					+ ui.draggable.text()
				);
			},
			hoverClass: 'ewp-droppable-hover'
		});
	}
}

function resizeDisabledInputFields(){
	$('input[type=\"text\"]:disabled').each(function(){
		$(this).width($(this).textWidth()+($(this).textWidth()/3));
		if(!($(this).attr('size') && $(this).attr('size') < 12) && ($(this).width() > 50 || $(this).attr('size') >= 12)){
			$(this).css('min-width','150px').css('max-width','500px');
		}else{
			$(this).css('min-width','50px').css('max-width','500px');
		}
	});
	$('input.ui-autocomplete-input:disabled').each(function(){
//		$(this)
//		.css('min-width','132px')
//		.css('max-width','500px')
//		.width($(this).textWidth()+($(this).textWidth() / 3))
//		.closest('div.comboWrapper')
//			.css('width','auto')
//			.css('cssText','max-width: '+($(this).outerWidth()+20)+'px !important')
//			.css('display','inline-block');
		var width = $(this).closest('div.comboWrapper').prev('select').width();
		if(width && width < 60) {
			$(this)
			.css('min-width','42px' )
			.closest('div.comboWrapper')
				.css('width','60px')
				.css('display','inline-block');
		} else {
			$(this)
			.css('min-width','242px')
			.css('max-width','242px')
			.closest('div.comboWrapper')
				.css('cssText','max-width: 260px !important')
				.css('display','inline-block');
		}
	});
}

$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text() || $(this).attr('placeholder') || ' ').css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

function refreshRowForMassUpdate(fieldType, 
		urlForAjax, colName, pkName, pkId, isUseJsp,
		tableCellId, 
		selectorForCheckboxAtRow,
		spracheDateFormat,
		calendarDateFormatJDatebuilder,
		SOP_PARAM_NAME_DATE_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_DIGITS)
{
	// fieldType -> C=Combobox, D=Date, O=Other
	if(fieldType == 'C')
	{
		$("#allRows").on("change", 'select[name='+colName+'_'+pkId+']', function()
		//$('select[name='+colName+'_'+pkId+']').change(function()
		{
			internalRefreshRowForMassUpdate(this,
					urlForAjax, colName, pkName, pkId, isUseJsp,
					tableCellId, 
					selectorForCheckboxAtRow,
					spracheDateFormat,
					calendarDateFormatJDatebuilder,
					SOP_PARAM_NAME_DATE_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_DIGITS);
		});
	}
	else if(fieldType == 'D')
	{
		$("#allRows").on("change", '#'+colName+'_'+pkId, function()
		//$('#'+colName+'_'+pkId).change(function()
		{
			internalRefreshRowForMassUpdate(this,
					urlForAjax, colName, pkName, pkId, isUseJsp,
					tableCellId, 
					selectorForCheckboxAtRow,
					spracheDateFormat,
					calendarDateFormatJDatebuilder,
					SOP_PARAM_NAME_DATE_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_DIGITS);
		});
	}
	else
	{
		$("#allRows").on("blur", '#'+colName+'_'+pkId, function()
		//$('#'+colName+'_'+pkId).blur(function()
		{
			internalRefreshRowForMassUpdate(this,
					urlForAjax, colName, pkName, pkId, isUseJsp,
					tableCellId, 
					selectorForCheckboxAtRow,
					spracheDateFormat,
					calendarDateFormatJDatebuilder,
					SOP_PARAM_NAME_DATE_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_DIGITS);
		});
	}					
}

function internalRefreshRowForMassUpdate(element,
		urlForAjax, colName, pkName, pkId, isUseJsp,
		tableCellId, 
		selectorForCheckboxAtRow,
		spracheDateFormat,
		calendarDateFormatJDatebuilder,
		SOP_PARAM_NAME_DATE_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_TYPE, SOP_PARAM_NAME_DECIMAL_LANGUAGE_DIGITS)
{
	var newVal = $(element).val();
	var cssClass = $(element).parent().parent().attr('class');
	var siblingsLink = '';
	$(element).parent().siblings().each(function(index) 
	{
		var name = $(this).children(':first').attr('name');
		$(this).find("input[type='hidden']").each(function () 
		{
			if($(this).attr("name") === SOP_PARAM_NAME_DATE_LANGUAGE_TYPE 
					|| $(this).attr("name") === SOP_PARAM_NAME_DECIMAL_LANGUAGE_TYPE 
					|| $(this).attr("name") === SOP_PARAM_NAME_DECIMAL_LANGUAGE_DIGITS)
			{
				var tmpVal = $(this).val();
				var spec = tmpVal.substring(tmpVal.lastIndexOf('_'));
				tmpVal = tmpVal.substring(0, tmpVal.lastIndexOf('_'));
				tmpVal = tmpVal.substring(0, tmpVal.lastIndexOf('_'));
				tmpVal = tmpVal+spec;
				siblingsLink += '&'+$(this).attr("name")+'='+tmpVal;
			}
			else
				siblingsLink += '&'+$(this).attr("name")+'='+$(this).val();
		});							
		if (typeof name !== 'undefined' && name !== 'auswahl_id') 
		{
			name = name.substring(0, name.lastIndexOf('_'));
			if($(this).children(':first').attr('type') == 'checkbox')
			    siblingsLink += '&'+name+'='+$(this).children(':first').prop('checked');
			else
				siblingsLink += '&'+name+'='+$(this).children(':first').val();
		};
	});
	activateGlobalLoadingFrame();
	//urlForAjax = urlForAjax+"&readVal="+newVal+siblingsLink;
	siblingsLink += "&readVal="+newVal;
	if(isUseJsp == true)
	{
		$.ajax({
			dataType: "json",
			type: "POST",
			data: siblingsLink,
			cache: false,
			url:  urlForAjax
		})
			.done(function(data, textStatus, jqXHR) 
			{
				jQuery.each(data, function(key, val) 
				{
			        if(key == 'aaData')
			        {
			        	jQuery.each(val, function(colName, colValue)
			        	{
			        		// first check position of column by search headers
			        		// $('#allRows').DataTable().api()
			        		var tmpTable = $("#allRows").dataTable();
			        		var position = -1;
			        		tmpTable.api().columns().header().each( function ( headerCol, headerIndex ) 
			    			{
			    			    if(headerCol.id !== null && headerCol.id !== undefined  && headerCol.id === colName)
			    			    {
			    			    	position = headerIndex;
			    			    }
			    			});
			        		// column detected -> replace value
			        		if(position > -1)
			        		{
			        			var rowindex = tmpTable.api().row('#'+pkId).index();
			        			//alert("row="+rowindex+" col="+position+" data="+colValue);
			        			tmpTable.api().cell({row: rowindex, column: position}).data(colValue);			        			
			        			/*
			        			tmpTable.fnUpdate('allRows', parseInt(row), parseInt(col));
			        			
			        			var anNodes = $("#allRows tbody tr");
			    				var minOneIsChecked = false;
			    				for (var i = 0; i < anNodes.length; ++i)
			    				{
			    				    //var rowData = oTable.fnGetData( anNodes[i] );
			    				 	if($('#selectRow_'+anNodes[i].id).is(':checked'))
			    				 	{
			    				 		minOneIsChecked = true;
			    				 		break;
			    				 	}
			    				}
			    				*/
			        		}
			        	});
			        }
			    });			
				// run comboboxes
				$('#'+pkId + ' select:not([multiple])').combobox();    			
    			$('#'+pkId + ' div.comboWrapper').each( function ( i ) 
				{
					if($(this).parent().parent().hasClass('dataTables_length') === false)
					{
						$(this).css('width','100%');				
					}
					else
					{
						// set set position of scrolling top of input field
						$(this).find('input').autocomplete( "option", "position", { my : "left top", at: "left bottom", collision: "flip" } );;
				    }
					$(this).on( 'click', function (e) 
			    	{
						e.stopPropagation();
		            } );
				} );
    			// activate date fields
    			// date search fields
    			$('#'+pkId + ' input.date.massUpdatePerLine').each( function ( i )
    			{
    				$('#'+$(this).attr('id')).datepicker(
    					{
    						dateFormat: calendarDateFormatJDatebuilder, 
    						changeMonth: true, 
    						changeYear: true,  
    						showOn: 'button', 
    						buttonImage: 'images/invisible.png', 
    						buttonImageOnly: true, 
    						yearRange: '1850:2100', 
    						onClose: function() 
    						{
    							$(this).datepicker('widget').hide();
    						},
    						onSelect: function() 
    						{
    							$('#'+$(this).attr('id')).click();
    							$('#'+$(this).attr('id')).change();
    							$('#'+$(this).attr('id')).keyup();
    						}
    					},
    					$.datepicker.regional[spracheDateFormat]);
    			});
    			// activate textarea functionality
    			$('#'+pkId + ' textarea.massUpdatePerLine').each( function ( i )
    			{
    				$('#'+$(this).attr('id')).focus(function(){this.rows=5;}).blur(function(){this.rows=1;});
    			});
    			// mark row to submit later via checkbox
				$('#'+selectorForCheckboxAtRow+pkId).prop('checked', true);
			})
			.fail(function(jqXHR, textStatus, errorThrown) 
			{
			        alert('Ajax Error: ' + errorThrown);
			});
	}
	else
	{
		$.ajax({
			url:  urlForAjax
		})
			.done(function(data, textStatus, jqXHR) 
			{
				$('#'+tableCellId).parent().replaceWith('<tr class="'+cssClass+'">'+data+'</tr>');
				$('#'+selectorForCheckboxAtRow+pkId).prop('checked', true);
			})
			.fail(function(jqXHR, textStatus, errorThrown) 
			{
			        alert('Ajax Error: ' + errorThrown);
			});
	}
	deactivateGlobalLoadingFrame();
}

$.jsqueue = {
	    _timer: null,
	    _jsqueue: [],
	    add: function(fn, context, time) {
	        var setTimer = function(time) {
	            $.jsqueue._timer = setTimeout(function() {
	                time = $.jsqueue.add();
	                if ($.jsqueue._jsqueue.length) {
	                    setTimer(time);
	                }
	            }, time || 2);
	        }

	        if (fn) {
	            $.jsqueue._jsqueue.push([fn, context, time]);
	            if ($.jsqueue._jsqueue.length == 1) {
	                setTimer(time);
	            }
	            return;
	        }

	        var next = $.jsqueue._jsqueue.shift();
	        if (!next) {
	            return 0;
	        }
	        next[0].call(next[1] || window);
	        return next[2];
	    },
	    clear: function() {
	        clearTimeout($.jsqueue._timer);
	        $.jsqueue._jsqueue = [];
	    }
	};


// checkValidInput als AJAX aufrufen beim submit
function startCheckValidInputsAsDialog(formName)
{
	//alert('test1');
	var frm = $(document.forms[formName]);
	// validation done before?
	if(typeof ValidationErrors[frm.attr("id")] !== 'undefined' && ValidationErrors[frm.attr("id")].length > 0)
		return false;
	// already checked
	if($('#checkValidInputsAsDialogDone').val() === '1')
		return true;
	// still running
	if($('#checkValidInputsAsDialog').val() === '1')
		return false;
	if($('[name="readNew"]').length > 0 && $('[name="readNew"]').val() === '1')
		return true;
	//set hidden value for checking
	$('#checkValidInputsAsDialog').val('1');
	// send form	
	$.ajax({
       type: "POST",
       cache: false,
       async: false,
       url: frm.attr('action'),
       data: frm.serialize(), // serializes the form's elements.
       success: function (data) 
       {
       		//alert('success');
       		if(data[0].msg === '1')
       		{
	       		//alert('1');
	       		// set hidden value for checking
	       		$('#checkValidInputsAsDialogDone').val('1');
				$('#checkValidInputsAsDialog').val('0');
				frm.submit();
				return true;
			}
       		
       		var dialogId = 'ownCheckValidInputsDialog';
        	var title = data[0].title;
        	var text = 'text';
        	
        	var submitLabel = 'subButton';
        	
        	var buttonsForDialog = [];
			buttonsForDialog.push(
				{
        			    text: data[0].cancelLabel,
        			    id: 'id_of_button_cancel_'+dialogId,
        			    click: function() {
        			    	$('#checkValidInputsAsDialogDone').val('0');
        			    	$('#checkValidInputsAsDialog').val('0');
        			    	$( this ).dialog( "close" ); 
        			    }
        		}
			);
        	
        	// info msg
			if(typeof data[0].info !== 'undefined' && data[0].info !== '')
			{
				// get values
				text = data[0].info;
				// add button
				buttonsForDialog.push(
					{
	        			    text: data[0].submitLabel,
	        			    id: 'id_of_button_submit_'+dialogId,
	        			    click: function() { 
	        			    	$('#checkValidInputsAsDialogDone').val('1');
	        			    	$('#checkValidInputsAsDialog').val('0');
	        			    	frm.submit(); 
	        					$(this).dialog("close");
	        			    }
	        		}
				);
			}
			// error
			else
			{
				// set hidden value for checking
	       		$('#checkValidInputsAsDialogDone').val('0');
				$('#checkValidInputsAsDialog').val('0');
				// get values
				text = data[0].msg;
			}
			
        	
        	$("#"+dialogId, parent.document).text(text);
        	$("#"+dialogId, parent.document).dialog({
        		modal: true,
        		dialogClass: 'class_of_'+dialogId,
        		width: 'auto',
        		title: title,
        		create: function( event, ui ) {
        		    // Set maxWidth
        		    $(this).css("maxWidth", "500px");
        		},
        		buttons: buttonsForDialog ,
        		close: function() {
        			// close icon -> set hidden parameters to zero
                    if($(event.target || event.srcElement).hasClass('ui-icon-closethick'))
                    {
                    	$('#checkValidInputsAsDialogDone').val('0');
        			    $('#checkValidInputsAsDialog').val('0');
                    }
              	}       		       		
        	});
        	
			$('button')
				.addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only button')
				.hover(
					function () { $(this).addClass('ui-state-hover'); }, 
					function () { $(this).removeClass('ui-state-hover'); }
				).each(function(){
					if($(this).find('span').size() == 0)
						$(this).html('<span class="ui-button-text">'+$(this).html()+'</span>');
				});
			
			$('button.ui-dialog-titlebar-close')
				.addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close')
				.html('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">Close</span>');
	            
       		
       		
       },
       error: function (data) 
       {
    	   	deactivateGlobalLoadingFrame();
    	   	// show error
    	   	alert('error');
       }
     });
	return false;
}
