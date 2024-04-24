//-----------------------------------------------------------------------------------------------
// (c) G. Mauberger EDV-Dienstleistungen (2002)
//-----------------------------------------------------------------------------------------------
// Projekt     : Nationalagentur Sokrates
// Programm    : orionScript.js 
// Autor       : Mauberger Gerald
// Datum       : 2002-10-29
// Beschreibung: Diverse JavaScripts (z.B. f�r Feldpr�fung usw.)
//-----------------------------------------------------------------------------------------------
var reWhiteSpace = /^\s+$/;
var reInteger = /^\d+$/;

var BETRAG_GROUP_SEP = ".";
var BETRAG_GROUP_SEP_EN = ",";
var BETRAG_GROUP_SEP_SE = ",";
var BETRAG_DECIMAL_SEP = ",";
var BETRAG_DECIMAL_SEP_EN = ".";
var BETRAG_DECIMAL_SEP_SE = ".";
var BETRAG_SPLIT_DEC = /\,/;
var BETRAG_SPLIT_DEC_EN = /\./;
var BETRAG_SPLIT_DEC_SE = /\./;
var BETRAG_SPLIT_GROUP = /\./;
var BETRAG_SPLIT_GROUP_EN = /\,/;
var BETRAG_SPLIT_GROUP_SE = /\,/;

var VALID_BETRAG_CHARS = VALID_NUMBERS + ".,-";
var VALID_BETRAG_PATTERNS= new Array();
var VALID_BETRAG_PATTERNS_EN= new Array();
var VALID_NUMBERS="0123456789";
var VALID_NUMBER_PATTERNS= new Array();
var BETRAG_ERROR_MSG="Eingegebener Betrag ist ung�ltig!!!";
var BETRAG_TOO_BIG="Eingegebener Betrag ist zu gro�!!!";
var FIELD_NOT_EMPTY="Feld darf nicht leer sein!!!";
var INPUT_NOT_ALLOWED="Eingegebener Wert ist nicht erlaubt!!!";
var NUMBER_ERROR_MSG="Es d�rfen nur Ziffern eingegeben werden!!!";
var DATE_ERROR_MSG="Eingegebenes Datum ist ung�ltig!!!";
var PASSW_ERROR_MSG="Passworteingabe stimmt nicht �berein!!!";
var INVALID_EMAIL_ADR="Ung�ltige E-Mail-Adresse! �berpr�fen Sie die korrekte Schreibweise (z.B. max.mustermann@universitaet.at)";

var DATE_DEFAULT_SEP = ".";
var DATE_DEFAULT_SEP_EN = "/";
var DATE_DEFAULT_SEP_US = "-";
var DATE_DEFAULT_SEP_GL = "/";
var DATE_DEFAULT_SEP_SE = "-";
var DATE_SPLIT = /[\-\/\.\,\*\+\ ]/;
var VALID_DATE_CHARS = VALID_NUMBERS + "-/.,*+ ";
var VALID_DATE_PATTERNS = new Array();
var VALID_DATE_PATTERNS_WITH_SEARCH = new Array();

var noresub = false;

initBetragInputChecks();
initNumberInputChecks();
initDateInputChecks();
/**
 * Pr�ft ob das Ende eines Strings bestimten String entspricht
 */
function endsWith(formName,fieldName,wert,message)
{
  var val = document.forms[formName].elements[fieldName].value;
  var endung = val.substring(val.length-3,val.length);
  if (endung.toUpperCase() == wert.toUpperCase()) return true;
  alert(message);
  return false;
}
/*
 * �ndert das Style eines Men�eintrages
 */
function highlight(e)
{
  clearAll(e);
  var r = e.parentElement.parentElement.parentElement;
  r.className = "tdhighlight";
}
/*
 * �ndert das Style eines Men�eintrages wenn das Neuanlegensymbol geklickt wird
 */
function highlightPic(e)
{
  clearAllPic(e);
  var r = e.parentElement.parentElement;
  r.className = "tdhighlight";
}
/*
 * L�scht alle Markierungen
 */
function clearAll(e) 
{
  var tabelle = e.parentElement.parentElement.parentElement.parentElement;
  var counter = tabelle.childNodes.length;
  var td;
  for(var i = 0; i < counter; i++) {
    td = tabelle.childNodes[i];
    td.className = "mainLeftMenu";
  }
}
/*
 * L�scht alle Markierungen, wenn das Bild geklickt wird
 */
function clearAllPic(e) 
{
  var tabelle = e.parentElement.parentElement.parentElement;
  var counter = tabelle.childNodes.length;

  var td;
  for(var i = 0; i < counter; i++) {
    td = tabelle.childNodes[i];

    td.className = "mainLeftMenu";
  }
}

function initNumberInputChecks()
{
	VALID_NUMBER_PATTERNS[0] = /^[+-]?[1-9]+\d+$/;
	VALID_NUMBER_PATTERNS[1] = /^[+]?\d$/;
}

function initBetragInputChecks()
{
	VALID_BETRAG_PATTERNS[0] = /^[+-]?[1-9]+\d+$/;
	VALID_BETRAG_PATTERNS[1] = /^[+-]?\d$/;
	VALID_BETRAG_PATTERNS[2] = /^[+-]?[1-9]+\d?\d?(\.\d\d\d)+$/;
	VALID_BETRAG_PATTERNS[3] = /^[+-]?[1-9]+\d*,\d\d?$/;
	VALID_BETRAG_PATTERNS[4] = /^[+-]?0,\d\d?$/;
	VALID_BETRAG_PATTERNS[5] = /^[+-]?[1-9]+\d?\d?(\.\d\d\d)+,\d\d?$/;
	VALID_BETRAG_PATTERNS[6] = /^[+-]?[1-9]+\d*,\d\d\d?$/;
	VALID_BETRAG_PATTERNS[7] = /^[+-]?0,\d\d\d?$/;
	VALID_BETRAG_PATTERNS[8] = /^[+-]?[1-9]+\d?\d?(\.\d\d\d)+,\d\d\d?$/;
	VALID_BETRAG_PATTERNS[9] = /^[+-]?[1-9]+\d*,\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS[10] = /^[+-]?[1-9]+\d*,\d\d\d\d\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS[11] = /^[+-]?0,\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS[12] = /^[+-]?0,\d\d\d\d\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS[13] = /^[+-]?[1-9]+\d?\d?(\.\d\d\d)+,\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS[14] = /^[+-]?[1-9]+\d*(\.\d\d\d)*\,\d{1,8}$/;

	VALID_BETRAG_PATTERNS_EN[0] = /^[+-]?[1-9]+\d+$/;
	VALID_BETRAG_PATTERNS_EN[1] = /^[+-]?\d$/;
	VALID_BETRAG_PATTERNS_EN[2] = /^[+-]?[1-9]+\d?\d?(\,\d\d\d)+$/;
	VALID_BETRAG_PATTERNS_EN[3] = /^[+-]?[1-9]+\d*\.\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[4] = /^[+-]?0.\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[5] = /^[+-]?[1-9]+\d?\d?(\,\d\d\d)+\.\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[6] = /^[+-]?[1-9]+\d*.\d\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[7] = /^[+-]?0.\d\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[8] = /^[+-]?[1-9]+\d?\d?(\,\d\d\d)+\.\d\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[9] = /^[+-]?[1-9]+\d*.\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[10] = /^[+-]?[1-9]+\d*.\d\d\d\d\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[11] = /^[+-]?0.\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[12] = /^[+-]?0.\d\d\d\d\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[13] = /^[+-]?[1-9]+\d?\d?(\,\d\d\d)+\.\d\d\d\d?$/;
	VALID_BETRAG_PATTERNS_EN[14] = /^[+-]?[1-9]+\d*(\,\d\d\d)*\.\d{1,8}$/;
}

function initDateInputChecks()
{
	VALID_DATE_PATTERNS[0] = /^\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d?$/;
	VALID_DATE_PATTERNS[1] = /^\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d\d\d$/;
	VALID_DATE_PATTERNS[2] = /^\d\d\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d?$/;
	VALID_DATE_PATTERNS[3] = /^\d\d\d\d\d\d$/;
	VALID_DATE_PATTERNS[4] = /^\d\d\d\d\d\d\d\d$/;
	
	VALID_DATE_PATTERNS_WITH_SEARCH[0] = /^\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d?$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[1] = /^\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d\d\d$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[2] = /^\d\d\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d?$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[3] = /^\d\d\d\d\d\d$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[4] = /^\d\d\d\d\d\d\d\d$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[5] = /^[\>\<\>=\<=]+\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d?$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[6] = /^[\>\<\>=\<=]+\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d\d\d$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[7] = /^[\>\<\>=\<=]+\d\d\d\d?[\-\/\.\,\*\+\ ]+\d\d?[\-\/\.\,\*\+\ ]+\d\d?$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[8] = /^[\>\<\>=\<=]+\d\d\d\d\d\d$/;
	VALID_DATE_PATTERNS_WITH_SEARCH[9] = /^[\>\<\>=\<=]+\d\d\d\d\d\d\d\d$/;
}

function releaseConnection(theURL)
{
	if(theURL != null)
		window.open(theURL);
}

function startServlet(theURL)
{
	if(theURL != null)
		window.open(theURL);
}

function printTable()
{
	print();
}

function goBack()
{
	try{
		var url = window.location.href;
		url = url.substr(0, url.lastIndexOf("/")) + '/AppDataServlet?prog=backurlifpost';
		//schreibt selbst einen back eintrag anscheinend deswegen dann -2
		$.get(url,
				function(data){
					if(data.length > 2)
						self.location = data;
					else
						history.back();
				}
		).fail(	function(){
					history.back();
				}
		);
	}catch(ex){
		history.back();
	}
}
var closeMsg = 'Your browser does not allow the closing of this window, please close it manually.';

function goToURL(urlRef, target, formName, fieldName)
{
	// alert("goToURL.urlRef="+urlRef+" target="+target+" formName="+formName+"
	// fieldName="+fieldName);
	if(formName != null && fieldName != null)
	{
		var wert = getValue(formName,fieldName);
		urlRef+="&"+fieldName+"="+encodeURIComponent(wert);
	}
	if(urlRef == 'close') 
	{		
		if(jQuery){
			try{
				if($('body').attr('onunload')){
					var unl = $('body').attr('onunload');
					$('body').attr('onunload','')
					eval(unl);
				}
			}catch(e){}
		}
		var win = window.open('', '_self');
		win.close();
		win = window.open('','_parent',''); 
		win.close();
		close();
		setTimeout(function(){
			alert(closeMsg);		
		},300);
		return false;
	} 
	else if(urlRef == 'back') goBack();
	else if(urlRef == 'backback') history.go(-2);
	else if(target != null && target == '_top') 
	{
		top.location.href = urlRef;
	} 
  else if (target != null && target != '')
	{
		Frame1=eval("parent."+target);
		Frame1.location.href = urlRef;
	}
	else 
	{
		if(jQuery && jQuery('#offCanvasMenu').size() > 0 && urlRef.indexOf('empty.htm') > 0){
			if(rootURL)
				self.location = rootURL;
			else
				goBack();
		} else {
			self.location = urlRef;
		}
	}
}
function goToURLWithAddedFields(urlRef, target, formName, fieldNames)
{
	// alert("goToURL.urlRef="+urlRef+" target="+target+" formName="+formName+"
	// fieldName="+fieldName);
	if(formName != null && fieldNames != null)
	{
		for(var i = 0; i < fieldNames.length; i++)
		{
			var wert = getValue(formName,fieldNames[i]);
			// alert("field="+fieldNames[i]+"="+wert);
			urlRef+="&"+fieldNames[i]+"="+wert;
		}		
	}
	if(urlRef == 'close') 
	{		
		if(jQuery){
			if($('body').attr('onunload'))
				eval($('body').attr('onunload'));
		}
		var win = window.open('', '_self');
		win.close();
		return false;
	} 
	else if(urlRef == 'back') 
	{
		goBack();
	} 
	else if(target != null && target == '_top') 
	{
		top.location.href = urlRef;
	} 
  else if (target != null && target != '')
	{
		Frame1=eval("parent."+target);
		Frame1.location.href = urlRef;
	}
	else 
	{
		self.location = urlRef;
	}
}
function closeApplication(urlRef,withTimeout,timeout)
{
	// alert("goToURL.urlRef="+urlRef+" withTimeout="+withTimeout+"
	// timeout="+timeout);
	if(document.forms.length == 0 || (document.inputForm.readNew.value!='1' && document.inputForm.readCol.value!='sprache'))
	{
		self.location = urlRef;
		if(withTimeout)
		{
			var then,now; then=new Date().getTime();
			now=then;
			while((now-then)<timeout)
			{
				now=new Date().getTime();
			}
		}
	}
}
function openTwoFrames(URI1,F1,URI2,F2)
{
  Frame1=eval("parent."+F1);
  Frame2=eval("parent."+F2);
  Frame1.location.href = URI1;
  Frame2.location.href = URI2;
}

function redirectToStart()
{
	if (top.location == self.location)
	{
    	top.location = '/verwaltung/servlet/StartServlet';
	}

}

function checkReferrer()
{
	/*
	 * var from = document.referrer;
	 * 
	 * if(from == null) { alert("Invalid referrer!") } goBack();
	 */
}

function dispHelp(helpText)
{
	window.status=helpText;
}

function checkField(e,formName,fieldName,wert)
{
if(e)
	{
	if(isEmpty(wert))
		{
		alert(FIELD_NOT_EMPTY);
		setFocus(formName,fieldName);
		return false;
		}
	}
}

function setFocus(formName,fieldName)
{
	// if(document.forms[formName].elements[fieldName] &&
	// document.forms[formName].elements[fieldName].focus)
	if(document.forms[formName] && document.forms[formName].elements[fieldName])
		if($('input[type="radio"][name='+fieldName+']').length > 0)
			document.forms[formName].elements[fieldName][0].focus();
		else if($('input[name='+fieldName+']:not(.hasDatepicker)').length > 0)
			try{$('input[name='+fieldName+']:not(.hasDatepicker)').focus();}catch(exp){}
		else if($('input.hasDatepicker[name='+fieldName+']').length > 0)
			try{$(':input:eq(' + ($(':input').index($('input.hasDatepicker[name='+fieldName+']')[0]) + 1) + ')').focus();}catch(exp){}
}

