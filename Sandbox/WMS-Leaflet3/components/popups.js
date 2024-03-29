/***
 ---------------------------
 Creare GeoWATCH
 Copyright 2013-2023 Creare, LLC

 This file is subject to the terms and conditions defined in
 file 'LICENSE.txt', which is part of this source code package.
 ---------------------------
 */

 //////////////////////////////////////////////////////////////////////////////
//
// Point Data Functions
//
//////////////////////////////////////////////////////////////////////////////

function showCalculationDetailsGeoWATCH_1_MakeAjaxCall(latLng, pointSizeInDegrees, map) {
    var api_string = GEOWATCH_PUBLIC_MODE? '/api_public' : '/api';
    showCalculationDetails_1_MakeAjaxCall(latLng, pointSizeInDegrees, map, api_string);
};

function showCalculationDetails_1_MakeAjaxCall(latLng, pointSizeInDegrees, map, api_string) {
        // Prep data for ajax request.
    var lat = latLng.lat, lng = latLng.lng;
    while (lng<-180.0) lng += 360.0; // unwrap so -180 <= lng <= +180
    while (lng>+180.0) lng -= 360.0;

    var datetime = map.options.dasspTimeLayers[0].mapLayer.wmsParams.TIME;
    if (datetime==null) { window.alert("Error determining speed map date and time for download."); return;}
    // determine which layer is requested (and confirm it is an available layer)
    var maplayers = map._layers;
    var layer = null;
    var layer_name = "NULL";
    for (var i in maplayers) {
        if (!maplayers[i].overlay) {
            //console.log(maplayers[i]);
            layer = maplayers[i];
            break;
        };
    };
    if (layer==null) {
        window.alert("Error determining map layer for download.");
        return;
    }
    //console.log(layer)
    if (!layer.isGeoWATCHLayer) {
        window.alert("Requested map layer is not available for download.");
        return;
    }
    var layer_name = layer.wmsParams.layers;

    var extraOptions =',"params":{"plugin":"GeoWATCH"}';
    var params = [
        '"lat":'+ lat.toString(),
        '"lon":' + lng.toString(),
        '"datetime":"' + datetime + '"',
        '"layer":"' + layer_name + '"',
        '"params": {"plugin":"GeoWATCH"}'
    ];
    extraOptions + '}';
    if (layer.isCustomLayer) {
        if (!layer.isCustomLayer.definition || !layer.isCustomLayer.layerName) {
            window.alert("Requested custom layer is missing definition.");
            return;
        }
        params.push('"definition":' + encodeURIComponent(JSON.stringify(layer.isCustomLayer.definition)));
        params.push('"layerName":' + JSON.stringify(layer.isCustomLayer.layerName));
    }

    var cmd = api_string + '/calculation_details?params={' + params.join(',') + '}';

    // Form API request.
    console.log(cmd)

    // Create popup with 'waiting' text.
    popup = L.popup({maxWidth:1000, maxHeight:1000}).setContent('Requested calculation details for point ' + latLng.lat.toFixed(4).toString() + ', ' + latLng.lng.toFixed(4).toString() +
        '.<br><br><b><i>Waiting for response from server...</i></b>').setLatLng(latLng).openOn(map);

    //jQuery.get( url [, data ] [, success ] [, dataType ] )
    // Callback signature: Function( PlainObject data, String textStatus, jqXHR jqXHR )
    function callbackWithVariablesFromClosure(data, textStatus, jqXHR) {
        showCalculationDetails_2_DataReceivedCallback(map, popup, latLng, data);
    }
    $.get(cmd,null,callbackWithVariablesFromClosure,'json');
}

function showCalculationDetails_2_DataReceivedCallback(map, popup, latLng, data) {
    var hash_of_nodes = {};
    function visit(description) {
        if ( _.isArray(description) ) {
            _.each(_.values(description), function(node) {
                if (node.active) { visit(node) }
                });
        } else {
            hash_of_nodes[description.node_id] = description;
            _.each(_.values(description.inputs), visit);
        }
    }

    // Make a hash of the nodes in data.description, ignoring duplicates.
    visit(data.description);

    node_description_html = node_description_html = "<small><ul>" + _.map(_.values(hash_of_nodes), _.template('<li><b>${name}:</b> <i>${value}</i></li>')).join('') + "</ul></small>";

    html = ('Requested calculation details for point ' + latLng.lat.toFixed(4).toString() + ', ' + latLng.lng.toFixed(4).toString() +
        '.<br><br><i>'+_.escape(data.desc)+'</i><br><b>' + data.value + ' ' + _.escape(data.units) + '</b><br><br>' +
        // '<small><pre>' +
        //_.escape(JSON.stringify(data.description,null,4)) + '</pre></small><p>' + 
        node_description_html + '<br><br><a download="calculation_details.json" href="data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2)) +
        '">Download as JSON</a><br>')
    popup.setContent(html);
    popup.update();
}

