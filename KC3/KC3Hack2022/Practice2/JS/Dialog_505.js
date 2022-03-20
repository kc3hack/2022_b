// Dialog_505.js    2019/4/26 by T. Fujita

var Set_Text = "";
var Set_Link = " ";
var Icon_Url = "../ICONS/fire.png";
var Icon_W = 24;
var Icon_H = 24;
var Icon_AW = Math.round(Icon_W / 2);
var Icon_AH = Math.round(Icon_H / 2);
var Icon_PW = 0;
var Icon_PH = Math.round(Icon_H / 2) * -1;
var Max_M_Size = 64;
var Min_M_Size = 8;
var Data_CSV = new Array();

var Line_W = 1;
var Selected_Color = 'ff0000';
var Selected_Fill_Color = 'ffff00';
var Selected_Opacity = 1;
var Selected_Fill_Opacity = 0.3;
var Line_Type = "10,0";
var Temp_LAT = 0.0;
var Temp_LON = 0.0;
var Temp_RAD = 0.0;

$(document).ready( function() {
        $("body").append('<div id="dialog_001" style="z-index: 2000;"><p><form name="Form_001"> Title: '+
'<input type="text" style="width: 230px;" name="txt_mk" value=""></form><BR>'+
'<div>Marker Select:<BR>'+
'<select id="Marker_Samples" name="Marker_Samples" style="width:150px;">'+
'<option value="1" title="../ICONS/fire.png">001</option>'+
'<option value="2" title="../ICONS/nonfire.png">002</option>'+
'<option value="3" title="../ICONS/can.png">003</option>'+
'<option value="4" title="../ICONS/bottle.png">004</option>'+
'<option value="5" title="../ICONS/plasticbottle.png">005</option>'+
'</select></div><BR>'+
'<div><tr><td><BR><div id="num_001"></div><div id="slider_001"></div>'+
'<BR><BR><div id="Selected_Icon">Selected Icon: <img src=""></div>'+
'</td></tr></div><BR>(注) ここで使用しているアイコン素材は、<A HREF = "http://flat-icon-design.com/" target="_blank"> FLAT ICON DESIGN </A>および' +
'<A HREF = "http://icooon-mono.com/" target="_blank"> ICOON MONO </A>から取得しており、<BR>' +
'これらアイコン素材データの著作権は TopeconHeroes が保持しています。</p><div>');

    $('#Selected_Icon img').attr('src', Icon_Url);

    $('#dialog_001').dialog({
        autoOpen: false,
        title: 'Please Set the Icon Style.',
        height: 450,
        width: 300,
        closeOnEscape: true,
        modal: true,
        buttons: {
            "設定": function(){
                Set_Text = document.Form_001.txt_mk.value;
                var Temp = Marker_Samples.options[Marker_Samples.selectedIndex].title;
                Icon_Url = Temp;
                Icon_AW = Math.round(Icon_W / 2);
                Icon_AH = Math.round(Icon_H / 2);
                Icon_PW = 0;
                Icon_PH = Math.round(Icon_H / 2) * -1;
                Change_Marker(); 
                $(this).dialog('close');
            }
        }
    });

        $("body").append('<div id="dialog_002" style="z-index: 2000;"><p><form name="Form_002">'+
'Title: <input type="text" style="width: 230px;" name="txt_dat" value=""></form></p><HR>'+
'<p> File Select:'+
'<form name="subinput">'+
'<center>CSVファイルを指定してください。<BR><BR>'+
'  <TD><input type="file" name="select" id="select_002" value=""></TD>'+
'  <BR><BR>'+
'</center></p></div>');

    $('#dialog_002').dialog({
        autoOpen: false,
        title: 'CSVファイル選択',
        height: 400,
        width: 300,
        closeOnEscape: true,
        modal: true,
        show: "fade",
        hide: "fade",
        buttons: {
            "Select the Marker": function(){
                Dialog_001();
            },
            "Select the Line Style": function(){
                Dialog_003();
            },
            "　 Set Markers 　": function(){
                CSV_Data();
                CSV_Markers();
            },
            "　　　Draw Lines　　": function(){
                CSV_Data();
                CSV_Lines();
            },
            "　Draw Polygons ": function(){
                CSV_Data();
                CSV_Polygons();
            },
            "　　Draw Circles　　": function(){
                CSV_Data();
                CSV_Circles();
            },
            "　Close　": function(){
                $(this).dialog('close');
            }
        }
    });

        $("body").append('<div id="dialog_003" style="z-index: 2000;"><form name="Form_003">'+
'Title: <input type="text" style="width: 230px;" name="txt_line" value=""></form>'+
'<p><HR><div style="clear: both;"></div><div>Line Type:'+
'<select id="Line_Samples" name="Line_Samples" style="width:270px;">'+
'<option value="1" title="../ICONS/Lines/Line_Sample-001(10).png">001</option>'+
'<option value="2" title="../ICONS/Lines/Line_Sample-002(5,5).png">002</option>'+
'<option value="3" title="../ICONS/Lines/Line_Sample-003(5,10).png">003</option>'+
'<option value="4" title="../ICONS/Lines/Line_Sample-004(10,5).png">004</option>'+
'<option value="5" title="../ICONS/Lines/Line_Sample-005(5,1).png">005</option>'+
'<option value="6" title="../ICONS/Lines/Line_Sample-006(1,5).png">006</option>'+
'<option value="7" title="../ICONS/Lines/Line_Sample-007(15,10,5,10).png">007</option>'+
'<option value="8" title="../ICONS/Lines/Line_Sample-008(5,5,1,5).png">008</option>'+
'</select></div>'+
'<div id="num_301"></div><div id="slider_301"></div><BR>'+
'<div style="float: left;">Select Line Color: <BR>'+
'<div id="colorpicker-red_01"></div><div id="colorpicker-green_01"></div><div id="colorpicker-blue_01"></div>'+
'<div id="num_302"></div><div id="slider_302"></div>'+
'</div><div style="float: left;"><div id="colorpicker-swatch_01" class="ui-widget-content ui-corner-all"></div>'+
'</div><div style="float: left;"><div id="colorpicker-hex_01"></div><div id="colorpicker-rgb_01"></div></div>'+
'</p><p><div style="float: left;"><HR>Select Fill Color: <BR>'+
'<div id="colorpicker-red_02"></div><div id="colorpicker-green_02"></div><div id="colorpicker-blue_02"></div>'+
'<div id="num_303"></div><div id="slider_303"></div>'+
'</div><div style="float: left;">'+
'<div id="colorpicker-swatch_02" class="ui-widget-content ui-corner-all"></div></div>'+
'<div style="float: left;"><div id="colorpicker-hex_02"></div><div id="colorpicker-rgb_02"></div></div>'+
'<div style="clear: both;"></div></p></div>');

    $('#dialog_003').dialog({
        autoOpen: false,
        title: 'Select Line Style',
        height: 500,
        width: 320,
        closeOnEscape: true,
        modal: true,
        show: "fade",
        hide: "fade",
        buttons: {
            "設定": function(){
                Set_Text = document.Form_003.txt_line.value;
                var Temp = Line_Samples.options[Line_Samples.selectedIndex].value;
                if( Temp == 2 ) {
                    Line_Type = 5 * Line_W + "," + 5 * Line_W;
                } else if( Temp == 3 ) {
                    Line_Type = 5 * Line_W + "," + 10 * Line_W;
                } else if( Temp == 4 ) {
                    Line_Type = 10 * Line_W + "," + 5 * Line_W;
                } else if( Temp == 5 ) {
                    Line_Type = 5 * Line_W + "," + 2 * Line_W;
                } else if( Temp == 6 ) {
                    Line_Type = 1 * Line_W + "," + 5 * Line_W;
                } else if( Temp == 7 ) {
                    Line_Type = 15 * Line_W + "," + 10 * Line_W + "," + 5 * Line_W + "," + 10 * Line_W;
                } else if( Temp == 8 ) {
                    Line_Type = 5 * Line_W + "," + 5 * Line_W + "," + 1 * Line_W + "," + 5 * Line_W;
                } else {
                    Line_Type = 10 * Line_W + "," + 0;
                }
                $(this).dialog('close');
            }
        }
    });

        $("body").append('<div id="dialog_004" style="z-index: 2000"><form name="Form_004">'+
'Title: <input type="text" style="width: 230px;" name="txt_circle" value="">'+
'<p><HR><div style="clear: both;"></div>'+
'　　円の中心位置及び半径を入力してください。<BR><BR>'+
'<TR>'+
'<TD>Latitude (Deg.) :　<input type="text" name="circle_lat" value=""></TD>'+
'<BR><BR>'+
'<TD>Longitude (Deg.) : <input type="text" name="circle_lon" value=""></TD>'+
'<BR><BR>'+
'</TR><TR>'+
'<TD>円の半径 (km)：　<input type="text" name="radius" value=""></TD>'+
'<BR><BR></TR></p></form></div>');

    $('#dialog_004').dialog({
        autoOpen: false,
        title: 'Set the Circle Style',
        height: 300,
        width: 320,
        closeOnEscape: true,
        modal: true,
        show: "fade",
        hide: "fade",
        buttons: {
            "設定": function(){
                Circles_LAT[ Circles_count ] = document.Form_004.circle_lat.value * 1.0;
                Circles_LON[ Circles_count ] = document.Form_004.circle_lon.value * 1.0;
                Circles_RAD[ Circles_count ] = document.Form_004.radius.value * 1000;
                Circles_NAM[ Circles_count ] = document.Form_004.txt_circle.value;
                Circles_LNK[ Circles_count ] = " ";
                Circles_ID[ Circles_count ] = "Circle" + Circles_ID_count;
                if ((Circles_LAT[ Circles_count ] != 0) || (Circles_LON[ Circles_count ] != 0)) {
                Circles_Set( Circles_count );
                Circles_count = Circles_count + 1;
                Circles_ID_count = Circles_ID_count + 1;
                }
                $(this).dialog('close');
            }
        }
    });


     $('#slider_001, #slider_301, #colorpicker-red_01, #colorpicker-green_01, #colorpicker-blue_01, #slider_302, #colorpicker-red_02, #colorpicker-green_02, #colorpicker-blue_02, #slider_303').slider( {
         orientation: 'horizontal',
         range: 'min',
         max: 255,
         value: 127,
         slide: refreshSwatch,
         change: refreshSwatch
     } );
     $( '#slider_001' ).slider( 'value', 96 );
     $( '#colorpicker-red_01' ) . slider( 'value', 255 );
     $( '#colorpicker-green_01' ) . slider( 'value', 0 );
     $( '#colorpicker-blue_01' ) . slider( 'value', 0 );
     $( '#slider_301' ).slider( 'value', 25 );
     $( '#slider_302' ).slider( 'value', 204 );
     $( '#colorpicker-red_02' ) . slider( 'value', 255 );
     $( '#colorpicker-green_02' ) . slider( 'value', 255 );
     $( '#colorpicker-blue_02' ) . slider( 'value', 0 );
     $( '#slider_303' ).slider( 'value', 76 );
     $( '#Line_Samples' ).msDropDown();
     $( '#Marker_Samples' ).msDropDown({
        visibleRows:4,
        on:{change:function(data, ui) {
            Icon_Url = Marker_Samples.options[Marker_Samples.selectedIndex].title;
            $('#Selected_Icon img').attr('src', Icon_Url);
        }}
     });
});