function isEmpty(wert)
{
	return ((wert == null) || (wert.length == 0))
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen, ob Feld min/max Wert unter-/�berschreitet
// ---------------------------------------------------------------------------------------------//
function checkMinValue(formName,fieldName,wert,message,minValue)
{
	// alert("wert = "+wert);
	if(!isEmpty(wert))
	{
		if(wert < minValue)
		{
			alert(message);
			setFocus(formName,fieldName);
			return false;
		}
	}
	return true;
}
function checkMaxValue(formName,fieldName,wert,message,maxValue)
{
	if(!isEmpty(wert))
	{
		if(wert > maxValue)
		{
			alert(message);
			setFocus(formName,fieldName);
			return false;
		}
	}
	return true;
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen, ob Feld eingegeben wurde
// ---------------------------------------------------------------------------------------------//
function checkNotEmpty(formName,fieldName,wert,message)
{
  // alert("formName="+formName+" fieldName="+fieldName+" wert="+wert);
  if(jQuery){
	  if(jQuery('[name="'+fieldName+'"]').val())
		  return true;
	  else if($('#' + fieldName).val())
		  return true;
	  else{
		  if(message) alert(message);
		  setFocus(formName,fieldName);
		  return false;
	  }
  }else{
  if(isEmpty(wert))
	{
	    if(message) alert(message);
		setFocus(formName,fieldName);
		return false;
	}
	return true;
  }
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen, ob mind. 1 Feld von Array fieldNames ausgefuellt ist
// ---------------------------------------------------------------------------------------------//
function checkMinimalOneInputFieldNotEmpty(formName,fieldNames,message)
{
	// alert("fieldNames="+fieldNames);
	var oneFieldFulfilled = 0;
	for(var i = 0; i < fieldNames.length; i++)
	{
		var wert = getValue(formName,fieldNames[i]);
		// alert("field="+fieldNames[i]+"="+wert);
		if(isEmpty(wert) == false)
		{
			oneFieldFulfilled = 1;
			break;
		}
	}
	if(oneFieldFulfilled == 1)
		return true;
	else
	{
		alert(message);
		return false;
	}
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen, ob Datei-Feld mit bestimmter Endung eingegeben wurde
// ---------------------------------------------------------------------------------------------//
function checkFileNotEmptyWithMultipleFileEnd(formName,fieldName,wert,message,multipleFileEnd,emptyAllowed)
{
	// alert("checkFileNotEmptyWithMultipleFileEnd value = "+wert+" ->
	// multipleFileEnd = "+multipleFileEnd+" length = "+multipleFileEnd.length);
	var detected = 0;
	for(var i = 0; i < multipleFileEnd.length; i++)
	{
		if(internalCheckFileNotEmptyWithFileEnd(formName,fieldName,wert,message,multipleFileEnd[i],emptyAllowed,0) == true)
		{
			// alert("detected = true");
			detected = 1;
			break;
		}
		// else
		// alert("detected = false");
	}
	if(detected == 1)
		return true;
	else
	{
		alert(message+" = "+multipleFileEnd);
		setFocus(formName,fieldName);
		return false;
	}
}
function checkFileNotEmptyWithFileEnd(formName,fieldName,wert,message,fileEnd,emptyAllowed)
{
	return internalCheckFileNotEmptyWithFileEnd(formName,fieldName,wert,message,fileEnd,emptyAllowed,1);
}
function internalCheckFileNotEmptyWithFileEnd(formName,fieldName,wert,message,fileEnd,emptyAllowed,giveMessage)
{
	// alert("formName="+formName+" fieldName="+fieldName+" wert="+wert+"
	// fileEnd="+fileEnd+" emptyAllowed="+emptyAllowed);
	// Auf Empty pr�fen
	if(isEmpty(wert))
	{
		if(emptyAllowed == "0")
		{
			if(giveMessage == 1)
			{
				alert(message);
				setFocus(formName,fieldName);
			}
			return false;
		}
		else
		  return true;
	}
	// Nur den Dateinamen abschneiden
	// alert("wert vorher ="+wert);
	if(wert.indexOf("\\") > 0)
	{
	  wert = wert.substring(wert.lastIndexOf("\\")+1);
	  // alert("wert \ nachher="+wert);
	}
	else if(wert.indexOf("/") > 0)
	{
	  wert = wert.substring(wert.lastIndexOf("/")+1);
	  // alert("wert / nachher="+wert);
	}
	// Die einzelnen Zeichen durchlaufen
	var anzPunkte = 0;
	var punktPosition = 0;
	for(var i=0; i<wert.length; i++) 
	{
	  // alert(i+" -> "+wert+" -> code = "+wert.charCodeAt(i)+ " ->
		// "+wert.charAt(i));
	  // Alle Zeichen ausserhalb von ASCII Normal Code als Fehler werfen,
		// ausser Unterschrich und Punkt
	  var ascii = wert.charCodeAt(i);
	  if((ascii >= 65 && ascii <= 90)           // Buchstaben A - Z
			  || (ascii >= 97 && ascii <= 122)  // Buchstaben a - z
			  || (ascii >= 48 && ascii <= 57)   // Zahlen 0 - 9
			  || ascii == 95)                    // Unterstrich
			  // || ascii == 92 // \ f�r Pfad
			  // || ascii == 47 // / f�r Pfad
			  // || ascii == 58) // Doppelpunkt f�r Pfad
		continue;
	  else if(ascii == 46) // Punkt
	  {
		anzPunkte = anzPunkte + 1;
		punktPosition = i;
	    continue;
	  }
	  // Fehler
	  else
	  {
		// alert("Falsches Zeichen = "+wert.charCodeAt(i)+" "+wert.charAt(i));
		if(giveMessage == 1)
		{
			alert(message+" = "+wert.charAt(i));
			setFocus(formName,fieldName);
		}
		return false;
	  }
	}
	// Falls mehr als einen Punkt verwendet, dann auch Fehler
	if(anzPunkte != 1)
	{
		if(giveMessage == 1)
		{
			alert(message);
			setFocus(formName,fieldName);
		}
		return false;
	}
	// Dateiendung pr�fen
	if(!isEmpty(fileEnd))
	{
		var thisFileEnd = wert.substring(punktPosition+1);
		// alert("wert="+wert+" thisFileEnd="+thisFileEnd+" bei
		// punktPosition="+punktPosition);
		// alert("thisFileEnd="+thisFileEnd+" length="+thisFileEnd.length+" und
		// fileEnd="+fileEnd+" length="+fileEnd.length);
		if(thisFileEnd.toUpperCase() != fileEnd.toUpperCase())
		{
			if(giveMessage == 1)
			{
				// alert("giveMessage=1");
				alert(message);
				setFocus(formName,fieldName);
			}
			// else
			// alert("giveMessage=0");
			return false;
		}
	}
	return true;
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen, ob Auswahl aus Select-Box
// ---------------------------------------------------------------------------------------------//
function checkSelected(field,formName,fieldName,message)
{
	// alert("fieldName="+fieldName);
	if((window.jQuery && $(field).length > 0 && !$(field).val()) || (!window.jQuery && field.options[0].selected))
	{
		alert(message);
		setFocus(formName,fieldName);
		return false;
	}
	else
		return true;
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen, ob Feld angehackt wurde
// ---------------------------------------------------------------------------------------------//
function notChecked(field,message)
{
	// Mehrere
	if(field.length != null && field.length > 1)
	{
		var i = 0;
		for (i = 0; i < field.length; i++)
		{
			if (field[i].checked) return false;
		}
		alert(message);
		field[0].focus();
	}
	// nur 1er
	else if(field.length == null)
	{
		if(field.checked)
			return false;
		alert(message);
		field.focus();
	}
	return true;
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen, ob Felder angehackt wurde
// ---------------------------------------------------------------------------------------------//
function notCheckedCheckBoxes(field,message)
{
	var i = 0;
	for (i = 0; i < field.length; i++)
	{
		if (field[i] && field[i].checked) return false;
	}
	if(message) alert(message);
	// field[0].focus();
	return true;
}
function activateAllCheckboxesOfArray(fields)
{
	var i = 0;
	for(i = 0; i < fields.length; i++)
	{
		fields[i].checked = true;
	}
}
function deactivateAllCheckboxesOfArray(fields)
{
	var i = 0;
	for(i = 0; i < fields.length; i++)
	{
		fields[i].checked = false;
	}
}
function activateDeactivateAllCheckboxesWithClassname(className, selectAll)
{
	$("."+className).each(function() 
	{
		if(selectAll)
			this.checked = true;
		else
			this.checked = false;
	});
}
function activateAllCheckboxesByCheckboxValueArray(field, fieldValues)
{
	if(fieldValues.length == 1 && fieldValues[0] == 'all'){
		$('input[type="checkbox"]:visible').prop('checked', true);
		return;
	}
	var i = 0;
	for(i = 0; i < field.length; i++)
	{
		var j = 0;
		var pos = -1;
		for(j = 0; j < fieldValues.length; j++)
		{
			if(field[i].value == fieldValues[j])
			{
				pos = j;
				break;
			}
		}
		if(pos > -1)
			field[i].checked = true;
	}
}
function deactivateAllCheckboxesByCheckboxValueArray(field, fieldValues)
{
	if(fieldValues.length == 1 && fieldValues[0] == 'all'){
		$('input[type="checkbox"]:visible').prop('checked', false);
		return;
	}
	var i = 0;
	for(i = 0; i < field.length; i++)
	{
		var j = 0;
		var pos = -1;
		for(j = 0; j < fieldValues.length; j++)
		{
			if(field[i].value == fieldValues[j])
			{
				pos = j;
				break;
			}
		}
		if(pos > -1)
			field[i].checked = false;
	}
}
function activateAllCheckboxes(field)
{
	var i = 0;
	for(i = 0; i < field.length; i++)
	{
		field[i].checked = true;
	}
}
function deactivateAllCheckboxes(field)
{
	var i = 0;
	for(i = 0; i < field.length; i++)
	{
		field[i].checked = false;
	}
}
// ---------------------------------------------------------------------------------------------//
// Ermitteln Wert aus einem beliebigen Dokument und Feld
// ---------------------------------------------------------------------------------------------//
function getValue(formName,fieldName)
{
	// alert("formName = "+formName+", fieldName = "+fieldName+" !!!");
	var ret;
	if(document.forms[formName] && document.forms[formName].elements[fieldName])
		ret = document.forms[formName].elements[fieldName].value;
	if(!ret)
		ret = $('[name="'+fieldName+'"]').val();
	return ret;
}
// ---------------------------------------------------------------------------------------------//
// setzen eines Wertes in einem beliebigen Dokument und Feld
// ---------------------------------------------------------------------------------------------//
function setValue(formName,fieldName,wert)
{
	document.forms[formName].elements[fieldName].value=wert;
}
// ---------------------------------------------------------------------------------------------//
// Umwandeln Decimal-Felder mit Punkt und Komma in eine Zahl ohne Interpunktion
// ---------------------------------------------------------------------------------------------//
function getNumberIgnoreComma(wert)
{
	var wertNeu = '';
	var i = 0;
	for (i = 0; i < wert.length; i++)
	{
		if (wert.charAt(i) >= '0' && wert.charAt(i) <= '9' || wert.charAt(i) == '-')
		{
			wertNeu = wertNeu + wert.charAt(i);
		}
	}
	if (wertNeu.length > 0) return parseFloat(wertNeu); return 0;
}
// ---------------------------------------------------------------------------------------------//
// Umwandeln einer Eingabe in UPSHIFT
// ---------------------------------------------------------------------------------------------//
function upshift_onBlur(field)
{
	var upshiftValue = field.value;
	field.value = upshiftValue.toUpperCase();
	return;
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen Betragsfelder beim Verlassen
// ---------------------------------------------------------------------------------------------//
// Das Feld mit nachkomma-stellen �berpr�fen inkl. den entsprechenden
// Fehlermeldungen
function betragWithNachkomma_onBlur(field, maxchars, nachkomma, okayMethod)
{
	if (field.value == '') return false;
	if (betrag_isValid(field) == false)
	{
		alert(BETRAG_ERROR_MSG);
		field.value = "";
		field.focus();
		return false;
	}
	formatBetrag(field, nachkomma);
	if (okayMethod != null) { okayMethod(); }
	if(maxchars != -1 && field.value.length > maxchars)
	{
		alert(BETRAG_TOO_BIG);
		field.value = "";
		field.focus();
		return false;
	}
	return true;
}
// Das Feld selbst �berpr�fen, ohne nackomma-stellen, jedoch mit Fehlermeldung
function betrag_onBlur(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	formatBetrag(field,2);
	return true;
}
function betrag_onBlur_4(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	formatBetrag(field,4);
	return true;
}
function betrag_onBlur_8(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	formatBetrag(field,8);
	return true;
}
function betrag_onBlur_en(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid_en(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}	
	formatBetrag_en(field,2);
	return true;
}
function betrag_onBlur_4_en(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid_en(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}	
	formatBetrag_en(field,4);
	return true;
}
function betrag_onBlur_8_en(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid_en(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}	
	formatBetrag_en(field,8);
	return true;
}
function betrag_onBlur_se(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid_se(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	formatBetrag_en(field,2);
	return true;
}
function betrag_onBlur_4_se(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid_se(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	formatBetrag_en(field,4);
	return true;
}
function betrag_onBlur_8_se(field, errorMsg)
{
	if (field.value == '') return true;
	if (betrag_isValid_en(field) == false)
	{
	  if(errorMsg == null)
			alert(BETRAG_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}	
	formatBetrag_en(field,8);
	return true;
}
// ---------------------------------------------------------------------------------------------//
// Pr�fen, ob eingegebener Wert erlaubt ist
// ---------------------------------------------------------------------------------------------//
function checkAllowed(formName,fieldName,wert,message,v1,v2,v3,v4,v5)
{
	// alert("form="+formName+" field="+fieldName+" wert="+wert+" v1="+v1+"
	// v2="+v2);
	if(wert == v1) return true;
	if(wert == v2) return true;
	if(wert == v3) return true;
	if(wert == v4) return true;
	if(wert == v5) return true;

	alert(message);
	setFocus(formName,fieldName);
	return false;
}
// ---------------------------------------------------------------------------------------------//
// Pr�fen, ob Datum-von/bis richtig ist
// ---------------------------------------------------------------------------------------------//
function datumVonBisOk(formName,fieldName,datum1,datum2,message)
{
	// 27.12.2021, SB -> falls von und bis null, und das Feld nullable, dann natürlich nicht prüfen (class=nullable)
	if(isNullOrZero(datum1) && isNullOrZero(datum2)
			&& $('input[name="'+fieldName+'"]').length > 0
			&& $('input[name="'+fieldName+'"]').hasClass('nullable'))
		return true;
	
	dat1 = getDateObject(datum1);
	dat2 = getDateObject(datum2);
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumVonBisOk_en(formName,fieldName,datum1,datum2,message)
{
	// alert("datumVonBisOk_en: datum1="+datum1+", datum2="+datum2);
	// 27.12.2021, SB -> falls von und bis null, und das Feld nullable, dann natürlich nicht prüfen (class=nullable)
	if(isNullOrZero(datum1) && isNullOrZero(datum2)
			&& $('input[name="'+fieldName+'"]').length > 0
			&& $('input[name="'+fieldName+'"]').hasClass('nullable'))
		return true;
	
	
	var allowedSearchCharacters;
	
	// von
	var parts1 = date_getParts_ByValue(datum1,allowedSearchCharacters);	
	// alert("datumVonBisOk_en: parts1="+parts1);
	dat1 = getDateObjectByValues(parts1[0], parts1[1], parts1[2]);
	// alert("datumVonBisOk_en: parts1="+parts1+", asDate="+dat1);
	// bis
	var parts2 = date_getParts_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[0], parts2[1], parts2[2]);
	// pruefen
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumVonBisOk_us(formName,fieldName,datum1,datum2,message)
{
	// 27.12.2021, SB -> falls von und bis null, und das Feld nullable, dann natürlich nicht prüfen (class=nullable)
	if(isNullOrZero(datum1) && isNullOrZero(datum2)
			&& $('input[name="'+fieldName+'"]').length > 0
			&& $('input[name="'+fieldName+'"]').hasClass('nullable'))
		return true;
	
	var allowedSearchCharacters;
	// von
	var parts1 = date_getParts_us_ByValue(datum1,allowedSearchCharacters);
	dat1 = getDateObjectByValues(parts1[1], parts1[0], parts1[2]);
	// bis
	var parts2 = date_getParts_us_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[1], parts2[0], parts2[2]);
	// pruefen
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumVonBisOk_se(formName,fieldName,datum1,datum2,message)
{
	// 27.12.2021, SB -> falls von und bis null, und das Feld nullable, dann natürlich nicht prüfen (class=nullable)
	if(isNullOrZero(datum1) && isNullOrZero(datum2)
			&& $('input[name="'+fieldName+'"]').length > 0
			&& $('input[name="'+fieldName+'"]').hasClass('nullable'))
		return true;
	
	var allowedSearchCharacters;
	// von
	var parts1 = date_getParts_se_ByValue(datum1,allowedSearchCharacters);
	dat1 = getDateObjectByValues(parts1[2], parts1[1], parts1[0]);
	// bis
	var parts2 = date_getParts_se_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[2], parts2[1], parts2[0]);
	// pruefen
	// alert("datumVonBisOk_se: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumVonBisOk_gl(formName,fieldName,datum1,datum2,message)
{
	// 27.12.2021, SB -> falls von und bis null, und das Feld nullable, dann natürlich nicht prüfen (class=nullable)
	if(isNullOrZero(datum1) && isNullOrZero(datum2)
			&& $('input[name="'+fieldName+'"]').length > 0
			&& $('input[name="'+fieldName+'"]').hasClass('nullable'))
		return true;
	
	var allowedSearchCharacters;
	// von
	var parts1 = date_getParts_gl_ByValue(datum1,allowedSearchCharacters);
	dat1 = getDateObjectByValues(parts1[1], parts1[0], parts1[2]);
	// bis
	var parts2 = date_getParts_gl_ByValue(datum2,allowedSearchCharacters);	
	dat2 = getDateObjectByValues(parts2[1], parts2[0], parts2[2]);
	// pruefen
	//alert("datumVonBisOk_gl: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}


// ---------------------------------------------------------------------------------------------//
// Prüfen, ob datum1 vor datum2 liegt, oder gleich ist
// ---------------------------------------------------------------------------------------------//
function datumBeforeOk(formName,fieldName,datum1,datum2,message)
{
	dat1 = getDateObject(datum1);
	dat2 = getDateObject(datum2);
// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumBeforeOk_en(formName,fieldName,datum1,datum2,message)
{
// alert("datumVonBisOk_en: datum1="+datum1+", datum2="+datum2);
	var allowedSearchCharacters;
	
	// von
	var parts1 = date_getParts_ByValue(datum1,allowedSearchCharacters);	
	// alert("datumVonBisOk_en: parts1="+parts1);
	dat1 = getDateObjectByValues(parts1[0], parts1[1], parts1[2]);
	// alert("datumVonBisOk_en: parts1="+parts1+", asDate="+dat1);
	// bis (wird in Format tt.MM.yyyy übergeben)
	var parts2 = date_getParts_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[0], parts2[1], parts2[2]);	
	// pruefen
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumBeforeOk_us(formName,fieldName,datum1,datum2,message)
{
// alert("datumBeforeOk_us: datum1="+datum1+", datum2="+datum2);
	var allowedSearchCharacters;
	// von
	var parts1 = date_getParts_us_ByValue(datum1,allowedSearchCharacters);
	dat1 = getDateObjectByValues(parts1[1], parts1[0], parts1[2]);
	// bis (wird in Format tt.MM.yyyy übergeben)
	var parts2 = date_getParts_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[0], parts2[1], parts2[2]);
	// pruefen
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumBeforeOk_se(formName,fieldName,datum1,datum2,message)
{
// alert("datumBeforeOk_se: datum1="+datum1+", datum2="+datum2);
	var allowedSearchCharacters;
	// von
	var parts1 = date_getParts_se_ByValue(datum1,allowedSearchCharacters);
	dat1 = getDateObjectByValues(parts1[2], parts1[1], parts1[0]);
	// bis (wird in Format tt.MM.yyyy übergeben)
	var parts2 = date_getParts_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[0], parts2[1], parts2[2]);
	// pruefen
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 <= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}


// ---------------------------------------------------------------------------------------------//
// Prüfen, ob datum1 nach datum2 liegt, oder gleich ist
// ---------------------------------------------------------------------------------------------//
function datumAfterOk(formName,fieldName,datum1,datum2,message)
{
	dat1 = getDateObject(datum1);
	dat2 = getDateObject(datum2);
// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 >= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumAfterOk_en(formName,fieldName,datum1,datum2,message)
{
// alert("datumVonBisOk_en: datum1="+datum1+", datum2="+datum2);
	var allowedSearchCharacters;
	
	// von
	var parts1 = date_getParts_ByValue(datum1,allowedSearchCharacters);	
	// alert("datumVonBisOk_en: parts1="+parts1);
	dat1 = getDateObjectByValues(parts1[0], parts1[1], parts1[2]);
	// alert("datumVonBisOk_en: parts1="+parts1+", asDate="+dat1);
	// bis (wird in Format tt.MM.yyyy übergeben)
	var parts2 = date_getParts_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[0], parts2[1], parts2[2]);	
	// pruefen
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 >= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumAfterOk_us(formName,fieldName,datum1,datum2,message)
{
// alert("datumBeforeOk_us: datum1="+datum1+", datum2="+datum2);
	var allowedSearchCharacters;
	// von
	var parts1 = date_getParts_us_ByValue(datum1,allowedSearchCharacters);
	dat1 = getDateObjectByValues(parts1[1], parts1[0], parts1[2]);
	// bis (wird in Format tt.MM.yyyy übergeben)
	var parts2 = date_getParts_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[0], parts2[1], parts2[2]);
	// pruefen
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 >= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}
function datumAfterOk_se(formName,fieldName,datum1,datum2,message)
{
// alert("datumBeforeOk_se: datum1="+datum1+", datum2="+datum2);
	var allowedSearchCharacters;
	// von
	var parts1 = date_getParts_se_ByValue(datum1,allowedSearchCharacters);
	dat1 = getDateObjectByValues(parts1[2], parts1[1], parts1[0]);
	// bis (wird in Format tt.MM.yyyy übergeben)
	var parts2 = date_getParts_ByValue(datum2,allowedSearchCharacters);
	dat2 = getDateObjectByValues(parts2[0], parts2[1], parts2[2]);
	// pruefen
	// alert("datumVonBisOk_en: dat1="+dat1+", dat2="+dat2);
	if(dat1 >= dat2 ) return true;
	
	if(message) alert(message);
	setFocus(formName,fieldName);
	return false;
}


// ---------------------------------------------------------------------------------------------//
// Datum als String in ein Date-Object umwandeln
// ---------------------------------------------------------------------------------------------//
function getDateObject(datum)
{
	var jahr = datum.substring(6,11);
	var monat = datum.substring(3,5)-1;
	var tag = datum.substring(0,2);
	date = new Date(jahr, monat, tag);
	return date;
}
function getDateObjectByValues(tag,monat,jahr)
{
	// alert("getDateObjectByValues: jahr="+jahr+", monat="+monat+", tag="+tag);
	date = new Date();
	date.setFullYear(jahr);
	date.setMonth(monat-1);
	date.setDate(tag);
	return date;
}
// ---------------------------------------------------------------------------------------------//
// Formatierung Betrag
// ---------------------------------------------------------------------------------------------//
function formatBetrag(field, nk)
{
	if (nk == null) nk = 2;
	var value = field.value;
	// gsch alle . entfernen
	while(value.indexOf('.') > 0)
		value = value.replace('.','');
	if (parseFloat(value.replace(BETRAG_DECIMAL_SEP,'.')) != 0) {
		value = parseFloat(value.replace(BETRAG_DECIMAL_SEP,'.')).toFixed(nk);
		value = (''+value).replace('.',BETRAG_DECIMAL_SEP);
	}
	var minus = false;
	if (value.charAt(0) == '-')
	{
		minus = true;
		value = value.substring(1);
	}
	var vorkomma = value;
	var nachkomma= "0";
	var kommapos = value.indexOf(BETRAG_DECIMAL_SEP);
	if (kommapos >= 0)
	{
		vorkomma = value.substring(0, kommapos);
		nachkomma= value.substring(kommapos+1);
	}
	while(nachkomma.length < nk)
	{
		nachkomma = nachkomma + "0";
	}
	if (nachkomma.length > nk && parseFloat(value) > 0) 
		nachkomma = parseFloat(value).toFixed(nk).substring(kommapos+1);
	else if (nachkomma.length > nk)
		nachkomma = getGerundet(nachkomma, nk);
  
	deleteTausenderpunkte(vorkomma);
	vorkomma = formatVorkomma(vorkomma);
	if (minus) field.value = "-" + vorkomma + BETRAG_DECIMAL_SEP + nachkomma;
	else field.value = vorkomma + BETRAG_DECIMAL_SEP + nachkomma;
}
function formatBetrag_en(field, nk)
{
	if (nk == null) nk = 2;
	var value = field.value;
	if (parseFloat(value.replace(/,/g,'').replace(BETRAG_DECIMAL_SEP_EN,'.')) != 0) {
		value = parseFloat(value.replace(/,/g,'').replace(BETRAG_DECIMAL_SEP_EN,'.')).toFixed(nk);
		value = (''+value).replace('.',BETRAG_DECIMAL_SEP_EN);
	}
	var minus = false;
	if (value.charAt(0) == '-')
	{
		minus = true;
		value = value.substring(1);
	}
	var vorkomma = value;
	var nachkomma= "0";
	var kommapos = value.indexOf(BETRAG_DECIMAL_SEP_EN);
	if (kommapos >= 0)
	{
		vorkomma = value.substring(0, kommapos);
		nachkomma= value.substring(kommapos+1);
	}
	while(nachkomma.length < nk)
	{
		nachkomma = nachkomma + "0";
	}
	if (nachkomma.length > nk && parseFloat(value) > 0) 
		nachkomma = parseFloat(value).toFixed(nk).substring(kommapos+1)
	else if (nachkomma.length > nk)
		nachkomma = getGerundet(nachkomma, nk);
	deleteTausenderkomma(vorkomma);
	vorkomma = formatVorkomma_en(vorkomma);
	if (minus) 
		field.value = "-" + vorkomma + BETRAG_DECIMAL_SEP_EN + nachkomma;
	else 
		field.value = vorkomma + BETRAG_DECIMAL_SEP_EN + nachkomma;
}
// ---------------------------------------------------------------------------------------------//
// Formatieren Vorkomma
// ---------------------------------------------------------------------------------------------//
function formatVorkomma(intval)
{
	if (intval == null || intval.length == 0) return "0";
	var value = "";
	var count = 0;
	for(var index=intval.length; index >= 0; index--)
	{
		if (intval.charAt(index) >= "0" && intval.charAt(index) <= "9")
		{
			if (count == 3) { value = BETRAG_GROUP_SEP + value; count = 0; }
			value = intval.charAt(index) + value; ++count;
		}
	}
	return value;
}
function formatVorkomma_en(intval)
{
	if (intval == null || intval.length == 0) return "0";
	var value = "";
	var count = 0;
	for(var index=intval.length; index >= 0; index--)
	{
		if (intval.charAt(index) >= "0" && intval.charAt(index) <= "9")
		{
			if (count == 3) 
			{
				value = BETRAG_GROUP_SEP_EN + value; 
				count = 0; 
			}
			value = intval.charAt(index) + value; 
			++count;
		}
	}
	return value;
}
function formatVorkomma_se(intval)
{
	if (intval == null || intval.length == 0) return "0";
	var value = "";
	var count = 0;
	for(var index=intval.length; index >= 0; index--)
	{
		if (intval.charAt(index) >= "0" && intval.charAt(index) <= "9")
		{
			if (count == 3) 
			{
				value = BETRAG_GROUP_SEP_SE + value; 
				count = 0; 
			}
			value = intval.charAt(index) + value; 
			++count;
		}
	}
	return value;
}
// ---------------------------------------------------------------------------------------------//
// Formatierung Betrag wo Wert bereits �bergeben wurde
// ---------------------------------------------------------------------------------------------//
function formatFloat(wert,nk)
{
	if (nk == null) nk = 2;
	var minus = false;
	var value = wert.toString();
	if (value.charAt(0) == '-')
	{
		minus = true;
		value = value.substring(1);
	}
	var vorkomma = value;
	var nachkomma= "0";
	var kommapos = value.indexOf(".");
	if (kommapos >= 0)
	{
		vorkomma = value.substring(0, kommapos);
		nachkomma= value.substring(kommapos+1);
	}
	while(nachkomma.length < nk)
	{
		nachkomma = nachkomma + "0";
	}
	// deleteTausenderpunkte(vorkomma);
	vorkomma = formatVorkomma(vorkomma);
	if (minus) value = "-" + vorkomma + BETRAG_DECIMAL_SEP + nachkomma;
	else value = vorkomma + BETRAG_DECIMAL_SEP + nachkomma;
	return value;
}

function formatFloat_en(wert,nk)
{
	if (nk == null) nk = 2;
	var minus = false;
	var value = wert.toString();
	if (value.charAt(0) == '-')
	{
		minus = true;
		value = value.substring(1);
	}
	var vorkomma = value;
	var nachkomma= "0";
	var kommapos = value.indexOf(".");
	if (kommapos >= 0)
	{
		vorkomma = value.substring(0, kommapos);
		nachkomma= value.substring(kommapos+1);
	}
	while(nachkomma.length < nk)
	{
		nachkomma = nachkomma + "0";
	}
	// deleteTausenderpunkte(vorkomma);
	vorkomma = formatVorkomma_en(vorkomma);
	if (minus) value = "-" + vorkomma + BETRAG_DECIMAL_SEP_EN + nachkomma;
	else value = vorkomma + BETRAG_DECIMAL_SEP_EN + nachkomma;
	return value;
}

function formatFloat_se(wert,nk)
{
	if (nk == null) nk = 2;
	var minus = false;
	var value = wert.toString();
	if (value.charAt(0) == '-')
	{
		minus = true;
		value = value.substring(1);
	}
	var vorkomma = value;
	var nachkomma= "0";
	var kommapos = value.indexOf(".");
	if (kommapos >= 0)
	{
		vorkomma = value.substring(0, kommapos);
		nachkomma= value.substring(kommapos+1);
	}
	while(nachkomma.length < nk)
	{
		nachkomma = nachkomma + "0";
	}
	// deleteTausenderpunkte(vorkomma);
	vorkomma = formatVorkomma_se(vorkomma);
	if (minus) value = "-" + vorkomma + BETRAG_DECIMAL_SEP_SE + nachkomma;
	else value = vorkomma + BETRAG_DECIMAL_SEP_SE + nachkomma;
	return value;
}
// ---------------------------------------------------------------------------------------------//
// Pr�fen, ob g�ltiger Betrag
// ---------------------------------------------------------------------------------------------//
function betrag_isValid(field)
{
	if (field.value.length == 0) return true;
	if (hasValidPattern(field, VALID_BETRAG_PATTERNS)==false) return false;
	return true;
}
function betrag_isValid_en(field)
{
	if (field.value.length == 0) return true;
	if (hasValidPattern(field, VALID_BETRAG_PATTERNS_EN)==false) return false;
	return true;
}
function betrag_isValid_se(field)
{
	if (field.value.length == 0) return true;
	if (hasValidPattern(field, VALID_BETRAG_PATTERNS_EN)==false) return false;
	return true;
}
// ---------------------------------------------------------------------------------------------//
// Pr�fen, ob g�ltiger numerischer Wert
// ---------------------------------------------------------------------------------------------//
function number_isValid(field)
{
	if (field.value.length == 0) return true;
	if (hasValidPattern(field, VALID_NUMBER_PATTERNS)==false) return false;
	return true;
}
// ---------------------------------------------------------------------------------------------//
// L�schen Tausenderinterpunktion
// ---------------------------------------------------------------------------------------------//
function deleteTausenderpunkte(wert)
{
	while(wert.indexOf('.') > -1)
	{
		wert = 	wert.substring(0,wert.indexOf('.')) +
						wert.substring(wert.indexOf('.')+1,wert.length);
	}
	return wert;
}
function deleteTausenderkomma(wert)
{
	while(wert.indexOf(',') > -1)
	{
		wert = 	wert.substring(0,wert.indexOf(',')) +
						wert.substring(wert.indexOf(',')+1,wert.length);
	}
	return wert;
}
function hasValidPattern(field, patterns)
{	
	var value = field.value;
	// alert("hasVal value = "+value);
	// alert("hasVal pattern = "+patterns);
	var i;
	for(i=0; i < patterns.length; i++)
	{ 
		if (patterns[i].test(value) == true)
		{
			// alert("detected bei = "+i+" "+patterns[i]);
			break;
		}
	}
	if (i == patterns.length) 
		return false; 
	return true;
}
// ---------------------------------------------------------------------------------------------//
// Ermitteln eines Prozentbetrags und anzeigen des errechneten Betrags
// ---------------------------------------------------------------------------------------------//
function berechnenProzBetrag(form,field,vonBetrag,prozent)
{
	var prozBetrag = 0;
	vonBetrag = getNumberIgnoreComma(vonBetrag)/100;
	prozent = getNumberIgnoreComma(prozent);
 	prozBetrag	= vonBetrag * (prozent/100);
	// -------------------------------------------------------------------------------------------//
	// Noch einmal durch 100 dividieren, da prozent immer mit 2 Nachkomma
	// �bergeben wird
	// -------------------------------------------------------------------------------------------//
 	prozBetrag	= prozBetrag /100;
	setValue(form,field,prozBetrag);
	return;
}
// ---------------------------------------------------------------------------------------------//
// Da, bei der Berechnung in javaScript als Interpunktion ein '.' vorkommt,
// umwandeln in Komma
// ---------------------------------------------------------------------------------------------//
function umwGueltigBetrag(field,nk)
{
	var value = field.value;
	var vorkomma = value;
	var nachkomma= "0";
	var kommapos1 = value.indexOf(BETRAG_DECIMAL_SEP);
	if (kommapos1 >= 0) return;
	var kommapos = value.indexOf(BETRAG_GROUP_SEP);
	if (kommapos >= 0)
	{
		if (parseFloat(value) != 0){
			value = parseFloat(value).toFixed(nk);
			kommapos = value.indexOf('.');
		}
		vorkomma = value.substring(0, kommapos);
		nachkomma= value.substring(kommapos+1);
		if (nachkomma.length > nk && parseFloat(value) > 0) 
			nachkomma = parseFloat(value).toFixed(nk).substring(kommapos+1);
		else if (nachkomma.length > nk)
			nachkomma = getGerundet(nachkomma, nk);
		field.value = vorkomma+BETRAG_DECIMAL_SEP+nachkomma;
	}
	return;
}
// ---------------------------------------------------------------------------------------------//
// Rundungsfunktion, da im JavaScript keine vorhanden
// ---------------------------------------------------------------------------------------------//
function getGerundet(wert,stelle)
{
	if(wert.length <= stelle) return wert;
	var gerundet = wert.substring(0,stelle);
	var letzteStelle = wert.substring(stelle,stelle+1);
	if(letzteStelle > 4) gerundet++;
	strGerundet = String(gerundet);
	while(strGerundet.length < stelle)
	{
		strGerundet = "0" + strGerundet; 
	}
	return strGerundet;
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen Datumsfelder
// ---------------------------------------------------------------------------------------------//
function datum_onBlur(field, errorMsg, allowedSearchCharacters)
{
	if (field.value == '') return true;
	if (date_isValid(field,allowedSearchCharacters) == false)
	{
	  if(errorMsg == null)
			alert(DATE_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	// alert("hier");
	date_format(field,allowedSearchCharacters);
	return true;
}
function datum_onBlur_en(field, errorMsg, allowedSearchCharacters)
{
	if (field.value == '') return true;
	if (date_isValid(field,allowedSearchCharacters) == false)
	{
	  if(errorMsg == null)
			alert(DATE_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	// alert("hier");
	date_format_en(field,allowedSearchCharacters);
	return true;
}
function datum_onBlur_us(field, errorMsg, allowedSearchCharacters)
{
	if (field.value == '') return true;
	if (date_isValid_us(field,allowedSearchCharacters) == false)
	{
	  if(errorMsg == null)
			alert(DATE_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	// alert("hier");
	date_format_us(field,allowedSearchCharacters);
	return true;
}
function datum_onBlur_gl(field, errorMsg, allowedSearchCharacters)
{
	if (field.value == '') return true;
	if (date_isValid_gl(field,allowedSearchCharacters) == false)
	{
	  if(errorMsg == null)
			alert(DATE_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	// alert("hier");
	date_format_gl(field,allowedSearchCharacters);
	return true;
}
function datum_onBlur_se(field, errorMsg, allowedSearchCharacters)
{
	if (field.value == '') return true;
	if (date_isValid_se(field,allowedSearchCharacters) == false)
	{
	  if(errorMsg == null)
			alert(DATE_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	// alert("hier");
	date_format_se(field,allowedSearchCharacters);
	return true;
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen Numerisches Feld
// ---------------------------------------------------------------------------------------------//
function numFeld_onBlur(field,errorMsg)
{
	if (field.value == '') return true;
	if (number_isValid(field) == false)
	{
	  if(errorMsg == null)
			alert(NUMBER_ERROR_MSG);
		else
			alert(errorMsg);
		field.value = "";
		field.focus();
		return false;
	}
	return true;
}
// ---------------------------------------------------------------------------------------------//
// Formatierung Datum
// ---------------------------------------------------------------------------------------------//
function date_format(field,allowedSearchCharacters)
{
	var parts = date_getParts(field,allowedSearchCharacters);
	field.value = (allowedSearchCharacters && parts.length > 3 ? parts[3] : "") +
		fillWithNull(parts[0],2) +
		DATE_DEFAULT_SEP +
		fillWithNull(parts[1],2) +
		DATE_DEFAULT_SEP + parts[2];
}
function date_format_en(field,allowedSearchCharacters)
{
	var parts = date_getParts(field,allowedSearchCharacters);
	field.value = (allowedSearchCharacters && parts.length > 3 ? parts[3] : "") +
		fillWithNull(parts[0],2) +
		DATE_DEFAULT_SEP_EN +
		fillWithNull(parts[1],2) +
		DATE_DEFAULT_SEP_EN + parts[2];
}
function date_format_us(field,allowedSearchCharacters)
{
	var parts = date_getParts_us(field,allowedSearchCharacters);
	field.value = (allowedSearchCharacters && parts.length > 3 ? parts[3] : "") +
		fillWithNull(parts[0],2) +
		DATE_DEFAULT_SEP_US +
		fillWithNull(parts[1],2) +
		DATE_DEFAULT_SEP_US + parts[2];
}
function date_format_gl(field,allowedSearchCharacters)
{
	var parts = date_getParts_gl(field,allowedSearchCharacters);
	field.value = (allowedSearchCharacters && parts.length > 3 ? parts[3] : "") +
		fillWithNull(parts[0],2) +
		DATE_DEFAULT_SEP_GL +
		fillWithNull(parts[1],2) +
		DATE_DEFAULT_SEP_GL + parts[2];
}
function date_format_se(field,allowedSearchCharacters)
{
	var parts = date_getParts_se(field,allowedSearchCharacters);
	field.value = (allowedSearchCharacters && parts.length > 3 ? parts[3] : "") +
		fillWithNull(parts[0],2) +
		DATE_DEFAULT_SEP_SE +
		fillWithNull(parts[1],2) +
		DATE_DEFAULT_SEP_SE + parts[2];
}

function date_isValid(field,allowedSearchCharacters)
{
	if (field.value.length == 0) return true;
	if(allowedSearchCharacters == true)
	{
		if(hasValidPattern(field, VALID_DATE_PATTERNS_WITH_SEARCH)==false) 
			return false;
	}
	else 
	{
		if(hasValidPattern(field, VALID_DATE_PATTERNS)==false) 
			return false;
	}
	var parts = date_getParts(field,allowedSearchCharacters);
	if(parts == false)
		return false;
	else
		return isDate(parts[2], parts[1], parts[0]);
}
function date_isValid_se(field,allowedSearchCharacters)
{
	if (field.value.length == 0) return true;
	if(allowedSearchCharacters == true)
	{
		if(hasValidPattern(field, VALID_DATE_PATTERNS_WITH_SEARCH)==false) 
			return false;
	}
	else 
	{
		if(hasValidPattern(field, VALID_DATE_PATTERNS)==false) 
			return false;
	}
	var parts = date_getParts_se(field,allowedSearchCharacters);
	if(parts == false)
		return false;
	else
		return isDate(parts[0], parts[1], parts[2]);
}
function date_isValid_us(field,allowedSearchCharacters)
{
	if (field.value.length == 0) return true;
	if(allowedSearchCharacters == true)
	{
		if(hasValidPattern(field, VALID_DATE_PATTERNS_WITH_SEARCH)==false) 
			return false;
	}
	else 
	{
		if(hasValidPattern(field, VALID_DATE_PATTERNS)==false) 
			return false;
	}
	var parts = date_getParts_us(field,allowedSearchCharacters);
	if(parts == false)
		return false;
	else
		return isDate(parts[2], parts[0], parts[1]);
}
function date_isValid_gl(field,allowedSearchCharacters)
{
	if (field.value.length == 0) return true;
	if(allowedSearchCharacters == true)
	{
		if(hasValidPattern(field, VALID_DATE_PATTERNS_WITH_SEARCH)==false) 
			return false;
	}
	else 
	{
		if(hasValidPattern(field, VALID_DATE_PATTERNS)==false) 
			return false;
	}
	var parts = date_getParts_gl(field,allowedSearchCharacters);
	if(parts == false)
		return false;
	else
		return isDate(parts[2], parts[0], parts[1]);
}
function date_getParts(field,allowedSearchCharacters)
{
	return date_getParts_ByValue(field.value, allowedSearchCharacters);
}
function date_getParts_ByValue(value,allowedSearchCharacters)
{
	var parts;
	if (DATE_SPLIT.test(value) && !allowedSearchCharacters) parts = value.split(DATE_SPLIT);
	else if(DATE_SPLIT.test(value))// mit ><=davor?!
	{
		parts = value.split(DATE_SPLIT);
		if(parts[0].search(/\d/) > 0){
			parts[3] = parts[0].substring(0,parts[0].search(/\d/));
			parts[0] = parts[0].substring(parts[0].search(/\d/));
		}
	}
	else
	{
		parts = new Array();
		// allowedcharacters wegschneiden und als letztes element ins array
		// packen
		if(allowedSearchCharacters && value.search(/\d/) > 0){
			parts[3] = value.substring(0,value.search(/\d/));
			value = value.substring(value.search(/\d/));
		}
		parts[0] = value.substring(0,2);
		parts[1] = value.substring(2,4);
		parts[2] = value.substring(4);
	}
	// alert("parts = "+parts);
	if (parts[2].length < 4)
	{
	 if(parts[2] < 40) 
		 parts[2] = "20"+parts[2];
	 else
		 parts[2] = "19"+parts[2];
	}
	if (parts[2] < 1900)
		return false;
	else
		return parts;
}
function date_getParts_us(field,allowedSearchCharacters)
{
	return date_getParts_us_ByValue(field.value, allowedSearchCharacters);
}
function date_getParts_us_ByValue(value,allowedSearchCharacters)
{
	var parts;
	if (DATE_SPLIT.test(value)) parts = value.split(DATE_SPLIT);
	else
	{
		parts = new Array();
		// allowedcharacters wegschneiden und als letztes element ins array
		// packen
		if(allowedSearchCharacters && value.search(/\d/) > 0)
		{
			parts[3] = value.substring(0,value.search(/\d/));
			value = value.substring(value.search(/\d/));
		}
		if(value.length==6)
		{
			parts[0] = value.substring(0,2);
			parts[1] = value.substring(2,4);
			parts[2] = value.substring(4);
		}
		else
		{
			parts[0] = value.substring(0,2);
			parts[1] = value.substring(2,4);
			parts[2] = value.substring(4);
		}
	}
	// alert("value="+value+" parts[0]="+parts[0]+" parts1="+parts[1]+"
	// parts2="+parts[2]);
	if (parts[2].length < 4)
	{
	 if(parts[2] < 40) 
		 parts[2] = "20"+parts[2];
	 else
		 parts[2] = "19"+parts[2];
	}
	if (parts[2] < 1900)
		return false;
	else
		return parts;
}
function date_getParts_gl(field,allowedSearchCharacters)
{
	return date_getParts_gl_ByValue(field.value, allowedSearchCharacters);
}
function date_getParts_gl_ByValue(value,allowedSearchCharacters)
{
	var parts;
	if (DATE_SPLIT.test(value)) parts = value.split(DATE_SPLIT);
	else
	{
		parts = new Array();
		// allowedcharacters wegschneiden und als letztes element ins array
		// packen
		if(allowedSearchCharacters && value.search(/\d/) > 0)
		{
			parts[3] = value.substring(0,value.search(/\d/));
			value = value.substring(value.search(/\d/));
		}
		if(value.length==6)
		{
			parts[0] = value.substring(0,2);
			parts[1] = value.substring(2,4);
			parts[2] = value.substring(4);
		}
		else
		{
			parts[0] = value.substring(0,2);
			parts[1] = value.substring(2,4);
			parts[2] = value.substring(4);
		}
	}
	// alert("value="+value+" parts[0]="+parts[0]+" parts1="+parts[1]+"
	// parts2="+parts[2]);
	if (parts[2].length < 4)
	{
	 if(parts[2] < 40) 
		 parts[2] = "20"+parts[2];
	 else
		 parts[2] = "19"+parts[2];
	}
	if (parts[2] < 1900)
		return false;
	else
		return parts;
}
function date_getParts_se(field,allowedSearchCharacters)
{
	return date_getParts_se_ByValue(field.value, allowedSearchCharacters);
}
function date_getParts_se_ByValue(value,allowedSearchCharacters)
{
	var parts;
	if (DATE_SPLIT.test(value)) parts = value.split(DATE_SPLIT);
	else
	{
		parts = new Array();
		// allowedcharacters wegschneiden und als letztes element ins array
		// packen
		if(allowedSearchCharacters && value.search(/\d/) > 0){
			parts[3] = value.substring(0,value.search(/\d/));
			value = value.substring(value.search(/\d/));
		}
		if(value.length==6)
		{
			parts[0] = value.substring(0,2);
			parts[1] = value.substring(2,4);
			parts[2] = value.substring(4);
		}
		else
		{
			parts[0] = value.substring(0,4);
			parts[1] = value.substring(4,6);
			parts[2] = value.substring(6);
		}
	}
	// alert("value="+value+" parts[0]="+parts[0]+" parts1="+parts[1]+"
	// parts2="+parts[2]);
	if (parts[0].length < 4)
	{
	 if(parts[0] < 40) 
		 parts[0] = "20"+parts[0];
	 else
		 parts[0] = "19"+parts[0];
	}
	if (parts[0] < 1900)
		return false;
	else
		return parts;
}
function fillWithNull(value, fillLength)
{
	while(value.length < fillLength)
	{
		value = "0" + value;
	}
	return value;
}

function isDate(year,month,day)
{
	var daysInMonth = new Array();
	daysInMonth[1] = 31;
	daysInMonth[2] = 29;
	daysInMonth[3] = 31;
	daysInMonth[4] = 30;
	daysInMonth[5] = 31;
	daysInMonth[6] = 30;
	daysInMonth[7] = 31;
	daysInMonth[8] = 31;
	daysInMonth[9] = 30;
	daysInMonth[10] = 31;
	daysInMonth[11] = 30;
	daysInMonth[12] = 31;

	if (! isYear(year,true)) { return false; }
	if (! isMonth(month,true)) { return false; }
	if (! isDay(day,true)) { return false; }

	var intYear = parseInt(year, 10);
	var intMonth = parseInt(month, 10);
	var intDay = parseInt(day, 10);

	if (intDay > daysInMonth[intMonth]) return false;
	if ((intMonth == 2) && (intDay > daysInFebruary(intYear))) return false;

	function daysInFebruary (year)
	{
		return ( ((year % 4 == 0) && ( (!(year % 100 == 0)) ||
							(year % 400 == 0) ) ) ? 29 : 28 );
	}

	return true;
}

function isYear (s, required)
{
	if (! required && isWhiteSpace(s)) return true;
	if (! isInteger(s, true)) return false;
	if (s > 99 && s < 1000) return false;
	if (s < 1 || s > 9999) return false;

	return true;
}

function getYear (s)
{
	if (s >= 1 && s <= 99) return 2000 + Number (s);
	return s;
}

function isMonth (s, required)
{
	if (! required && isWhiteSpace(s)) return true;
	if (! isInteger(s, true)) return false;
	if (s < 1 || s > 12) return false;

	return true;
}

function isDay (s, required)
{
	if (! required && isWhiteSpace(s)) return true;
	if (! isInteger(s, true)) return false;
	if (s < 1 || s > 31) return false;

	return true;
}

function isWhiteSpace (s)
{
	return (isEmpty(s) || reWhiteSpace.test(s));
}

function isInteger (s, required)
{
	if (! required && isWhiteSpace(s)) return true;

	return reInteger.test(s)
}

function isTooLong(formName,fieldName,wert,meldung,maxLength)
{
	if(wert.length > maxLength)
	{
		alert(meldung+" "+maxLength+" !!!");
		setFocus(formName,fieldName);
		return true;
	}
	return false;
}
// ---------------------------------------------------------------------------------------------//
// �berpr�fen ob Passwort 2x richtig eingegeben wurde
// ---------------------------------------------------------------------------------------------//
function checkPasswort(field1,field2)
{
	if(field1.value == field2.value) return true;

	alert(PASSW_ERROR_MSG);
	field1.value = "";
	field2.value = "";
	field1.focus();
	return false;
}
//function openWindowWithPara(myUrl,width,height,formName,fieldName,meldung)
//{//es gibt keine ueberladung in js
//	openWindowWithPara(myUrl,width,height,10,10,formName,fieldName,meldung)
//}
function openWindowWithPara(myUrl,width,height,left,top,formName,fieldName,meldung)
{
	var wert = getValue(formName,fieldName);
	if(!myUrl.endsWith('='+wert))
		myUrl += ""+wert+"";
	// alert("wert = "+wert+", myUrl = "+myUrl);
	if(wert == "" || wert == null)
		myUrl = "";
	openWindow(myUrl,width,height,left,top,fieldName,null,null,null,meldung);
}
//function openWindow(url,width,height,name,scrolls,resize,menu,meldung)
//{//es gibt keine ueberladung in js
//	openWindow(url,width,height,10,10,name,scrolls,resize,menu,meldung);
//}
function openWindow(url,width,height,left,top,name,scrolls,resize,menu,meldung)
{
	if(url != "" && url != null)
	{
		nameBrowser = navigator.appName;
		browserVer = navigator.appVersion.substring(0,1);
		newUrl = url+"&newWindow=1";
		if (width==null) width=700;
		if (height==null) height=500;
		if (name==null) name="newWindow"
		if (scrolls==false) 
			scrollsOption="no";
		else 
			scrollsOption="yes";
			
		if (menu==true)
			menuOption="yes";
		else
			menuOption="no";
		// Falls left und top nicht gef�llt, dann zentrieren
		if(left==null) left = (screen.width/2)-(width/2);	
		if(top==null) top = (screen.height/2)-(height/2);	
		if (resize==null) resize=1;
		var topPx = (nameBrowser=="Netscape")?"screenX":"top";
		var leftPx = (nameBrowser=="Netscape")?"screenY":"left";
		if (nameBrowser != "Netscape" || browserVer != 2) 
		{
			popupwin=window.open(newUrl,name,"toolbar=no,height="+height+",width="+width+",location=no,directories=no,status=yes,left="+left+",top="+top+",menubar="+menuOption+",scrollbars="+scrollsOption+",resizable="+resize+"");
		}
		if (nameBrowser != "Netscape")   popupwin.focus();
	}
	else
		alert(meldung);
}
function reloadMainFrameByTime(time)
{
	// window.setTimeout("reloadMainFrame()", 10000);
	activateDeactivateScreen('visible');
	window.setTimeout(function(){reloadMainFrame();}, 2000);	
	return true;
}
function reloadMainFrame(url)
{
// Frame1=eval("parent.text");
// Frame1.location.href = Frame1.location.href;
	if(window.top && window.top.text)
		window.top.text.location.href = (url == undefined ? window.top.text.location.href : url);
	else
		window.location.href = (url == undefined ? window.location.href : url);
}
function reloadLeftFrame()
{
	Frame1=window.top.leftMenu;
	if(Frame1 != null)
		Frame1.location.href = Frame1.location.href;
}
function reloadLeftAndMainFrame(url)
{
	reloadLeftFrame();
	window.setTimeout(function(){reloadMainFrame(url);}, 1000);
}
function reloadInfoBox()
{
	FrameInfoBox=window.top.infoBox;
	if(FrameInfoBox != null)
		FrameInfoBox.location.href = FrameInfoBox.location.href;
}
function reloadEverything()
{
	TopFrame = window.top.top;
	if(TopFrame)
	{
		TopFrame.location.href = TopFrame.location.href;
	}
}

/*
 * F�hrt den Countdown aus
 */ 
function countdown(seconds, target, btnId, secondsText) 
{  
  var element = document.getElementById(target);
  if(seconds >= 0) 
  {    
    var s = seconds % 60;      
    element.innerHTML = s + ' ' + secondsText;
    seconds--;    
    window.setTimeout('countdown('+seconds+',\''+target+'\',\''+btnId+'\',\''+secondsText+'\')', 1000);
  } 
  else
  {
  	element.innerHTML = "";
  	document.getElementById(btnId).disabled=false;
  	return false;
  }
}

/*
 * Erzeugt einen Countdown
 */
function createCountdown(seconds, target, btnId, secondsText)
{  
  new countdown(seconds, target, btnId, secondsText);
}

function activateCaptchaButton(btnId)
{
  // alert("test");
  document.getElementById(btnId).disabled=false;
} 

var inputsDeactivated = false;
var includesFileUpload = false;

function deactivateAllButtonsForUpload()
{
	// vor gedr�cktem button hidden field daf�r anh�ngen und von vorigen
	// gedr�ckten buttons entfernen
  $('.button_replacement').remove();
  if($('input:hidden[name="readNew"][value="1"]').size() < 1)
	  if(target)
		  $(target).before('<input class="button_replacement" type="hidden" name="'+$(target).attr('name')+'" value="'+$(target).attr('value')+'" />');
	  else
		  $(':submit:last').before('<input class="button_replacement" type="hidden" name="'+$(':submit:last').attr('name')+'" value="'+$(':submit:last').attr('value')+'" />');
  inputsDeactivated = true;
	
  var inputObjs = document.getElementsByTagName('INPUT');
  for(var i = 0; i < inputObjs.length; i++) 
  {
	// alert(inputObjs[i].type+" "+inputObjs[i].name);
    if(inputObjs[i].type.toLowerCase() == 'button' || inputObjs[i].type.toLowerCase() == 'submit'
    	|| inputObjs[i].type.toLowerCase() == 'reset')
    	// || inputObjs[i].type.toLowerCase() == 'file'*/)
    {
      inputObjs[i].disabled = true;
    }else if(inputObjs[i].type.toLowerCase() == 'file'){
    	includesFileUpload=true;
    }
  }
}

var localSubmitTimeout;
function queueSubmit(ms){
	// fuehrt ein submit nach x ms durch, falls oefter enqueued wird dann ueberschreibt es das vorherige
	if(localSubmitTimeout){
		clearTimeout(localSubmitTimeout)
	} 
	localSubmitTimeout = setTimeout(function(){
		$('form').submit();
	},ms);
}

function getAllFieldsForSOP(formName)
{
  var inputObjs = document.getElementsByTagName('INPUT');
  for(var i = 0; i < inputObjs.length; i++) 
  {
	alert(inputObjs[i].type+" "+inputObjs[i].name);
	alert("formname = "+document.forms[form].name);
	alert("element name = "+document.forms[form].elements[inputObjs[i].name].value);
  }
}

/**
 * L�dt das Captcha-Image neu
 */
function changeCaptchaImage(imageId, imagesrc, btnCaptchaId)
{      
	// alert("test");
  document.getElementById(imageId).src = imagesrc + '?captchaId=' + Math.random(); 
  document.getElementById(btnCaptchaId).disabled = 'disabled';
  // window.setTimeout("activateCaptchaButton('btnCaptchaId')", 3000);
} 

function deactivateElementById(elementId)
{
	changeVisibilityOfElementById(elementId,'none');
}
function activateElementById(elementId)
{
	changeVisibilityOfElementById(elementId,'');
}
function activateElementByIdByTime(elementId, milliSecondsUntilActivate)
{
	setTimeout("changeVisibilityOfElementById('"+elementId+"','');", milliSecondsUntilActivate);
}
function switchVisibilityOfElementById(elementId)
{
	var visString;
	// DOM3 = IE5, NS6
	if(document.getElementById)
		visString = document.getElementById(elementId).style.display;
    else
    {
    	// Netscape 4
    	if(document.layers)
    		visString = document.elementId.display;
    	// IE 4
    	else
    		visString = document.all.elementId.style.display;
    }
	if(visString == 'none')
		visString = '';
	else
		visString = 'none';
	changeVisibilityOfElementById(elementId,visString);
}
function changeVisibilityOfElementById(elementId,visString)
{
	// DOM3 = IE5, NS6
	if(document.getElementById)
		document.getElementById(elementId).style.display = visString;
    else
    {
    	// Netscape 4
    	if(document.layers)
    		document.elementId.display = visString;
    	// IE 4
    	else
    		document.all.elementId.style.display = visString;
    }
}
function changeTextOfHrefByElementId(elementId,textOfHref)
{
	// DOM3 = IE5, NS6
	if(document.getElementById)
		visString = document.getElementById(elementId).innerHTML = textOfHref;
    else
    {
    	// Netscape 4
    	if(document.layers)
    		visString = document.elementId.innerHTML = textOfHref;
    	// IE 4
    	else
    		visString = document.all.elementId.innerHTML = textOfHref;
    }
}

function getColumnsOfFrameById(frameId,searchParent)
{
	if(searchParent == '1')
	{
		// DOM3 = IE5, NS6
		if(document.getElementById)
			return parent.document.getElementById(frameId).cols;
	    else
	    {
	    	// Netscape 4
	    	if(document.layers)
	    		return parent.document.frameId.cols;
	    	// IE 4
	    	else
	    		return parent.document.all.frameId.cols;
	    }
	}
	else
	{
		// DOM3 = IE5, NS6
		if(document.getElementById)
			return document.getElementById(frameId).cols;
	    else
	    {
	    	// Netscape 4
	    	if(document.layers)
	    		return document.frameId.cols;
	    	// IE 4
	    	else
	    		return document.all.frameId.cols;
	    }
	}
}

function changeColumnsOfFrameById(frameId,searchParent,newColumns)
{
	if(searchParent == '1')
	{
		// DOM3 = IE5, NS6
		if(document.getElementById)
			parent.document.getElementById(frameId).cols = newColumns;
	    else
	    {
	    	// Netscape 4
	    	if(document.layers)
	    		parent.document.frameId.cols = newColumns;
	    	// IE 4
	    	else
	    		parent.document.all.frameId.cols = newColumns;
	    }
	}
	else
	{
		// DOM3 = IE5, NS6
		if(document.getElementById)
			document.getElementById(frameId).cols = newColumns;
	    else
	    {
	    	// Netscape 4
	    	if(document.layers)
	    		document.frameId.cols = newColumns;
	    	// IE 4
	    	else
	    		document.all.frameId.cols = newColumns;
	    }
	}
}

function getTextOfHrefByElementId(elementId)
{
	// DOM3 = IE5, NS6
	if(document.getElementById)
		return document.getElementById(elementId).innerHTML;
    else
    {
    	// Netscape 4
    	if(document.layers)
    		return document.elementId.innerHTML;
    	// IE 4
    	else
    		return ocument.all.elementId.innerHTML;
    }
}

function changeTextOfHrefDependingValue(elementId, checkText, switchText)
{
	// alert("e = "+elementId+" t1 = "+checkText+" s1 = "+switchText);
	if(getTextOfHrefByElementId(elementId) == checkText)
		changeTextOfHrefByElementId(elementId,switchText);
	else
		changeTextOfHrefByElementId(elementId,checkText);
}

function changeImageById(imageId, imageSrc)
{
	// DOM3 = IE5, NS6
	if(document.getElementById)
		document.getElementById(imageId).src = imageSrc;
    else
    {
    	// Netscape 4
    	if(document.layers)
    		document.imageId.src = imageSrc;
    	// IE 4
    	else
    		document.all.imageId.src = imageSrc;
    }
}

function changeTitleOfImageById(imageId, newTitle)
{
	// DOM3 = IE5, NS6
	if(document.getElementById)
		document.getElementById(imageId).title = newTitle;
    else
    {
    	// Netscape 4
    	if(document.layers)
    		document.imageId.title = newTitle;
    	// IE 4
    	else
    		document.all.imageId.title = newTitle;
    }
}

function showHideOneRowByIdStart(ocAllImageId, openImageSrc, closeImageSrc, openImageTitle, closeImageTitle, headerRowIdStart, ocImageIdStart, rowIdStart)
{
	// Bild pro Row zum Aufklappen
	var newImageSrcForRows;
	var openRow = "0";
	var eleOneRowImage = searchAndGetElementById(ocImageIdStart,'0');
	// alert("src="+eleAllImage.src+" -> openImageSrc="+openImageSrc);
	if(eleOneRowImage.src == openImageSrc)
	{
		eleOneRowImage.src = closeImageSrc;
		eleOneRowImage.title = closeImageTitle;
		newImageSrcForRows = closeImageSrc;	
		openRow = "1";
	}
	else
	{
		eleOneRowImage.src = openImageSrc;
		eleOneRowImage.title = openImageTitle;
		newImageSrcForRows = openImageSrc;		
	}
	// Header aufklappen
	if(openRow == "1")
	{
		var eleAllImage = searchAndGetElementById(ocAllImageId,'0');
		if(eleAllImage.src == openImageSrc)
		{
			eleAllImage.src = closeImageSrc;
		}
	}
	// alert("openRow="+openRow);
	// AllTables
	var allTables;
	if(document.getElementById)
		allTables = document.inputForm.getElementsByTagName("table");
	else
	{
		if(document.layers)
			allTables = document.getElementsByTagName("table");
		else
			allTables = document.all.getElementsByTagName("table");
	}
	// alert("allElements = "+allElements);
	// Durch alle Elemente laufen
	for(var i = 0; i < allTables.length; i++) 
	{
		if(allTables[i].id != null && allTables[i].id != "")
		{
			// alert("table id="+allTables[i].id+" -> search for="+rowIdStart+"
			// -> index="+allTables[i].id.indexOf(rowIdStart));
			// Die header-row anzeigen/verbergen
			if(allTables[i].id.indexOf(headerRowIdStart) != -1)
			{
				// alert("table gefunden");
				if(openRow == "1")
					activateElementById(allTables[i].id);
			}
			// Die Row anzeigen/verbergen
			else if(allTables[i].id.indexOf(rowIdStart) != -1)
			{
				// alert("table gefunden");
				if(openRow == "1")
					activateElementById(allTables[i].id);
				else
					deactivateElementById(allTables[i].id);
			}
		}
	}
}

function showHideAllRowsByIdStart(ocAllImageId, openImageSrc, closeImageSrc, openImageTitle, closeImageTitle, headerRowIdStart, ocImageIdStart, rowIdStart)
{
	// Bild ganz oben zum Aufklappen des Headers
	var newImageSrcForRows;
	var openRow = "0";
	var eleAllImage = searchAndGetElementById(ocAllImageId,'0');
	// alert("src="+eleAllImage.src+" -> openImageSrc="+openImageSrc);
	if(eleAllImage.src == openImageSrc)
	{
		eleAllImage.src = closeImageSrc;
		eleAllImage.title = closeImageTitle;
		newImageSrcForRows = closeImageSrc;	
		openRow = "1";
	}
	else
	{
		eleAllImage.src = openImageSrc;
		eleAllImage.title = openImageTitle;
		newImageSrcForRows = openImageSrc;		
	}
	// alert("openRow="+openRow);
	// AllTables
	var allTables;
	if(document.getElementById)
		allTables = document.inputForm.getElementsByTagName("table");
	else
	{
		if(document.layers)
			allTables = document.getElementsByTagName("table");
		else
			allTables = document.all.getElementsByTagName("table");
	}
	// alert("allElements = "+allElements);
	// Durch alle Elemente laufen
	for(var i = 0; i < allTables.length; i++) 
	{
		if(allTables[i].id != null && allTables[i].id != "")
		{
			// alert("table id="+allTables[i].id+" -> search for="+rowIdStart+"
			// -> index="+allTables[i].id.indexOf(rowIdStart));
			// Die header-row anzeigen/verbergen
			if(allTables[i].id.indexOf(headerRowIdStart) != -1)
			{
				// alert("table gefunden");
				if(openRow == "1")
					activateElementById(allTables[i].id);
				else
					deactivateElementById(allTables[i].id);
			}
			// Die Row anzeigen/verbergen
			else if(allTables[i].id.indexOf(rowIdStart) != -1)
			{
				// alert("table gefunden");
				if(openRow == "1")
					activateElementById(allTables[i].id);
				else
					deactivateElementById(allTables[i].id);
			}
		}
	}
	// Images
	var allImages;
	if(document.getElementById)
		allImages = document.inputForm.getElementsByTagName("img");
	else
	{
		if(document.layers)
			allImages = document.getElementsByTagName("img");
		else
			allImages = document.all.getElementsByTagName("img");
	}
	for(var i = 0; i < allImages.length; i++) 
	{
		if(allImages[i].id != null && allImages[i].id != "")
		{
			// alert("img id="+allImages[i].id+" -> search
			// for="+ocImageIdStart);
			// Globales Icon
			if(allImages[i].id.indexOf(ocAllImageId) != -1)
			{
				// alert("image gefunden");
				allImages[i].src = newImageSrcForRows;
			}
			// Das Icon der Row wechseln
			else if(allImages[i].id.indexOf(ocImageIdStart) != -1)
			{
				// alert("image gefunden");
				allImages[i].src = newImageSrcForRows;
			}
		}
	}
}

function isFontIconVersion(iconsetVersion)
{
	return iconsetVersion == '2' || iconsetVersion == '3';
}

function resizeLeftFrame(leftImage, rightImage, iconsetVersion, color)
{	
	if($('#leftMenuDiv',window.parent.document).size() > 0){
		if($('#leftMenuDiv',window.parent.document).width() > 45){
			$('#leftMenuDiv',window.parent.document).css('width','40px');
			$('#leftMenuDiv',window.parent.document).addClass('leftMenuSmall');
			$('#infoBoxDiv',window.parent.document).css('width','40px');
			$('#infoBoxDiv',window.parent.document).addClass('leftMenuSmall');
			$('#content_div',window.parent.document).css('left','40px');
			$('#content_div',window.parent.document).addClass('contentDivBig');
			$('#lMenuDiv').hide();
			
			if(iconsetVersion != undefined && isFontIconVersion(iconsetVersion))
			{
				$('#moveFrameLeftRightImage').removeClass(leftImage).addClass(rightImage);
			}
			else
			{
				changeImageById('moveFrameLeftRightImage', rightImage);
			}
		}else{
			$('#leftMenuDiv',window.parent.document).css('width','20%');
			$('#leftMenuDiv',window.parent.document).removeClass('leftMenuSmall');
			$('#infoBoxDiv',window.parent.document).css('width','20%');
			$('#infoBoxDiv',window.parent.document).removeClass('leftMenuSmall');
			$('#content_div',window.parent.document).css('left','20%');
			$('#content_div',window.parent.document).removeClass('contentDivBig');
			$('#lMenuDiv').show();
			
			if(iconsetVersion != undefined && isFontIconVersion(iconsetVersion))
			{
				$('#moveFrameLeftRightImage').removeClass(rightImage).addClass(leftImage);
			}
			else
			{
				changeImageById('moveFrameLeftRightImage', leftImage);
			}
		}
	}
	else if(isFrameSetDetected('textFrame'))
	{
		// alert("rows="+parent.document.getElementById('textFrame').cols);
		if(getColumnsOfFrameById('textFrame','1') == "20%,80%")
		{
			changeColumnsOfFrameById('textFrame','1','2%,98%');
			changeVisibilityOfElementById('mtmtable','none');
			changeImageById('moveFrameLeftRightImage', rightImage);
			// changeTitleOfImageById('moveFrameLeftRightImage',
			// rightImageTitle);
		}
		else
		{
			changeColumnsOfFrameById('textFrame','1','20%,80%');
			changeVisibilityOfElementById('mtmtable','');
			changeImageById('moveFrameLeftRightImage', leftImage);
			// changeTitleOfImageById('moveFrameLeftRightImage',
			// leftImageTitle);
		}
	}
	else
	{
		var ele = searchAndGetElementById('leftMenuResizeColumn','1');
		if(ele != null)
		{
			if(ele.style.width == '' || ele.style.width == '20%')
			{
				ele.style.width = "2%";
				changeVisibilityOfElementById('lMenuDiv','none');
				changeImageById('moveFrameLeftRightImage', rightImage);
			}
			else
			{
				ele.style.width = "20%";
				changeVisibilityOfElementById('lMenuDiv','');
				changeImageById('moveFrameLeftRightImage', leftImage);
			}
		}
		
	}
}

function resizeInfoBox(imageId, openImage, closeImage, iconsetVersion, color)
{
	// alert("left="+leftImage+" right="+rightImage);
	var infoBoxManState = searchAndGetElementById('info_box_man_state','1');
	// open
	if(infoBoxManState.value.length == 0 || infoBoxManState.value == '0')
	{
		if($('#leftMenuDiv',window.parent.document).size() > 0) 
		{
			// div layout
			// TL 2015-10-09 for CRM
			if (window.location.href.toLowerCase().indexOf('customer') >= 0)
			{
				$('#leftMenuDiv',window.parent.document).css('height','auto').css('bottom','250px');
				$('#infoBoxDiv',window.parent.document).css('height',($(window.parent).height() > 100 ? 250 : $(window.parent).height())+'px');
			}
			else
			{
				$('#leftMenuDiv',window.parent.document).css('height','auto').css('bottom','100px');
				$('#infoBoxDiv',window.parent.document).css('height',($(window.parent).height() > 100 ? 100 : $(window.parent).height())+'px');
			}
		}
		else
		{
			// table layout
			var ele = searchAndGetElementById('leftMenu','1');
			ele.height = '75%';
			var ele2 = searchAndGetElementById('infoBox','1');
			ele2.height = '25%';
		}
		
		if(iconsetVersion != undefined && isFontIconVersion(iconsetVersion))
		{
			$("#" + imageId).removeClass(openImage).addClass(closeImage);
		}
		else
		{
			changeImageById(imageId, closeImage);
		}
		
		infoBoxManState.value = '1';
	}
	else // close
	{
		if($('#leftMenuDiv',window.parent.document).size() > 0){
			// div layout
			$('#leftMenuDiv',window.parent.document).css('height','auto').css('bottom',(25+$(window).height() - window.innerHeight)+'px');
			$('#infoBoxDiv',window.parent.document).css('height',(25+$(window).height() - window.innerHeight)+'px');
		}else{
			// table layout
			var ele = searchAndGetElementById('leftMenu','1');
			ele.height = '95%';
			var ele2 = searchAndGetElementById('infoBox','1');
			ele2.height = '5%';
		}
		
		if(iconsetVersion != undefined && isFontIconVersion(iconsetVersion))
		{
			$("#" + imageId).removeClass(closeImage).addClass(openImage);
		}
		else
		{
			changeImageById(imageId, openImage);
		}
		
		infoBoxManState.value = '0';
	}
}

function searchAndGetElementById(elementId, isSearchParent)
{
	// alert("u "+elementId+" is "+isSearchParent);
	if(isSearchParent == '1')
	{
		// DOM3 = IE5, NS6
		if(document.getElementById)
			return parent.document.getElementById(elementId);
		else
	    {
	    	// Netscape 4
	    	if(parent.document.layers)
	    		return parent.document.elementId;
	    	// IE 4
	    	else
	    		return parent.document.all.elementId;
	    }
	}
	else
	{
		// DOM3 = IE5, NS6
		if(document.getElementById)
			return document.getElementById(elementId);
		else
	    {
	    	// Netscape 4
	    	if(document.layers)
	    		return document.elementId;
	    	// IE 4
	    	else
	    		return document.all.elementId;
	    }
	}
}

function searchAndGetElementByName(elementName, isSearchParent)
{
	if(isSearchParent == '1')
	{
		return parent.document.getElementsByName(elementName)[0];
	}
	else
	{
		document.getElementsByName(elementName)[0];
	}
	
}

function resizeTopFrame(idFrame, isSearchParent, newRows)
{
	// alert("left="+leftImage+" right="+rightImage);
	changeRowsOfFrameById(idFrame,isSearchParent,newRows);
}



/*
 * Pr�ft, ob das Frameset existiert
 */
function isFrameSetDetected(frameId)
{
	// DOM3 = IE5, NS6
	if(document.getElementById)
	{
		if(parent.document.getElementById(frameId) != null)
			return true;
		else
			return false;
	}
    else
    {
    	// Netscape 4
    	if(document.layers)
    	{
    		if(parent.document.frameId != null)
    			return true;
    		else
    			return false;
    	}
    	// IE 4
    	else
    	{
    		if(parent.document.all.frameId != null)
    			return true;
    		else
    			return false;
    	}
    }
}

function setVerlaufForPopItHeader(hiddenValue)
{
	// alert("value = "+hiddenValue);
	var ele = searchAndGetElementById('verlauf_hidden_element','1');
	if(ele != null)
	{
		ele.value = hiddenValue;
	}
}
function getVerlaufForPopItHeader()
{
	var ele = searchAndGetElementById('verlauf_hidden_element','1');
	if(ele != null)
		return ele.value;
	else
		return '';
}

function setFavoritenForPopItHeader(hiddenValue)
{
	// alert("value = "+hiddenValue);
	var ele = searchAndGetElementById('favoriten_hidden_element','1');
	if(ele != null)
	{
		ele.value = hiddenValue;
	}
}
function getFavoritenForPopItHeader()
{
	var ele = searchAndGetElementById('favoriten_hidden_element','1');
	if(ele != null)
		return ele.value;
	else
		return '';
}

/*
 * �berpr�fung auf Email-Tauglichkeit und vergleich beider Email-String
 * miteinander auf "Gleichheit"
 */
function isValidEmailAdressAndAnotherField(emailStr, emailStr2, errorMsg, errorMsg2) 
{
  // alert("emailStr="+emailStr+" emailStr2="+emailStr2);
  // Zun�chst die Email auf Tauglichkeit �berpr�fen
  // if(emailStr.length == 0)
  // {
  // alert(errorMsg2);
  // return false;
  // }
  if(isValidEmailAdress(emailStr,errorMsg2) == false)
    return false;
  // Jetzt beide auf Gleichheit �berpr�fen
  if(emailStr == emailStr2)
  	return true;
  if(errorMsg) alert(errorMsg);
  return false;
}

/*
 * �berpr�fung mehrerer Email-Adressen
 */
function isValidMultipleEmailAdressesNew(emailStr, emailStrDivider)
{
	var ret = true;
	$.each(emailStr.split(emailStrDivider), function(key,val){
		if(!val.match(/^[^\\\\W][a-zA-Z0-9\\\\_\\\\-\\\\.]+([a-zA-Z0-9\\\\_\\\\-\\\\.]+)*\\\\@[a-zA-Z0-9_]+(\\\\.[a-zA-Z0-9_]+)*\\\\.[a-zA-Z]{2,4}$/))
			ret = false;
	});
	return ret;
}

function isValidMultipleEmailAdresses(emailStr, emailStrDivider, errorMsg)
{
	// mehrere
	if(emailStr.indexOf(emailStrDivider) > 0)
	{
		var splittedEmails = emailStr.split(emailStrDivider);
		// alert("l = "+splittedEmails.length+", sp = "+splittedEmails);
		for(i=0; i<splittedEmails.length; i++) 
		{
			// Zuerst pr�fen ob gef�llt
			if(isEmpty(splittedEmails[i]))
			{
				alert(errorMsg);
				return false;
			}
			// Pr�fen ob korrekt
			if(isValidEmailAdress(splittedEmails[i],errorMsg) == false)
			    return false;
		}
	}
	// nur eine
	else
	{
		// Pr�fen ob korrekt
		if(isValidEmailAdress(emailStr,errorMsg) == false)
		    return false;
	}
	return true;
}

function isCheckNullable(email, colName)
{
	var isNullable = jQuery('[name="' + colName + '"]').hasClass('nullable');
	
	return email || isNullable;
}

function isValidEmailAdress(email, errorMsg) {
    if(errorMsg == 'noMsg') 
		errorMsg = null;
	else
		errorMsg = "\"" + email+"\": "+errorMsg;
    
    // Falls leer dann keine Prüfung
    if(email.length == 0) return true;
    
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var ret = re.test(String(email).toLowerCase());
    if(!ret && errorMsg)
    	alert(errorMsg);
    return ret;
}
/*
 * �berpr�fung einer g�ltigen E-Mail-Adresse
 */
function isValidEmailAdressOld (emailStr, errorMsg) 
{
	// Falls String leer, dann keine Pr�fung, da die Pr�fung auf leer schon
	// vorher
	// stattgefunden haben sollte
	if(emailStr.length == 0) return true;	if(errorMsg == null) errorMsg = INVALID_EMAIL_ADR;
	if(errorMsg == 'noMsg') 
		errorMsg = null;
	else
		errorMsg = emailStr+": "+errorMsg;
	// gsch trim
	try{
		if(emailStr != emailStr.trim()){
			$('input:field-value(*'+emailStr+')').each(function(){
				$(this).val($(this).val().replace(/\s/g, ""));
			});
			emailStr = emailStr.trim();
		}
	}catch(err){}
	
	/*
	 * The following variable tells the rest of the function whether or not to
	 * verify that the address ends in a two-letter country or well-known TLD. 1
	 * means check it, 0 means don't.
	 */
	
	var checkTLD=1;
	
	/* The following is the list of known TLDs that an e-mail address must end with. */
	
	var knownDomsPat=/^(com|net|org|online|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum|blue)$/;
	
	/*
	 * The following pattern is used to check if the entered e-mail address fits the
	 * user@domain format. It also is used to separate the username from the domain.
	 */
	
	var emailPat=/^(.+)@(.+)$/;
	
	/*
	 * The following string represents the pattern for matching all special
	 * characters. We don't want to allow special characters in the address. These
	 * characters include ( ) < > @ , ; : \ " . [ ]
	 */
	
	var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
	
	/*
	 * The following string represents the range of characters allowed in a username
	 * or domainname. It really states which chars aren't allowed.
	 */
	
	var validChars="\[^\\s" + specialChars + "\]";
	
	/*
	 * The following pattern applies if the "user" is a quoted string (in which
	 * case, there are no rules about which characters are allowed and which aren't;
	 * anything goes). E.g. "jiminy cricket"@disney.com is a legal e-mail address.
	 */
	
	var quotedUser="(\"[^\"]*\")";
	
	/*
	 * The following pattern applies for domains that are IP addresses, rather than
	 * symbolic names. E.g. joe@[123.124.233.4] is a legal e-mail address. NOTE: The
	 * square brackets are required.
	 */
	
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	
	/*
	 * The following string represents an atom (basically a series of non-special
	 * characters.)
	 */
	
	var atom=validChars + '+';
	
	/*
	 * The following string represents one word in the typical username. For
	 * example, in john.doe@somewhere.com, john and doe are words. Basically, a word
	 * is either an atom or quoted string.
	 */
	
	var word="(" + atom + "|" + quotedUser + ")";
	
	// The following pattern describes the structure of the user
	
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	
	/*
	 * The following pattern describes the structure of a normal symbolic domain, as
	 * opposed to ipDomainPat, shown above.
	 */
	
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
	
	/* Finally, let's start trying to figure out if the supplied address is valid. */
	
	/*
	 * Begin with the coarse pattern to simply break up user@domain into different
	 * pieces that are easy to analyze.
	 */
	
	var matchArray=emailStr.match(emailPat);
	
	if (matchArray==null) {
	
	/*
	 * Too many/few @'s or something; basically, this address doesn't even fit the
	 * general mould of a valid e-mail address.
	 */
	
	// alert("Email address seems incorrect (check @ and .'s)");
	if(errorMsg) alert(errorMsg);
	return false;
	}
	var user=matchArray[1];
	var domain=matchArray[2];
	
	// Start by checking that only basic ASCII characters are in the strings
	// (0-127).
	
	for (i=0; i<user.length; i++) 
	{
	  // alert(i+" -> "+user+" -> code = "+user.charCodeAt(i)+ " ->
		// "+user.charAt(i));
	  if (user.charCodeAt(i)>127) 
	  {
	    // alert("This username contains invalid characters.");
	    // alert(errorMsg+" -> "+i+" -> "+user+" -> code = "+user.charCodeAt(i)+ "
		// -> "+user.charAt(i));
	    return false;
	  }
	}
	for (i=0; i<domain.length; i++) {
	if (domain.charCodeAt(i)>127) {
	// alert("This domain name contains invalid characters.");
	if(errorMsg) alert(errorMsg);
	return false;
   }
}

// See if "user" is valid

if (user.match(userPat)==null) {

// user is not valid

// alert("The username doesn't seem to be valid.");
if(errorMsg) alert(errorMsg);
return false;
}

/*
 * if the e-mail address is at an IP address (as opposed to a symbolic host
 * name) make sure the IP address is valid.
 */

var IPArray=domain.match(ipDomainPat);
if (IPArray!=null) 
{
	// this is an IP address
	for (var i=1;i<=4;i++) 
	{
		if (IPArray[i]>255) 
		{
			// alert("Destination IP address is invalid!");
			if(errorMsg) alert(errorMsg);
			return false;
  	}
	}
	return true;
}

// Domain is symbolic name. Check if it's valid.
 
var atomPat=new RegExp("^" + atom + "$");
var domArr=domain.split(".");
var len=domArr.length;
for (i=0;i<len;i++) 
{
	if (domArr[i].search(atomPat)==-1) 
	{
	// alert("The domain name does not seem to be valid.");
	if(errorMsg) alert(errorMsg);
return false;
  }
}

/*
 * domain name seems valid, but now make sure that it ends in a known top-level
 * domain (like com, edu, gov) or a two-letter word, representing country (uk,
 * nl), and that there's a hostname preceding the domain or country.
 */
// SB, 24.06.2009, Domain-Namen der L�nge 3 sind erlaubt
// if (checkTLD && domArr[domArr.length-1].length!=2 &&
if (checkTLD && domArr[domArr.length-1].length!=2 && domArr[domArr.length-1].length!=3 && 
domArr[domArr.length-1].search(knownDomsPat)==-1) {
// alert("The address must end in a well-known domain or two letter " +
// "country.");
if(errorMsg) alert(errorMsg);
return false;
}

// Make sure there's a host name preceding the domain.

if (len<2) {
// alert("This address is missing a hostname!");
if(errorMsg) alert(errorMsg);
return false;
}

// If we've gotten this far, everything's valid!
return true;
}
/*
 * �berpr�fung der noch verbleibenden Zeichen in einem Text-Area-Feld
 */
function countCharacters(maxLength,countField,checkField,message) 
{
	var tmpCheckField;
	if(typeof checkField.value == 'undefined')
	{
		tmpCheckField = document.getElementById(checkField);
		if(typeof tmpCheckField.value !== 'undefined')
			checkField = tmpCheckField;
	}
	
	var tmpCountField;
	if(typeof countField.innerText == 'undefined')
	{
		tmpCountField = document.getElementById(countField);
		if(typeof tmpCountField.innerText !== 'undefined')
			countField = tmpCountField;
	}
	
	rest = maxLength-(typeof checkField.value !== 'undefined' ? checkField.value.length : checkField.length); 
	if (rest < 0) 
	{ 
		alert(message); 
		checkField.value = checkField.value.substring(0,maxLength); 
		if(document.all)
			countField.innerText = 0;
		else
			countField.textContent = 0;
			
	} 
	else 
		if(document.all)
			countField.innerText = maxLength - (typeof checkField.value !== 'undefined' ? checkField.value.length : checkField.length); 
		else
			countField.textContent = maxLength - (typeof checkField.value !== 'undefined' ? checkField.value.length : checkField.length); 
} 
function click (e) 
{
  if (!e)
    e = window.event;
  /*
	 * if(e.type) alert("type = "+e.type); if(e.button) alert("button =
	 * "+e.button); if(e.which) alert("which = "+e.which);
	 */
  if ((e.type && e.type == "contextmenu") || (e.button && e.button == 2) || (e.which && e.which == 3)) 
  {
    if(window.opera)
      window.alert("Sorry: Right Mouse Click not allowed!");
    else
      alert("Sorry: Right Mouse Click not allowed!");
    return false;
  }
  alert("nix");
  return true;
}
function onLoadRMB()
{
  if (document.layers)
   document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = click;
  document.oncontextmenu = click;
}

function emptyFunction()
{
}
function setImagesForHiddenTinyElement(images)
{
	// alert(images);
	parent.document.inputForm.all_images_for_tiny.value = images;
	// alert("value of all_images_for_tiny =
	// "+parent.document.inputForm.all_images_for_tiny.value);
}
function heute(field, datevalue) 
{ 
	document.getElementById(field).value = datevalue;
	document.getElementById(field).focus();
	if(jQuery)
		$('#'+field).change();
}
function wait(milsecs)
{
	var to_time = new Date().getTime() + milsecs;
	while( new Date().getTime() < to_time ){}
	return true;
}
function attachValueToElement(elementId, searchParent, attachDelimeter, attachValue, successMsg)
{
	var ele = searchAndGetElementById(elementId, searchParent);
	if(!ele)
		ele = searchAndGetElementByName(elementId, searchParent);
	if(ele)
	{
		if(ele.value.length > 0)
			ele.value = ele.value + attachDelimeter + attachValue;
		else
			ele.value = attachValue;
		if(successMsg != '')
			alert(successMsg);		
	}
}
function readNewMainFrameByTime(time)
{
	activateDeactivateScreen('visible');
	window.setTimeout("readNewMainFrame()", time);	
	return true;
}
function readNewMainFrame()
{
	document.inputForm.readNew.value='1'; 
	document.inputForm.readCol.value='readNewMainFrame'; 
	document.inputForm.manSubmit.value=true; 
	jQuery(document.inputForm).trigger('submit');
	return true;
}

// TL 2012-11-19 IBan Check, see: http://www.morfoedro.info/img.php?n=187
function isValidIban(iBanStr, errorMsg, onlySEPA, sepaMsg) 
{ 
	// gsch falls nullable und leer dann nicht checken, falls wie maske dann
	// leeren
	if($(':input[name*="iban"][class*="ullable"]').length > 0){
		if(iBanStr.length > 0 && (iBanStr.indexOf('XX') == 0 || iBanStr.indexOf('????') > 0)){
			iBanStr = '';
			$(':input[name*="iban"][class*="ullable"]').val('');
		}
		if(iBanStr.length == 0)
			return true;
	}
	// TL 2014-02-14
	iBanStr = iBanStr.replace(/\s/g, '');
	if (iBanStr.length > 0)
	{
		if (iBanStr.length < 5 || iBanStr.length > 34) { if(errorMsg) alert(errorMsg); return false; } 

		var iBanRev = iBanStr.substring(4) + iBanStr.substring(0, 4);
		var result = 0;
		for (i = 0; i < iBanRev.length; i++ ) 
		{ 
			curr = iBanRev.charCodeAt(i); 
			if (48 <= curr && curr <= 57) 
			{ 
				if (i == iBanRev.length-4 || i == iBanRev.length-3) { if(errorMsg) alert(errorMsg); return false; } 
				k = curr - 48; 
			} 
			else if (65 <= curr && curr <= 90) 
			{ 
				if (i == iBanRev.length-2 || i == iBanRev.length-1) { if(errorMsg) alert(errorMsg); return false; } 
				k = curr - 55; 
			} 
			else { if(errorMsg) alert(errorMsg); return false; } 
			if (k > 9) 
				result = (100 * result + k) % 97;
			else 
				result = (10 * result + k) % 97;
		} 
		if (result != 1) 
		{ 
			if(errorMsg) alert(errorMsg); return false; 
		}
		// SEPA check
		if(onlySEPA)
		{
			var sepaPat = new RegExp("^(?:IT|SM|NL|LV|BG|GB|IE|GI|RO|MT|NO|DK|FI|FO|SI|AT|EE|LU|LT|HR|LI|CH|DE|CZ|ES|SK|SE|PT|IS|BE|FR|MC|GR|PL|HU|CY).*");
			var matchArray = iBanStr.match(sepaPat);
			
			if(matchArray == null) 
			{
				if(sepaMsg)
					alert(sepaMsg);
				else if(errorMsg) 
					alert(errorMsg+" test");
				return false; 
			}
		}
		
// alert('done, iban correct');
		return true;
	}
	else return false;
}

// TL 2012-11-19 BIC/SWIFT check, only regExp for now
function isValidBic(bicStr, errorMsg)
{
	if (bicStr.length > 0)
	{
		var pattern = new RegExp("^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$");
		if (pattern.test(bicStr) == true)
		{
// alert('bic done');
			return true;
		}
		else
		{
			if(errorMsg) alert(errorMsg);
			return false;
		}
	}
	else return true;
}

// gsch 2013-2-6 neuberechnung der div und frame gr��en aus leftMenuDTree
// Template heraus und hier her, damit es �fters ausgef�hrt werden kann
function calculateNewDivHeight()
{
	var ele = searchAndGetElementById('middle_div','1');
	var divSet =  searchAndGetElementById('middle_div_height_set','1');
	// alert("ele = "+ele+" div = "+divSet);
	if(ele != null && divSet != null && divSet.value == "0") 
	{
		if(!-[1,]){ // letzteres damit es nur im Internet explorer ausgef�hrt
					// wird
			var myHeight = $(ele).height();
			// alert(myHeight);
			ele.style.height = (myHeight - 74) + "px";
			ele.style.top = "72px";
			divSet.value = "1";
			// alert(searchAndGetElementById('middle_div','1').style.height);
		}else{
			ele.style.height = "";
			ele.style.bottom = "0px"
		}
	}
}
// Utf8.encode('string') und decode
var Utf8 = {
		// public method for url encoding
		encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	 
			for (var n = 0; n < string.length; n++) {
	 
				var c = string.charCodeAt(n);
	 
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
	 
		// public method for url decoding
		decode : function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
	 
			while ( i < utftext.length ) {
	 
				c = utftext.charCodeAt(i);
	 
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	}

// TL 2013-03-20 check lat/long
function isValidLatLong(input, errorMsg, isLat)
{
	if (input && input.length > 0)
	{
		val = parseFloat(input);
		if (!isNaN(val))
		{
			if(isLat == 1)
			{
				if(val <= 90 && val >= -90)
				{
					return true;
				}
					
			}
			else if (val <= 180 && val >= -180)
			{
				return true;
			}
		}
		if(errorMsg) alert(errorMsg);
		return false;
	}
	return true;
}

function addColPicker(field, colimage){
	var col = $('input[name="'+field+'"]').val();
	if(col.length < 5){
		col = $('input[name="'+field+'"]').css('border-color');
		if(!col)
			col = '#d3d3d3';
		if(col.indexOf('#') < 0 )
			col = rgb2hex(col);
	}
	
	$('input[name="'+field+'"]')
		.attr('autocomplete','off')
		.css('border-right','16px solid')
		.css('border-color',col)
		.css('border-right-color',col)
		.css('background-position','right')
		.css('background-repeat','no-repeat')
		.css('background-image','url('+colimage+')');
	
	$('input[name="'+field+'"]').colpick({
		submit:0,
		color: col.replace('#',''),
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			if(!bySetColor) $(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});
}

function rgb2hex(rgb) {
	if(rgb !== undefined && rgb){
	    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+))?\)$/);
	    function hex(x) {
	        return ("0" + parseInt(x).toString(16)).slice(-2);
	    }
	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}else
    	return '';
}
function isGlobaLoadingFrameActive()
{
	if($('#globalLoadingPage').size() > 0)
	{
		return $('#globalLoadingPage').is(":visible");
	}
	else if($('#globalLoadingPage', parent.document).size() > 0)
	{
		return $('#globalLoadingPage', parent.document).is(":visible");
	}
	else if($('#globalLoadingPage', parent.parent.document).size() > 0)
	{
		return $('#globalLoadingPage', parent.parent.document).is(":visible");
	}
}
function detectGlobalLoadingFrame()
{
	if($('#globalLoadingPage').size() > 0)
		return true;
	else if($('#globalLoadingPage', parent.document).size() > 0)
		return true;
	else if($('#globalLoadingPage', parent.parent.document).size() > 0)
		return true;
	return false;
}
function activateGlobalLoadingFrame(text)
{
	if($('#globalLoadingPage').size() > 0)
	{
		$('#globalLoadingPageLoadingMsgDiv').html(text);
		$('#globalLoadingPage').show();
		$('#cancelRequestDivLoadingProgressBar').hide();
	}
	else if($('#globalLoadingPage', parent.document).size() > 0)
	{
		$('#globalLoadingPageLoadingMsgDiv', parent.document).html(text);
		$('#globalLoadingPage', parent.document).show();
		$('#cancelRequestDivLoadingProgressBar', parent.document).hide();
	}
	else if($('#globalLoadingPage', parent.parent.document).size() > 0)
	{
		$('#globalLoadingPageLoadingMsgDiv', parent.parent.document).html(text);
		$('#globalLoadingPage', parent.parent.document).show();
		$('#cancelRequestDivLoadingProgressBar', parent.parent.document).hide();
	
	}
	else if($('#globalLoadingPage', parent.parent.parent.document).size() > 0)
	{
		$('#globalLoadingPageLoadingMsgDiv', parent.parent.parent.document).html(text);
		$('#globalLoadingPage', parent.parent.parent.document).show();
	}
}
function deactivateGlobalLoadingFrame()
{
	try{
		if($('#globalLoadingPage').size() > 0)
			$('#globalLoadingPage').hide();
		if($('#globalLoadingPage', parent.document).size() > 0)
			$('#globalLoadingPage', parent.document).hide();
		if($('#globalLoadingPage', parent.parent.document).size() > 0)
			$('#globalLoadingPage', parent.parent.document).hide();
		if($('#globalLoadingPage', parent.parent.parent.document).size() > 0)
			$('#globalLoadingPage', parent.parent.parent.document).hide();
	}catch(ex){}
}

// user menu effects and navigation
function initUserMenu()
{
// $('.userMenuTile', parent.document).mouseover(function(){
// $(this).switchClass( "userMenuInactive", "userMenuActive");
// });
// $('.userMenuTile', parent.document).mouseout(function(){
// $(this).switchClass( "userMenuActive", "userMenuInactive");
// });
	$('.userMenuTile', parent.document).click(function(){
		if($(this).attr('link'))
			$('iframe#text', parent.document).attr('src',$(this).attr('link'));
	});
}

// fixedHeaderFooter
function fixTableHeaderFooter(image, label, iconsetVersion, color){
	var fixedHeight = $('.fixedHeaderWithButtons').outerHeight();
	if(!fixedHeight) 
		fixedHeight = 0;
	
	$('#tablebody').css('overflow', 'visible');
	
	if ($('#tablebody').length && $('#tableheader').length && $('#tablefooter').length) {
		if ($('#tablebody').height() > ($(window).height() - $('#tableheader').height() - $('#tablefooter').height() - fixedHeight)
			 && 50 < ($(window).height() - $('#tableheader').outerHeight() - $('#tablefooter').outerHeight() - fixedHeight)) {
			$('#tablebody').height($(window).height() - 20 - $('#tableheader').outerHeight() - $('#tablefooter').outerHeight() - fixedHeight);
			var tab = $('#tableheader').children().length-1;
			
			if(iconsetVersion != undefined && isFontIconVersion(iconsetVersion))
			{
				if(color != undefined)
				{
					$('#tableheader table:nth-child('+tab+')').children(':first').children(':first').append('<td id="resizetd" width="20px"><i class="moi moi-v'+iconsetVersion+' '+image+'" title="'+label+'" style="cursor:pointer; color: ' + color + '" onClick="resizeBody()"></i></td>');
				}
				else
				{
					$('#tableheader table:nth-child('+tab+')').children(':first').children(':first').append('<td id="resizetd" width="20px"><i class="moi moi-v'+iconsetVersion+' '+image+'" title="'+label+'" style="cursor:pointer;" onClick="resizeBody()"></i></td>');			
				}
			}
			else
			{
				$('#tableheader table:nth-child('+tab+')').children(':first').children(':first').append('<td id="resizetd" width="20px"><img src="'+image+'" title="'+label+'" style="cursor:pointer;" onClick="resizeBody()"></td>');
			}
			
			$('#tablebody').css('overflow', 'auto');
			
			$('body').css('overflow-x','hidden');
			$(window).resize(function() {
				if (totalHeight < 1 && $('#tablebody').height() > ($(window).height() - $('#tableheader').height() - $('#tablefooter').height() - fixedHeight)) {
				  $('#tablebody').height($(window).height() - 30 - $('#tableheader').outerHeight() - $('#tablefooter').outerHeight() - fixedHeight);
				}
			});
		}
	}
}

function setIBANInput(fieldName){
	if($('input[name=\"'+fieldName+'\"]').size()>0){
		$('input[name=\"'+fieldName+'\"]').attr('size','42').attr('maxlength','42');
		$('input[name=\"'+fieldName+'\"]').inputmask({
			'mask': 'AAXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XX',
			'placeholder': 'XX?? ???? ???? ...                        ', 
			'autoUnmask': true, 
			'removeMaskOnSubmit': true,
			'definitions': {
	            "X": { validator: "[a-zA-Z0-9]", cardinality: 1, casing: "upper" }
	        }
		});
		$('form').submit(function(){
			$('input[name=\"'+fieldName+'\"]').attr('value', $('input[name=\"'+fieldName+'\"]').inputmask('unmaskedvalue'));
			setTimeout(function(){
				$('input[name=\"'+fieldName+'\"]').blur();
			},5);
		});
	}
}

function setEnumInput(fieldName){
	$('input[name=\"'+fieldName+'\"]').inputmask({
		'mask': '*\\)',
		'placeholder': '.\\)', 
		'autoUnmask': false, 
		'removeMaskOnSubmit': false
	});
}

function breakHelpTexts(selector){
  	$(selector).html(function(i, html) { 
		// BreFa - skip when image tag is in helptext for performance
		if(html.includes("<img"))
			return html;
		
  		return html.replace(new RegExp("([,.])(?![^<]*>)", "g"),"$1&#x200b;")// gsch
																				// nur
																				// ,
																				// und
																				// .
																				// die
																				// nicht
																				// innerhalb
																				// von
																				// <>
																				// stehen,
																				// zwecks
																				// links
  				   .replace(new RegExp("(\\w{30,})(?![^<]*>)(\\w)", "g"), function(s){
  				   		return s.replace(RegExp("(\\w{3})(\\w)", "g"), function(a,t,c){
  				   			return t + "&#x200b;" + c;
  				   		})
  				   });
 	});
  	$('input[type="text"]:not(:disabled),textarea:not(:disabled)').bind('paste', function(event){
        var element = event.currentTarget;
        setTimeout(function () {
          $(element).val($(element).val().replace(/\u200B/g, '').replace(/\u2019/g, '\''));
        }, 100);
    }); 
}

function addSpecialKeyParametersToHrefs(){
	$('a[href]').click(function(e)
	{
		var href = $(this).attr('href');
		if(href.indexOf('javascript') < 0)
		{
		    // 29.10.2019, SB -> remove entries completly
			href = href.replace('?shiftKey=', '?1=').replace('?ctrlKey=', '?1=').replace('?metaKey=', '?1=');
			href = href.replace('&shiftKey=1', '').replace('&ctrlKey=1', '').replace('&metaKey=1', '');
			href = href.replace('&shiftKey=0', '').replace('&ctrlKey=0', '').replace('&metaKey=0', '');
			
			if(e.shiftKey || e.ctrlKey || e.metaKey) 
		    {
		        if(e.shiftKey)
		        	href += (href.indexOf('?') < 0 ? '?' : '&') + 'shiftKey=1';
		        if(e.ctrlKey)
			        href += (href.indexOf('?') < 0 ? '?' : '&') + 'ctrlKey=1';
			    if(e.metaKey)
				    href += (href.indexOf('?') < 0 ? '?' : '&') + 'metaKey=1';
		    }
		    else
		    {
		    	// already replaced before if
		    	//href = href.replace('shiftKey=1', 'shiftKey=0').replace('ctrlKey=1', 'ctrlKey=0').replace('metaKey=1', 'metaKey=0');
		    }
		    $(this).attr('href', href);
		}
	});
}

function addAutoComplete(isAutoComplete, isAutoCompCombo, isAutoCompleteOnlyCombo, isAutoCompleteOnlyText, isUseWebSocketSupport, isSubmitOnClick,
		pathServlet, encryptProg, maxAutoCompComboValues)
{
	var tmpSource = "";
	var tmpSearch = undefined;
	if(isUseWebSocketSupport)
	{
		tmpSource = function(request, response)
					{
					 var formDat = $('#'+elementId).closest('form').serialize().replace('&prog=','&program=').replace('" + encryptProg + "','enc_program');
					 var url = pathServlet + "AppDataServlet?prog=autocomp&elementId="+$(this).attr("id")+"&col="+$(this).attr("col")+"&tab="+$(this).attr("tab")+"&sId="+$(this).attr("searchId")+"&"+formDat +"&term="+request.term;
					 sendSocketRequest(url,elementId+'cb',response);
					};
	}
	else
	{
		tmpSource = pathServlet + "AppDataServlet?prog=autocomp&elementId="+$(this).attr("id")+"&col="+$(this).attr("col")+"&tab="+$(this).attr("tab")+"&sId="+$(this).attr("searchId");
		tmpSearch = function( event, ui )
					{
					 var formDat = $(this).closest('form').serialize().replace('&prog=','&program=').replace('" + encryptProg + "','enc_program');
					 var src = pathServlet + "AppDataServlet?prog=autocomp&elementId="+$(this).attr("id")+"&col="+$(this).attr("col")+"&tab="+$(this).attr("tab")+"&sId="+$(this).attr("searchId")+"&"; 
					 $(this).autocomplete( 'option', 'source', src + formDat);
					 return true;
					};
	}
	
	if(isAutoCompCombo)
	{
		$("select[size='1'],select[size='0'], select:not([size])").filter(':not([multiple]):not([style*="display: none"])').combobox({ max: maxAutoCompComboValues });
		$('input[type=\"file\"], input[type=\"File\"]').sopFileInput();
	}
    if(isAutoComplete && !isAutoCompleteOnlyText)
    {
    	$("select:not([multiple]):enabled:visible, div#tableheader select:not([multiple]):visible").combobox({ max: maxAutoCompComboValues});
    	$('div#tableheader table table td').removeAttr('width').css('width','');
    	$("span.newselect").remove();
    	$(".ui-button-icon-only").removeAttr('title');
    }
    if(isAutoComplete && !isAutoCompleteOnlyCombo)
	{
    	$(".ajaxInput").each( function()
    	{	
    		var column = $(this).attr("col");
    		var table = $(this).attr("tab");
    		var elementId = $(this).attr("id");
    		var sId = $(this).attr("searchId");
    		var ajaxData =
    		{
    			delay: 500,
    			minLength: 2,
    			autoFill: true,
    			autoFocus: false,
    			source: tmpSource,
    			select: function(event, ui)
    					{
    						if(ui.item.value.indexOf('&nextval=') !=-1)
    						{
    							$(this).val(ui.item.value.split('&nextval=')[0]);
    							$(':input:eq(' + ($(':input').index(this) + 1) + ')').val(ui.item.value.split('&nextval=')[1]);
    						}
    						else
							{
    							$(this).val(ui.item.value);
    							if(isSubmitOnClick)
    								document.getElementById('hiddenMenueSubmitButton').click();
							}    							
    						eval($(this).attr('onAuto'));
    						return false;
    					}
    		};
    		if(tmpSearch)
    			ajaxData.search = tmpSearch;
			if(sId=='true')
				ajaxData.focus = function (event, ui)
				{
					$(this).val('...');
					event.preventDefault();
				}
			$(this).autocomplete(ajaxData).data( "ui-autocomplete" )._renderItem = function( ul, item )
			{
				var wa = ul.width()+"px";
				var w = item.label.length+"em";
				return $( "<li></li>" ).data( "ui-autocomplete-item", item ).append( $( "<a></a>" ).html(item.label) ).appendTo( ul );
			};
    	});
	}    
}

function buildJsCodeForCollapseHelpBox(helpClass, classForToggleIcon, searchForParentTag, readingServlet, startLoadingScreen, ignoreDecodeResponse, removeTagByResponse)
{		
	if(!isNotNullAndNotZero(helpClass))
		helpClass = "toggle_hidden";
	if(!isNotNullAndNotZero(classForToggleIcon))
		classForToggleIcon = "toggle_icon";
	// detect documentation for collapse
	dokus = $('#fixed_top').children("div."+helpClass);
	/* Kapseln der Hilfe um spaeter zu togglen */
	$(dokus).each(function(){
		$(this).children(':not(:first, p:first)').wrapAll("<div class='"+helpClass+"'></div>");
	});
	$(dokus).find('div.'+helpClass).after("<div class='toggle_icon "+classForToggleIcon+"' />");
	$('div.'+helpClass+':has(div.toggle_hidden)').css('cursor','pointer');
	
	if($(dokus).eq(0).text().length > 0)
		$(dokus).eq(0).show();
		
	$('.'+classForToggleIcon).click(function() 
	{
		if(isNotNullAndNotZero(searchForParentTag))
		{
			$(this).parent().closest(searchForParentTag).find('.toggle_hidden').fadeToggle(1000, function()
			{ 
		 		// read external content
				if(isNotNullAndNotZero(readingServlet) && !$(this).hasClass('contentLoaded') && isNotNullAndNotZero(this.id))
				{
					replaceTagByExternalReadingServlet(this.id, readingServlet, startLoadingScreen, ignoreDecodeResponse, removeTagByResponse);
					$(this).addClass('contentLoaded');
				}
				// set size
				$('#content').css('margin-top',($('#fixed_top').height()+$('#ocTopBar'))+'px');
		 		$('#content').css('margin-bottom',$('#footer').height()+'px');
			});
		}
		else
		{
			$(this).parent().find('.toggle_hidden').slideToggle( 400, function(){ 
		 		$('#content').css('margin-top',($('#fixed_top').height()+$('#ocTopBar'))+'px');
		 		$('#content').css('margin-bottom',$('#footer').height()+'px');
			});
		}
		$(this).toggleClass("collapse");
	});
}

function buildJsCodeForToolTip()
{
	// Tooltip
	addDetailToolTips();
	$('.hasTooltip').each(function() { // Notice the .each() loop, discussed
										// below
		$(this).qtip({
			position: {
				my: 'left center',
				at: 'right center',
				adjust: {method: 'shift'},
				effect: false,
				viewport: $(window)
			},
	        content: {	            
	        	text: $(this).next('div.hiddenDiv') // Use the "div" element
													// next to this for the
													// content
	            // ,title: {
	            // text: 'Click and drag me to move the tooltip',
	            // button: true
	            // }
	        },
	        events: {
		        show: function(event, api) {		        	
		        	$( "div.qtip" ).css( "background-color", "white" );
		        },
	        render: function(event, api) {
                 $(this).draggable({
                     containment: 'window',
                     handle: api.elements.titlebar
                 });
             }
	        },
	        hide: {
	        	when: {
	        		event:'mouseout unfocus'
	        		}, 
	        		fixed: true, 
	        		delay: 200
	        	}
	    });// .draggable({ containment: 'window'});
	});
	// Mouse-Click verbieten
	$('.preventMouseClick').click(function (event)
	{
		$("#preventMouseClick").toggle();
	    return false;
	});
}

// function to check if given value is not empty and not 0
function isNotNullAndNotZero(value)
{
	if(!value || value === 'undefined' || value.length === 0 || value === '' || value === '0')
		return false;
	else
		return true;
}

//function to check if given value is not empty and not 0
function isNullOrZero(value)
{
	if(!value || value === 'undefined' || value.length === 0 || value === '' || value === '0')
		return true;
	else
		return false;
}

// checks the string + convert to boolean
function stringToBoolean(s)
{
    if(s !== null && s !== undefined)
    {
	    // will match one and only one of the string 'true','1', or 'on' rerardless
	    // of capitalization and regardless off surrounding white-space.
	    //
	    regex=/^\s*(true|1|on)\s*$/i
	
	    return regex.test(s);
	}
	return false;
}

var renderMobileCalled=false;
function renderMobileForm(){
	if(!renderMobileCalled){
		$(window).resize(function(){renderMobileForm()});
		renderMobileCalled = true;
	}
	if( ($(window).width() < 800 || screen.width < 800) && $('.mobileBody').size() == 0 ){
		$('body').addClass('mobileBody');
		$('table[width="800px"], table.questContainerTable').each(function(i){
			$(this).width('100%').addClass('mobileTable');
			$(this).find('tr td:nth-child(2)').each(function(i2){
				$(this).prepend($('<div>').addClass('smallOnly').html($(this).prev().html())).addClass('mobileTd');
				$(this).prev().addClass('wideOnly');
			});
			$(this).find('td[nowrap]').removeAttr('nowrap');
			$(this).find('span.openAll').before('<br>');
		});
	}
	if($(window).width() < 800 || screen.width < 800){
		$('.wideOnly').hide();
		$('.smallOnly').show();
	}else{
		$('.wideOnly').show();
		$('.smallOnly').hide();
	}
}

// parameter mit value von href entfernen
// Achtung: href ggf. security-encoded -> dann funktioniert es natürlich nicht. Außer die Parameter hängen unkodiert durch JS ohnehin mit dran
function removeParameterFromURL(href, parameterName)
{
	var regex = new RegExp("&"+parameterName+"=[^&;]*", "g");
	href = href.replace(regex, "");
	return href;
}

function reloadWithQueryStringVars (queryStringVars) {
    var existingQueryVars = location.search ? location.search.substring(1).split("&") : [],
        currentUrl = location.search ? location.href.replace(location.search,"") : location.href,
        newQueryVars = {},
        newUrl = currentUrl + "?";
    if(existingQueryVars.length > 0) {
        for (var i = 0; i < existingQueryVars.length; i++) {
        	if(!existingQueryVars[i].indexOf("match=") == 0){
	            var pair = existingQueryVars[i].split("=");
	            newQueryVars[pair[0]] = pair[1];
        	}
        }
    }
    if(queryStringVars) {
        for (var queryStringVar in queryStringVars) {
            newQueryVars[queryStringVar] = queryStringVars[queryStringVar];
        }
    }
    if(newQueryVars) { 
        for (var newQueryVar in newQueryVars) {
            newUrl += newQueryVar + "=" + newQueryVars[newQueryVar] + "&";
        }
        newUrl = newUrl.substring(0, newUrl.length-1);
        window.location.href = newUrl;
    } else {
        window.location.href = location.href;
    }
}

function simpleOnChange(prefix)
{
	var fromSplitted = $('input[name=' + prefix + '_dat_von]').val().split('.');
	var from = new Date(fromSplitted[2], fromSplitted[1], fromSplitted[0]);
	var fromHours = $('select[name=' + prefix + '_hh_von]').val();
	if(fromHours == undefined) {
		fromHours = $('select[name=' + prefix + '_dat_von_SOP_PARAM_NAME_DATE_HOURS]').val();
	}
	from.setHours(fromHours);
	var fromMinutes = $('select[name=' + prefix + '_mm_von]').val();
	if(fromMinutes == undefined) {
		fromMinutes = $('select[name=' + prefix + '_dat_von_SOP_PARAM_NAME_DATE_MINUTES]').val();
	}
	from.setMinutes(fromMinutes);
	var toSplitted = $('input[name=' + prefix + '_dat_bis]').val().split('.');
	var to = new Date(toSplitted[2], toSplitted[1], toSplitted[0]);
	
	var toHours = $('select[name=' + prefix + '_hh_bis]').val();
	if(toHours == undefined) {
		toHours = $('select[name=' + prefix + '_dat_bis_SOP_PARAM_NAME_DATE_HOURS]').val();
	}
	to.setHours(toHours);
	var toMinutes = $('select[name=' + prefix + '_mm_bis]').val();
	if(toMinutes == undefined) {
		toMinutes = $('select[name=' + prefix + '_dat_bis_SOP_PARAM_NAME_DATE_MINUTES]').val();
	}
	to.setMinutes(toMinutes);
	
	var diff = to.getTime()-from.getTime();
	$('input[name^="' + prefix + '_"][name$="_std"]').val((Math.round((diff / (1000 * 3600))*100)/100).toFixed(2).replace('.', ','));
}

function simpleOnChangeDate(prefix)
{
	var fromSplitted = $('input[name=' + prefix + '_dat]').val().split('.');
	var from = new Date(fromSplitted[2], fromSplitted[1], fromSplitted[0]);
	var fromHours = $('select[name=' + prefix + '_hh]').val();
	if(fromHours == undefined) {
		fromHours = $('select[name=' + prefix + '_dat_SOP_PARAM_NAME_DATE_HOURS]').val();
	}
	from.setHours(fromHours);
	var fromMinutes = $('select[name=' + prefix + '_mm]').val();
	if(fromMinutes == undefined) {
		fromMinutes = $('select[name=' + prefix + '_dat_SOP_PARAM_NAME_DATE_MINUTES]').val();
	}
	from.setMinutes(fromMinutes);
	var toSplitted = $('input[name=' + prefix + '_dat]').val().split('.');
	var to = new Date(toSplitted[2], toSplitted[1], toSplitted[0]);
	
	var toHours = $('select[name=' + prefix + '_hh]').val();
	if(toHours == undefined) {
		toHours = $('select[name=' + prefix + '_dat_SOP_PARAM_NAME_DATE_HOURS]').val();
	}
	to.setHours(toHours);
	var toMinutes = $('select[name=' + prefix + '_mm]').val();
	if(toMinutes == undefined) {
		toMinutes = $('select[name=' + prefix + '_dat_SOP_PARAM_NAME_DATE_MINUTES]').val();
	}
	to.setMinutes(toMinutes);
	
}

function simpleOnChangeInForm(prefix, formId)
{
	var fromSplitted = $('#' +formId + ' input[name=' + prefix + '_dat_von]').val().split('.');
	var from = new Date(fromSplitted[2], fromSplitted[1], fromSplitted[0]);
	var fromHours = $('#' +formId + ' select[name=' + prefix + '_hh_von]').val();
	if(fromHours == undefined) {
		fromHours = $('#' +formId + ' select[name=' + prefix + '_dat_von_SOP_PARAM_NAME_DATE_HOURS]').val();
	}
	from.setHours(fromHours);
	var fromMinutes = $('#' +formId + ' select[name=' + prefix + '_mm_von]').val();
	if(fromMinutes == undefined) {
		fromMinutes = $('#' +formId + ' select[name=' + prefix + '_dat_von_SOP_PARAM_NAME_DATE_MINUTES]').val();
	}
	from.setMinutes(fromMinutes);
	var toSplitted = $('#' +formId + ' input[name=' + prefix + '_dat_bis]').val().split('.');
	var to = new Date(toSplitted[2], toSplitted[1], toSplitted[0]);
	
	var toHours = $('#' +formId + ' select[name=' + prefix + '_hh_bis]').val();
	if(toHours == undefined) {
		toHours = $('#' +formId + ' select[name=' + prefix + '_dat_bis_SOP_PARAM_NAME_DATE_HOURS]').val();
	}
	to.setHours(toHours);
	var toMinutes = $('#' +formId + ' select[name=' + prefix + '_mm_bis]').val();
	if(toMinutes == undefined) {
		toMinutes = $('#' +formId + ' select[name=' + prefix + '_dat_bis_SOP_PARAM_NAME_DATE_MINUTES]').val();
	}
	to.setMinutes(toMinutes);
	
	var diff = to.getTime()-from.getTime();
	$('#' +formId + ' input[name=' + prefix + '_ges_std]').val((Math.round((diff / (1000 * 3600))*100)/100).toFixed(2).replace('.', ','));
	$('#' +formId + ' input[name=' + prefix + '_verr_std]').val((Math.round((diff / (1000 * 3600))*100)/100).toFixed(2).replace('.', ','));
}

// fancybox functions

function fancyOnStart()
{ 
	$('#fancybox-close').css('top','-15px').css('right','-15px');
	$('#fancybox-max').remove();
	$('<a id="fancybox-max" href="" style="display: inline;"></a>').appendTo('#fancybox-outer').click(function(event){
		$('#fancybox-wrap, #fancybox-content').css('width','calc(100% - 20px)').css('height','calc(100% - 20px)').css('top','0px').css('left','0px').css('padding','10px').css('border-width','0px');
		$('#fancybox-max').remove(); 
		$('#fancybox-close').css('top','-10px').css('right','-10px');
		$('html, body').scrollTop('0','0');
		event.preventDefault();
	});
	$('html, body').css('overflow','hidden');
	$(".fancybox-overlay", top ? top.document : window.top.document).show(); 
    $("#fancybox-overlay").css({width: '100%', height: '100%', filter: 'alpha(opacity=60)'});
    /* 2018-05-11 - hwMan - für die OffCanvas Version des Bewerbungsworkflows damit die Fancybox auch über dem fixed_top ist */
    if($(".mm-slideout").size() > 0) {
	   $(".mm-slideout > div[id^='fancybox']").appendTo("body");
    }
}
function fancyOnClose(elem)
{
  $(".fancybox-overlay", top ? top.document : window.top.document).hide();
  $('html, body').css('overflow','');
  if((elem.attr('href').indexOf('actionMode=insert') > 0 || elem.attr('href').indexOf('actionMode=update') > 0 
	 || (elem[0].orig && elem[0].orig.hasClass('editLink') ) )
      && location.search.length > 0 && elem.attr('href').indexOf('reloadOnClose=0') < 0) 
    document.location.reload(true);
}

//ckose/back Verhalten
function buildFancyCloseOrBackJS(servletName)
{
	if(typeof servletName !== 'undefined' && servletName !== '')
	{
		if(parent 
			&& parent.jQuery.fancybox 
			&& parent.jQuery('#fancybox-frame').attr('src').includes(servletName)) 
		{ 
			parent.jQuery.fancybox.close(); 
		} 
		else 
		{ 
			history.back(); 
		}
	}
	else
	{
		if(parent && parent.jQuery.fancybox) 
		{ 
			var fancyBoxName = parent.jQuery('#fancybox-frame').attr('name');
			var hiddenFieldName = 'close_type_'+fancyBoxName;
			//hiddenFieldName = "close_type_for_fancy_box";
			if($(this.parent.form).find('input:hidden[name="'+hiddenFieldName+'"]').length > 0)
			{
				$(this.parent.form).find('input:hidden[name="'+hiddenFieldName+'"]').val('cancel');
				//alert(hiddenFieldName+"=cancel");
			}
			parent.jQuery.fancybox.close();
			//parent.jQuery.fancybox.cancel(); 
		} 
		else 
		{ 
			history.back(); 
		}
	}
}

function fancyOnComplete(elem, callback)
{
	  if(!elem[0].orig || elem[0].orig.hasClass('autoMax'))
	  {
		  setTimeout(function(){
			$('#fancybox-wrap, #fancybox-content').css('width','calc(100% - 20px)').css('height','calc(100% - 20px)').css('top','0px').css('left','0px').css('padding','10px').css('border-width','0px');
			$('#fancybox-max').remove(); 
			$('#fancybox-close').css('top','-10px').css('right','-10px');
			$('html, body').css('overflow','hidden').scrollTop('0','0');
		    $("#fancybox-overlay").css({width: '100%', height: '100%', filter: 'alpha(opacity=60)'});
		    
		    if(callback != undefined)
	    	{
	    		callback();
	    	}
		  },500);
	  }
	  // SB, 16.07.2020 -> hidden input for close type
	  if($('#fancybox-frame').length > 0)
	  {
		  //elem[0].orig.data('close_type_fancy_box','');
		  
		  var fancyBoxName = $('#fancybox-frame').attr('name');
		  var hiddenFieldName = 'close_type_'+fancyBoxName;
		  //hiddenFieldName = "close_type_for_fancy_box";
		  if($(this.form).find('input:hidden[name="'+hiddenFieldName+'"]').length === 0)
		  {
			  $(this.form).append('<input type=\"hidden\" id=\"'+hiddenFieldName+'\" name=\"'+hiddenFieldName+'\" value=\"\"></input');
		  }
		  $('#fancybox-close').mousedown(function(event)
		  {
				if($('#'+hiddenFieldName).length > 0)
				{
					$('#'+hiddenFieldName).val('cancel');
					//alert(hiddenFieldName+"=cancel");
				}
		  });
	  }
	  // SB -> overlay über die beiden iframes im modal nach hinten legen, falls eine fancybox geöffnet wird
	  $('.learning-agreement-fancybox-overlay', parent.document).css('z-index', '-1');
}

/*
 * add hidden element to useForm
 */
function setOrAddHiddenElement(hiddenFieldName, hiddenFieldValue, useForm)
{
	if($(useForm).find('input:hidden[name="'+hiddenFieldName+'"]').length > 0)
	{
		$(useForm).find('input:hidden[name="'+hiddenFieldName+'"]').val(hiddenFieldValue);
	}
	else
	{
		$(useForm).append('<input type=\"hidden\" id=\"'+hiddenFieldName+'\" name=\"'+hiddenFieldName+'\" value=\"'+hiddenFieldValue+'\"></input');
	}
}

function fancyAlterAElem(event,elem) {
  if(event.which == 1) {
      var actualHref = elem.attr("href");
      if(getValue(elem.attr("formName"),elem.attr("fieldName"))){
    	  elem.attr("href", actualHref +""+ elem.attr("tag").split("=")[0] +"="+ getValue(elem.attr("formName"),elem.attr("fieldName"))); 
      }else if( elem.attr("tag").indexOf("=") > 0 && elem.attr("tag").indexOf("=") < (elem.attr("tag").length-1)){
    	  elem.attr("href", actualHref +""+ elem.attr("tag"));
  	  }else {
    	  elem.attr("href", actualHref.replace('actionMode=display','actionMode=insert'));
  	  }
  }
}

function autoResizeIframe(i)
{
    var iframeHeight= (i).contentWindow.document.body.scrollHeight;
    (i).height=iframeHeight+20;
}

function swithLogoPositionsInHeader(){
	var compLogo = $('table.headerImage td:first');
	var compLabel = $('table.headerImage td:nth-child(2)');
	var appLogo = $('table.headerImage td:last');
	
	$('table.headerImage tr')
	.prepend(appLogo.css('text-align', 'left'))
	.append(compLogo.css('padding-right', '5px'));
	compLabel.css('text-align','right').find('a').css('margin-right','20px');
}

// löscht die aktuelle Auswahl von abhängigen Select Element (für sopSelect.tag
// - noch experimentell)
function clearDependentSelects(select) {
	if(select.attr("name") == undefined) {
		return;
	}
	
	select.val([]);
	select.html("");
	
	if(select.attr("multiple")) {							
		var classtext = select.attr('class');
		var emptytext = select.find('option:first').text();
		select.find('option:first').remove();
		
		if(select.closest('.multiselectWrapper').size() == 0) {
			select.wrap('<div class="multiselectWrapper" style="position:relative; display: inline-block; height: auto;">')
		}
		
		select.multiselect("destroy").multiselect({
			position: {my: 'left top', at: 'left bottom'},
//			header: true,
			minWidth: '220',
			classes: classtext,
//			checkAllText: 'Alle',
//			uncheckAllText: 'Keine Auswahl',
			noneSelectedText: emptytext,
//			selectedText: '# von # ausgew&auml;hlt',
			selectedList: 3,
			autoOpen: false,
			open: function() {
				jQuery('#error_'+select.attr('id')).remove();
				select.next('.ui-multiselect').removeClass('ErrorField');
			}
		});
	}
	
	var dependentElement = $("[dependencyElement=" + select.attr("name") + "]");
	
	if(dependentElement) {
		clearDependentSelects(dependentElement);				
	}
}	

function getAgeOfDateField(fieldName, dateFormat)
{
	var value = $("input[type=text][name="+fieldName+"]" ).val();
	var birthday = $.datepicker.parseDate(dateFormat, value);
	var today = new Date();
	age = (
		      (today.getMonth() > birthday.getMonth())
		      ||
		      (today.getMonth() == birthday.getMonth() && today.getDate() >= birthday.getDate())
		    ) ? today.getFullYear() - birthday.getFullYear() : today.getFullYear() - birthday.getFullYear()-1;
    return age;
}

String.prototype.hashCode = function() {
	  var hash = 0, i, chr, len;
	  if (this.length === 0) return hash;
	  for (i = 0, len = this.length; i < len; i++) {
	    chr   = this.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	};
if(!String.prototype.replaceAll) 
{
	String.prototype.replaceAll = function(search, replacement) 
	{
	  var target = this;
	  return target.replace(new RegExp(search, 'g'), replacement);
	};
}
if(!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position){
	    return this.substr(position || 0, searchString.length) === searchString;
	  };
	}

function addBurgerForLeftMenu(){
	if (/Mobi/.test(navigator.userAgent)) {
		$('#content_div', top.document).css('left','0px').css('z-index','50');
		$('#infoBoxDiv, #leftMenuDiv').hide();
		$('.headerMenuCombo').first().prepend($('<div id="leftBurgerMenu"></div>').click(toggleBurgerMenu));
	}
}
function toggleBurgerMenu(){
	if($('#content_div', top.document).css('z-index') > 1 ){
		$('#content_div', top.document).css('z-index', 1).css('left','0px');
		$('#infoBoxDiv, #leftMenuDiv', top.document).show();
	}else{
		$('#content_div', top.document).css('z-index', 50).css('left','0px');
		$('#infoBoxDiv, #leftMenuDiv', top.document).hide();
	}
}

function resizeTdsOfTableDependingNextTable(header,content){
	$('table.' + header + ' td').each(function() {
		$(this).attr('width', (($('table.' + content + ' tr:first-child:not(.progSubTitle) td').eq($(this).index()).width() +4) 
								* 100 / $('table.' + content + ' tr:first-child:not(.progSubTitle)').width()) +'%' )
			   .attr('title', $(this).find('b').text());
	}).css('overflow','hidden').css('word-break','break-word');
	$('table.' + header).css('table-layout','fixed');
}

//?woIstBalazs eingebunden mittels
//	if(window.location.href.indexOf("woIstBalazs") > 0){
// 	    $('body').append('<div id="balazs" style="position: absolute; bottom: -240px; background-image: url(\'https://www.service4mobility.com/europe/images/balazs_transparent.png\'); width: 180px; height: 236px; z-index:99999999"><div>');
// 	    showBalazs();
// 	}
var balazsUp = 0;
function showBalazs(){
	var x = Math.max((Math.random() * $(window).width() - 170),0);
	
	var y = -240;
	balazsUp = 90+(Math.random()*140);
	$('#balazs').css('left',x+'px').css('bottom',y+'px').animate({
	    bottom: "+="+balazsUp,
	  }, Math.random() * 4000, function() {
		  setTimeout(function(){
		  $('#balazs').animate({
			    bottom: "-="+balazsUp,
			  }, Math.random() * 4000, function() {
				  setTimeout(showBalazs(),Math.random() * 100000);
			  });
		  }, Math.random()*2000);
	  });
}
function escapeRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

function LightenDarkenColor(col, amt) {
	  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    
    }

function copyToClipboard(text) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
 }

// method to set variable data to dialog for leaving page
function lockBodyForDialogOnLeavingPage(locking, title, msg, cancelLabel, submitLabel)
{
	var detectedDocument;
	if($("#locked_body_for_dialog_on_leaving", document).length > 0)
		detectedDocument = document;
	else if($("#locked_body_for_dialog_on_leaving", parent.document).length > 0)
		detectedDocument = parent.document;
	else if($("#locked_body_for_dialog_on_leaving", parent.parent.document).length > 0)
		detectedDocument = parent.parent.document;
	if(typeof detectedDocument !== "undefined")
	{
		$("#locked_body_for_dialog_on_leaving", detectedDocument).val(locking);
		$("#locked_body_for_dialog_on_leaving_title", detectedDocument).val(title);
		$("#locked_body_for_dialog_on_leaving_text", detectedDocument).val(msg);
		$("#locked_body_for_dialog_on_leaving_cancel", detectedDocument).val(cancelLabel);
		$("#locked_body_for_dialog_on_leaving_submit", detectedDocument).val(submitLabel);
	}
}

function switchToOtherClusterNode(jvmRoute)
{	
	
	activateGlobalLoadingFrame();
	
	$.ajax({
		url: "serverManagement/serverManagementService/switchNode?jvmRoute=" + jvmRoute,
		type: "GET",
		success: function(json) {
			if(json)
				reloadMainFrame(); // we should now have the new cookies and a reload should  migrate the session to the new node
			else
				alert('Error switching nodes. Check exceptions for more information.');
	 	},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Error switching nodes. Check exceptions for more information.');
		}
	});
}

/*
 * Used to append the other Accommodations on the AccBookPrefServlet display 
 * if parameter "dispAllAccommodations=1" is set
 * 
 */
function appendAccommodations(bewId)
{
	$.ajax({
		url: 'AccBookPrefServlet?appendAccommodations=1&bew_id=' + bewId,
		method: 'GET',
		success: function(data, textStatus) {
			// read json and append to options
			var accommodations = data.accommodations;
			
			$('div[data-replace-id="' + bewId + '"').empty();
			$('div[data-replace-id="' + bewId + '"').append("<br>");
			$.each(accommodations, function(index){
				if($('a[data-id="' + accommodations[index].dataId + '"').length == 0)
				{
					$('div[data-replace-id="' + bewId + '"').append(accommodations[index].value);
				}
			});
			
			//Enable fancy on newly loaded Anchor-Tags
			$("a.fancy").fancybox({
				'overlayOpacity': 0.6,
				'enableEscapeButton': false,
				'showCloseButton': true,
				'hideOnOverlayClick': false,
				'hideOnContentClick': false,
				'type' : 'iframe',
				'width': '90%',
				'height'	: '90%',
				'onStart'  : function(){fancyOnStart($(this));},
				'onComplete'  : function(){fancyOnComplete($(this));},
				'onClosed' : function(){fancyOnClose($(this));}
			});
			
			
	 	},
		error: function(xhr, textStatus, error) {
			alert('Error on sending data');
		}
	});
}


// define events to show dialog when leaving page
function showDialogForLockedBodyWhenLeaving()
{
	$("iframe").each(function () {
        //Using closures to capture each one
        var iframe = $(this);
        iframe.on("load", function () { //Make sure it is fully loaded
            iframe.contents().click(function (event) {
            	try{
            		iframe.trigger(event);
            	}catch(err){}
            });
        });

        iframe.click(function(event) 
        {
            // another frame than main content frame
        	if(this.id !== 'text')
        		// if content frame, then check if tabs are switched -> can be ignored, because switching tabs includes automatic save
            	//|| (this.id === 'text' && typeof event.target.href !== "undefined" && $(event.target).length > 0 && $(event.target).hasClass('reiter')))
            {
            	//alert('test');
            	var targetURL = event.target.href;
            	var targetText = event.target.text;            	
	            if($('#locked_body_for_dialog_on_leaving').val() === "1" 
	            		&& targetURL !== null && targetURL !== ''
	            		&& typeof targetURL !== "undefined")
	            {
	            	var formId = 'dialogLockedBodyWhenLeaving';
	            	var title = $('#locked_body_for_dialog_on_leaving_title').val();
	            	var text = $('#locked_body_for_dialog_on_leaving_text').val();
	            	var cancelLabel = $('#locked_body_for_dialog_on_leaving_cancel').val();
	            	var submitLabel = $('#locked_body_for_dialog_on_leaving_submit').val();
	            	$("#"+formId, parent.document).text(text);
	            	$("#"+formId, parent.document).parent().dialog({
	            		modal: true,
	            		dialogClass: 'class_of_'+formId,
	            		width: 'auto',
	            		title: title,
	            		create: function( event, ui ) {
	            		    // Set maxWidth
	            		    $(this).css("maxWidth", "500px");
	            		},
	            		buttons: [
	            			{
	            			    text: cancelLabel,
	            			    id: 'id_of_button_cancel_'+formId,
	            			    click: function() { 
	            			    	$( this ).dialog( "close" ); 
	            			    }
	            			},
	            			{
	            				text: submitLabel, 
	            				id: 'id_of_button_submit_'+formId,
	            				click: function() 
	            				{ 
	            					$("#locked_body_for_dialog_on_leaving", document).val('0');
	            					//$('#'+formId).submit(); 
	            					$(this).dialog("close");
	            					activateGlobalLoadingFrame(targetText);
	            					reloadMainFrame(targetURL);
	            				}
	            			}
	            		]
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
	            
	            	event.preventDefault()
	            	event.stopPropagation();
	            	deactivateGlobalLoadingFrame();
	            }
            }
        });
    });
}