function showTimeseriesGeoWATCH_1_MakeAjaxCall(latLng, pointSizeInDegrees, map) {
    var api_string = GEOWATCH_PUBLIC_MODE? '/api_public' : '/api';
    showTimeseries_1_MakeAjaxCall(latLng, pointSizeInDegrees, map, api_string)
};

function showTimeseries_1_MakeAjaxCall(latLng, pointSizeInDegrees, map, api_string) {
    // Prep data for ajax request.
    var lat = latLng.lat, lng = latLng.lng;
    while (lng<-180.0) lng += 360.0; // unwrap so -180 <= lng <= +180
    while (lng>+180.0) lng -= 360.0;

    var maplayers = map._layers;
    var layer = null;
    var layer_name = "NULL";
    for (var i in maplayers) {
        if (!maplayers[i].overlay) {
            // console.log(maplayers[i]);
            layer = maplayers[i];
            break;
        };
    };
    if (layer==null) {
        window.alert("Error determining map layer for download.");
        return;
    }
    if (!layer.isGeoWATCHLayer) {
        window.alert("Requested map layer is not available for download.");
        return;
    }
    var layer_name = layer.wmsParams.layers;

    // Form API request.
    var datetime = map.options.dasspTimeLayers[0].mapLayer.wmsParams.TIME;
    var params = [
        '"lat":' + lat.toString(),
        '"lon":' + lng.toString(),
        '"end_datetime":"' + datetime + '"',
        '"layer":"' + layer_name + '"'
    ];
    if (layer.isCustomLayer) {
        params.push('"definition":' + encodeURIComponent(JSON.stringify(layer.isCustomLayer.definition)));
    }
    var cmd = api_string + '/timeseries?params={' + params.join(',') + '}';

    // Create popup with 'waiting' text.
    popup = L.popup({maxWidth:1000, maxHeight:1000}).setContent('Requested timeseries for point ' + latLng.lat.toFixed(4).toString() + ', ' + latLng.lng.toFixed(4).toString() +
        '.<br><br><b><i>Waiting for response from server...</i></b>').setLatLng(latLng).openOn(map);

    //jQuery.get( url [, data ] [, success ] [, dataType ] )
    // Callback signature: Function( PlainObject data, String textStatus, jqXHR jqXHR )
    function callbackWithVariablesFromClosure(data, textStatus, jqXHR) {
        showTimeseries_2_DataReceivedCallback(map, popup, latLng, data);
    }
    request = $.get(cmd);
    request.then(callbackWithVariablesFromClosure, function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    });
}

function showTimeseries_2_DataReceivedCallback(map, popup, latLng, data) {
    // Embed the CSV data in the link itself for fast/easy downloading without calling back to the server.
    width = (map._container.offsetWidth*.7 - 120);
    height = (map._container.offsetHeight*.7 - 100);

    divId = map._container.id + "_timeseries";
    html = (//'Requested calculation details for point ' + latLng.lat.toFixed(4).toString() + ', ' + latLng.lng.toFixed(4).toString() + '.<br><br>'+
        '<div id="'+divId+'" class="with-3d-shadow with-transitions"><svg style="height:'+height+'px;width:'+width+'px">Loading plot...</svg></div><br><br><a download="dassp_export.csv" href="data:text/csv;charset=utf-8,' + encodeURIComponent(data.csv_representation) +
        '">Download as CSV</a><br>');
    popup = L.popup({maxWidth:width+200, maxHeight:height+200}).setContent(html).setLatLng(latLng).openOn(map);

    showTimeseries_3_makePlot(map, popup, data, divId);

    popup.update();
}

function showTimeseries_3_makePlot(map, popup, data, plotId) {
    nv.addGraph(function() {
        var chart = nv.models.lineWithFocusChart();

        chart.x(function (e) { return new Date(e.datetime) })
        chart.y(function (e) {
            return e.value; //_.isNull(e.value)?undefined:e.value;
        })
        chart.xAxis.tickFormat(function(d) {
            return d3.time.format('%Y-%m-%d')(new Date(d))
        });
        //chart.xAxis.rotateLabels(-25)
        chart.x2Axis.tickFormat(function(d) {
            return d3.time.format('%Y-%m-%d')(new Date(d))
        });
        chart.yAxis.tickFormat(d3.format(',.2f'));
        chart.y2Axis.tickFormat(d3.format(',.2f'));
        chart.forceY(data.ylims)
        chart.tooltip.contentGenerator(function(info) {
            return info.series[0].key + "<br>&nbsp;&nbsp;&nbsp;"+(new Date(info.point.datetime)).toString()+"<br>&nbsp;&nbsp;&nbsp;<b><i>"+info.point.value+" " + data.data[0].units + " </i></b>"
        })

        chart.brushExtent(data.xbrushlims);
        width = (map._container.offsetWidth*.7 - 120);
        height = (map._container.offsetHeight*.7 - 100);
        chart.width(width);
        chart.height(height);

        d3.select('#'+plotId +' svg')
            .datum(data.data)
            .call(chart);

        nv.utils.windowResize(chart.update);
        map._popup.chart = chart;

        return chart;
    });

}
//////End point data functions/////////////////////