function Dialog_001() {
    document.Form_001.txt_mk.value = "";
    $('#dialog_001').dialog('open');
}

function Dialog_002() {
    CSV_Data();
    document.Form_002.txt_dat.value = "";
    $('#dialog_002').dialog('open');
}

function Dialog_003() {
    document.Form_003.txt_line.value = "";
    $('#dialog_003').dialog('open');
}

function Dialog_004() {
    document.Form_004.circle_lat.value = "";
    document.Form_004.circle_lon.value = "";
    document.Form_004.radius.value = "";
    document.Form_004.txt_circle.value = "";
    $('#dialog_004').dialog('open');
}


function refreshSwatch() {
     Icon_W = Math.round($('#slider_001').slider('value') / 255 * Max_M_Size);
     if (Icon_W <= Min_M_Size) { Icon_W = Min_M_Size; }
     Icon_H = Icon_W;
     $( '#num_001' ).html( 'Marker Size： ' + Icon_W );
     $( '#Selected_Icon img' ).css( { width: Icon_W, height: Icon_H } );

     var red_01 = $( '#colorpicker-red_01' ) . slider( 'value' );
     var green_01 = $( '#colorpicker-green_01' ) . slider( 'value' );
     var blue_01 = $( '#colorpicker-blue_01' ) . slider( 'value' );
     Line_W = Math.ceil($('#slider_301').slider('value') / 255 * 10);
     Selected_Opacity = Math.round($('#slider_302').slider('value') / 255 * 100) / 100;
     Selected_Color = hexFromRGB( red_01, green_01, blue_01 );
     var red_02 = $( '#colorpicker-red_02' ) . slider( 'value' );
     var green_02 = $( '#colorpicker-green_02' ) . slider( 'value' );
     var blue_02 = $( '#colorpicker-blue_02' ) . slider( 'value' );
     Selected_Fill_Opacity = Math.round($('#slider_303').slider('value') / 255 * 100) / 100;
     Selected_Fill_Color = hexFromRGB( red_02, green_02, blue_02 );
     $( '#colorpicker-swatch_01' ) . css( 'background-color', '#' + Selected_Color );
     $( '#colorpicker-swatch_01' ) . css( 'opacity', Selected_Opacity );
     $( '#colorpicker-hex_01' ) . html( 'HEX： #' + Selected_Color );
     $( '#colorpicker-rgb_01' ) . html( 'RGB： (' + red_01 + ',' + green_01 + ',' +blue_01 + ')' );
     $( '#num_301' ).html( 'Line Width： ' + Line_W );
     $( '#num_302' ).html( 'Line Opacity： ' + Selected_Opacity );
     $( '#colorpicker-swatch_02' ) . css( 'background-color', '#' + Selected_Fill_Color );
     $( '#colorpicker-swatch_02' ) . css( 'opacity', Selected_Fill_Opacity );
     $( '#colorpicker-hex_02' ) . html( 'HEX： #' + Selected_Fill_Color );
     $( '#colorpicker-rgb_02' ) . html( 'RGB： (' + red_02 + ',' + green_02 + ',' +blue_02 + ')' );
     $( '#num_303' ).html( 'Fill Opacity： ' + Selected_Fill_Opacity );
}

function CSV_Data() {
    if(window.File) {
    var select = document.getElementById('select_002');
    select.addEventListener('change', function(e) {
    var fileData = e.target.files[0];
    Data_CSV = [];
    var reader = new FileReader();
    reader.onerror = function() {
        alert('ファイル読み込みに失敗しました。');
    }
    reader.onload = function() {
        var lineArr = reader.result.split("\r\n");
        for (var i = 0; i < lineArr.length; i++) {
            Data_CSV[i] = lineArr[i].split(",");
        }
    }
    reader.readAsText(fileData);
    }, false);
    }
}

function hexFromRGB( r, g, b ) {
     var hex = [
         r . toString( 16 ),
         g . toString( 16 ),
         b . toString( 16 )
     ];
     jQuery.each( hex, function( nr, val ) {
         if ( val . length === 1 ) {
             hex[ nr ] = "0" + val;
         }
     } );
     return hex . join( '' ) . toUpperCase();
}