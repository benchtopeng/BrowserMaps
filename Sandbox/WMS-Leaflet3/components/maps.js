/***
 ---------------------------
 Creare GeoWATCH
 Copyright 2013-2023 Creare, LLC

 This file is subject to the terms and conditions defined in
 file 'LICENSE.txt', which is part of this source code package.
 ---------------------------
 */



DEFAULT_MAIN_GEOWATCH_LAYER_INFO = {
  "default_time": "2018-03-19T18:00:00Z",
  "available_times": [
	"2015-08-20T00:00:00Z",
    "2016-08-20T00:00:00Z",
    "2016-09-20T00:00:00Z",
    "2018-03-18T18:00:00Z",
    "2018-03-19T00:00:00Z",
    "2018-03-19T06:00:00Z",
    "2018-03-19T07:00:00Z",
    "2018-03-19T08:00:00Z",
    "2018-03-19T09:00:00Z",
    "2018-03-19T10:00:00Z",
    "2018-03-19T11:00:00Z",
    "2018-03-19T12:00:00Z",
    "2018-03-19T13:00:00Z",
    "2018-03-19T14:00:00Z",
	"2018-03-19T15:00:00Z",
	"2018-03-19T16:00:00Z",
	"2018-03-19T17:00:00Z",
    "2018-03-19T18:00:00Z",
	"2018-03-19T19:00:00Z",
	"2018-03-19T20:00:00Z",
	"2018-03-19T21:00:00Z",
	"2018-03-19T22:00:00Z",	
	"2018-03-19T23:00:00Z", 
	"2018-03-20T00:00:00Z",	
	"2018-03-20T01:00:00Z",
	"2018-03-20T02:00:00Z",
	"2018-03-20T03:00:00Z",
	"2018-03-20T04:00:00Z",
	"2018-03-20T05:00:00Z",
	"2018-03-20T06:00:00Z",
	"2018-03-20T07:00:00Z",
	"2018-03-20T08:00:00Z",
	"2018-03-20T09:00:00Z",
	"2024-03-01T12:00:00Z"
  ],
  "hillshade_layer_spec": {
    "name": "(U) Hillshade (from Terrain Tiles)",
    "restrictions": [
    
    ],
    "params": {
      "layers": "datalib.elevation.hillshade.GlobalHillshade",
      "sphericalMercator": true,
      "transparent": true,
      "format": "image/png",
      "isDynamic": false,
      "inMenuByDefault": true
    },
    "options": {
      "isBaseLayer": true,
      "visibility": true,
      "wrapDateLine": false,
      "group": "(U) GeoWATCH Other",
      "transitionEffect": "resize",
      "displayInLayerSwitcher": false,
	  "overlay": true
    }
  },
  "layer_specs": [
 
  
     {
      "name": "State Borders (Nat Weather Service)",
	  "url": "https://mapservices.weather.noaa.gov:443/static/services/nws_reference_maps/nws_reference_map/MapServer/WMSServer?",
      "restrictions": [],
      "params": {
        "layers": "8",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": false,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": true,
        "visibility": false,
        "wrapDateLine": false,
        "group": "Base Maps",
        "transitionEffect": "resize",
		"overlay": false
      }
    }, 
     {
      "name": "County Borders (Nat Weather Service)",
	  "url": "https://mapservices.weather.noaa.gov:443/static/services/nws_reference_maps/nws_reference_map/MapServer/WMSServer?",
      "restrictions": [],
      "params": {
        "layers": "9",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": false,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": true,
        "visibility": false,
        "wrapDateLine": false,
        "group": "Base Maps",
        "transitionEffect": "resize",
		"overlay": false
      }
    }, 
      {
      "name": "CONUS NEXRAD Base Reflectivity (N0R)",
	  "url": "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "nexrad-n0r-wmst",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": true,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": false,
        "visibility": false,
        "wrapDateLine": false,
        "group": "NWS NEXRAD (Iowa State)",
        "transitionEffect": "resize",
		"overlay": true
      }
    },
    {
      "name": "CONUS NEXRAD Base Reflectivity (N0Q)",
	  "url": "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q-t.cgi?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "nexrad-n0q-wmst",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": true,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": false,
        "visibility": false,
        "wrapDateLine": false,
        "group": "NWS NEXRAD (Iowa State)",
        "transitionEffect": "resize",
		"overlay": true
      }
    },

    {
      "name": "IMERG Early Precipitation, 30-min Ave (L3)",
	  "url": "https://arcgis.gesdisc.eosdis.nasa.gov/authoritative/services/GPM_3IMERGHHE_06/ImageServer/WMSServer?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "GPM_3IMERGHHE_06",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": true,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": false,
        "visibility": false,
        "wrapDateLine": false,
        "group": "NASA EarthData",
        "transitionEffect": "resize",
		"overlay": true
      }
    },	
	
/*	{
      "name": "Day 1 Severe Thunderstorms Possible (Now Only)",
	  "url": "https://mapservices.weather.noaa.gov:443/vector/services/outlooks/natl_fcst_wx_chart/MapServer/WMSServer?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "29",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": true,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": true,
        "visibility": false,
        "wrapDateLine": false,
        "group": "NOAA National Weather Forecast Chart",
        "transitionEffect": "resize",
		"overlay": true
      }

    },
	{
      "name": "SPC Mesoscale Discussion (Now Only)",
	  "url": "https://mapservices.weather.noaa.gov:443/vector/services/outlooks/spc_mesoscale_discussion/MapServer/WMSServer?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "0",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": true,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": true,
        "visibility": false,
        "wrapDateLine": false,
        "group": "NOAA Storm Prediction Center (CONUS)",
        "transitionEffect": "resize",
		"overlay": true
      }

    }, */
	 {
      "name": "CaLDAS-NSRPS - Air temperature [K] (Now Only)",
	  "url": "https://geo.weather.gc.ca/geomet?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "CaLDAS-NSRPS_2.5km_AirTemp_1.5m",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": false,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": false,
        "visibility": false,
        "wrapDateLine": false,
        "group": "MSC GeoMet (Canada)",
        "transitionEffect": "resize",
		"overlay": true
      }
    },
   {
      "name": "CaLDAS-NSRPS - Dewpoint [K] (Now Only)",
	  "url": "https://geo.weather.gc.ca/geomet?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "CaLDAS-NSRPS_2.5km_Dewpoint_1.5m",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": false,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": false,
        "visibility": false,
        "wrapDateLine": false,
        "group": "MSC GeoMet (Canada)",
        "transitionEffect": "resize",
		"overlay": true
      }
    },
	
	{
      "name": "Near-Surface Soil Moisture (%sat, Now Only)",
	  "url": "https://mapservices.weather.noaa.gov:443/raster/services/obs/NWM_Land_Analysis/MapServer/WMSServer?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "13",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": false,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": true,
        "visibility": true,  //"true" will put it under layers with "false"??
        "wrapDateLine": false,
        "group": "NOAA National Water Model (CONUS)",
        "transitionEffect": "resize",
		"overlay": true
      }

    },
     
    {
      "name": "GOES East Imagery, Ch1 (Now Only)",
	  "url": "https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "conus_ch01",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": false,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": true,
        "visibility": true,
        "wrapDateLine": false,
        "group": "GOES EAST (Iowa State)",
        "transitionEffect": "resize",
		"overlay": true
      }
    },
      {
      "name": "GOES East Imagery, Ch8 (Now Only)",
	  "url": "https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "conus_ch08",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": false,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": true,
        "visibility": true,
        "wrapDateLine": false,
        "group": "GOES EAST (Iowa State)",
        "transitionEffect": "resize",
		"overlay": true
      }
    },
      {
      "name": "GOES East Imagery, Ch15 (Now Only)",
	  "url": "https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi?",
      "restrictions": [
        
      ],
      "params": {
        "layers": "conus_ch15",
        "sphericalMercator": true,
        "transparent": true,
        "format": "image/png",
        "isDynamic": false,
        "inMenuByDefault": true
      },
      "options": {
        "isBaseLayer": true,
        "visibility": true,
        "wrapDateLine": false,
        "group": "GOES EAST (Iowa State)",
        "transitionEffect": "resize",
		"overlay": true
      }
    }	
   ],
  "version": "TODO"
}



//////////////////////////////////////////////////////////////////////////////
//
// CONSTANTS
//
//////////////////////////////////////////////////////////////////////////////
//var DEFAULT_HILLSHADE_OPACITY = 0.5;


var HTTP_PREFIX = "//";
//var OGC_ENDPOINT = (GEOWATCH_PUBLIC_MODE) ? "/ogc_public" : "/ogc";
var API_ENDPOINT = (GEOWATCH_PUBLIC_MODE) ? "/api_public" : "/api";

//var DEFAULT_GEOWATCH_WMS_SERVER = HTTP_PREFIX + window.location.host + OGC_ENDPOINT;
var DEFAULT_GEOWATCH_WMS_SERVER = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi';
//var DEFAULT_GEOWATCH_API_SERVER = HTTP_PREFIX + window.location.host + API_ENDPOINT;


//var MAPBOX_TOKEN = 'pk.eyJ1IjoicmRjaGFtYmVycyIsImEiOiJja3pmcHQ3NTYza3JiMm9ua2M4YzhiN3NjIn0.Gqhbmn4nw52noWXlVLk_Ig';
//var AERIAL_VIEW_URL = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token='+MAPBOX_TOKEN;
//var STREETS_AND_BORDERS_URL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token='+MAPBOX_TOKEN;

var MAPBOX_TOKEN = '';
var AERIAL_VIEW_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
var STREETS_AND_BORDERS_URL = AERIAL_VIEW_URL;

//var ELEVATION_CONTOURS_URL = 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token='+MAPBOX_TOKEN;
//var MAPBOX_ATTRIBUTION =   '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
var MAPBOX_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

//var USE_CUSTOM_RIGHTCLICK_MENU = true;
var ENABLE_CUSTOM_LAYER_FEATURE = !GEOWATCH_PUBLIC_MODE;


//////////////////////////////////////////////////////////////////////////////
//
// DATE AND TIME UTILITY FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////

// get current date and time for display of real-time conditions
function getCurrentDateAndTimeAtMidnight() {
  // get current date and timeDependent
  var d = new Date();
  // before shifting to midnight, offset by 8 hours to account for AFWA LIS file delivery lag
  d.setHours(d.getHours() - 8);
  // then keep that adjusted date but set time to midnight GMT
  d.setUTCHours(0);
  d.setUTCMinutes(0);
  d.setUTCSeconds(0);
  d.setUTCMilliseconds(0);
  return d;
}


//////////////////////////////////////////////////////////////////////////////
//
// MAP CONTEXT MENU FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////
function getContextMenuItems(allowBookmarks, map) {
  return [

    //    callback to load pipeline description
    {
      text: 'Source Data Details',
      icon: './assets/images/Clipboard.png',
      callback: function(e) {
        // Zoom level definition for zl==0 is 360 degrees across 256 pixels.
        // Degrees/pixel is halved at each zoom level. So, degrees/pixel is:
        pointSizeInDegrees = (360. / 256.) * Math.pow(2, -this.getZoom());
        map = this; // Map on which to display popup
        showCalculationDetailsGeoWATCH_1_MakeAjaxCall(e.latlng, pointSizeInDegrees, map);
      }
    },
    '-', // divider line
    {
      text: 'View Timeseries Values',
      icon: './assets/images/line-chart.png',
      callback: function(e) {
        // Zoom level definition for zl==0 is 360 degrees across 256 pixels.
        // Degrees/pixel is halved at each zoom level. So, degrees/pixel is:
        pointSizeInDegrees = (360. / 256.) * Math.pow(2, -this.getZoom());
        map = this; // Map on which to display popup
        showTimeseriesGeoWATCH_1_MakeAjaxCall(e.latlng, pointSizeInDegrees, map);
      }
    },
    '-', // divider line
    //    callback to show lat/lon coordinates
    {
      text: 'Lookup coordinates',
      icon: './assets/images/map-2-16.png',
      callback: function(e) {
      	var lat = e.latlng.lat, lng =  e.latlng.lng;
      	while (lat<-180) lat += 360
      	while (lat>180) lat -= 360
      	while (lng<-90) lng += 180
      	while (lng>90) lng -= 180
        prompt("latitude, longitude coordinates:", lat.toString() + ", " + lng.toString())
      }
    },
    //    callback to lookup location name at lat/lon coordinates
    {
      text: 'Lookup location name',
      icon: './assets/images/searchatlas-16.png',
      callback: function(evt) {
        var locationSearch = L.Control.geocoder();

        function reverse_geocode_callback(result) {
          document.body.style.cursor = 'default';
          name = result[0].name;
          prompt("Location Name:", name);
        };
        document.body.style.cursor = 'wait';
        // zoom = Math.round(Math.log(scale / 256) / Math.log(2)),
        var scale = Math.exp(this.getZoom() * Math.log(2)) * 256.;
        locationSearch.options.geocoder.reverse(evt.latlng, scale, reverse_geocode_callback, locationSearch);
      }
    },
    '-', // divider line

    //    callback to add location as map bookmark (with name lookup)
    {
      text: allowBookmarks ? 'Add bookmark (auto-named)' : '',
      icon: allowBookmarks ? './assets/images/filled-bookmark.png' : null,
      callback: allowBookmarks ? function(evt) {
        var locationSearch = L.Control.geocoder();
        var self = this;

        function reverse_geocode_callback(result) {
          document.body.style.cursor = 'default';
          //console.log(result[0]);
          var name;
          if (result[0].name) name = result[0].name;
          else name = evt.latlng.lat.toString() + ', ' + evt.latlng.lng.toString();
          self.fire('bookmark:new', {
            name: name,
            latlng: evt.latlng,
          });
        };
        document.body.style.cursor = 'wait';
        // zoom = Math.round(Math.log(scale / 256) / Math.log(2)),
        var scale = Math.exp(this.getZoom() * Math.log(2)) * 256.;
        locationSearch.options.geocoder.reverse(evt.latlng, scale, reverse_geocode_callback, locationSearch);
      } : null,
    },
    //    callback to add location as map bookmark (no name lookup)
    {
      text: allowBookmarks ? 'Add bookmark (user-named)' : '',
      icon: allowBookmarks ? './assets/images/empty-bookmark.png' : null,
      callback: allowBookmarks ? function(evt) {
        this.fire('bookmark:new', {
          latlng: evt.latlng,
        });
      } : null,
    },

    // insert a divider line if added bookmark shortcuts, otherwise empty entry, so nothing added to menu
    allowBookmarks ? '-' : {
      text: '',
    }, // divider line

    //    callback to zoom in
    {
      text: 'Zoom in',
      icon: './assets/images/zoom-in.png',
      callback: function(e) {
        this.zoomIn();
      }
    },
    //    callback to zoom out
    {
      text: 'Zoom out',
      icon: './assets/images/zoom-out.png',
      callback: function(e) {
        this.zoomOut();
      }
    }
  ]
}



//////////////////////////////////////////////////////////////////////////////
//
// MAP LEGEND FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////

// determine scaling for legend
function getLegendScaling() {
  if (_displayedNumberOfMaps > 6) return '" width="40%" height="40%" ';
  else if (_displayedNumberOfMaps > 4) return '" width="50%" height="50%" ';
  else if (_displayedNumberOfMaps > 2) return '" width="60%" height="60%" ';
  else if (_displayedNumberOfMaps > 1) return '" width="75%" height="75%" ';
  else return '" width="100%" height="100%" ';
}


// add legend to map
function createLegend(map_i, legendInitiallyVisible) {
  // create legend as a leaflet control
  var legend = L.control({
    position: 'bottomright'
  });
  legend.div = null;

  // specify callback for display of legend in a div
  legend.onAdd = function(map) {
    if (legend.div) return legend.div;
    else {
      var div = L.DomUtil.create('div', 'info legend');
      div.style.textAlign = 'right'
      legend.div = div;
      return div;
    };
  };

  // function that specifies div.innerHTML for legend
  function getLegendHtml(mapLayer) {
    if (!mapLayer || !mapLayer.isGeoWATCHLayer) return '';
    else return '<img class="" src="' + mapLayer.legendURL + '" ' + getLegendScaling() + ' >';
  }

  // add legend to map and set initial legend
  legend.addTo(map_i);

  // create callback for updated legend after map layer changes
  map_i.on('layeradd', function(eventLayer) {
    if (eventLayer.layer.overlay == false) { // ignore overlay layers for legends
      this.legend.div.innerHTML = getLegendHtml(eventLayer.layer);
    };
  });

  // create callback for updated legend after map resize (in particular due to # maps displayed changes)
  map_i.on('resize', function() {
    var layers = this._layers;
    for (var i in layers) {
      if (layers[i].overlay == false) { // ignore overlay layers for legends
        this.legend.div.innerHTML = getLegendHtml(layers[i]);
      };
    }
  });

    // create callback for updated legend after map resize (in particular due to # maps displayed changes)
    map_i.on('resize', function() {
        var layers = this._layers;
        for (var i in layers) {
            if (layers[i].overlay == false) { // ignore overlay layers for legends
                this.legend.div.innerHTML = getLegendHtml(layers[i]);
            };
        }
    });

  return legend;
};


//////////////////////////////////////////////////////////////////////////////
//
// MAP DATE CHANGER FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////


// change date by specified period
function incrementDateAndTime(currentUTCDateAndTime, deltaDays, deltaMonths, deltaYears) {
	// create new time
	var newUTCDateAndTime = new Date(currentUTCDateAndTime);
	// increment day, month, year, as needed
	if (deltaDays!=0) newUTCDateAndTime.setUTCDate(currentUTCDateAndTime.getUTCDate() + deltaDays);
	if (deltaMonths!=0) newUTCDateAndTime.setUTCMonth(currentUTCDateAndTime.getUTCMonth() + deltaMonths);
	if (deltaYears!=0) newUTCDateAndTime.setUTCYear(currentUTCDateAndTime.getUTCYear() + deltaYears);
	return newUTCDateAndTime;
};


// adjust "TIME" tag of each layer
function adjustDasspLayerDateCallback(dateChanger, maps, deltaIndex) {

  dateChanger.incrementSelectedDateAndTime(deltaIndex, "2024-02-20T09:00:00Z");
};

function refreshMaps(dateChanger, maps) {
  newUTCDateAndTime = dateChanger.getDateAndTime();
  var newTimeStr = newUTCDateAndTime.toISOString();
  for (var j = 0; j < maps.length; ++j) {
    var dasspTimeLayers = maps[j].options.dasspTimeLayers;
    //console.log(dasspTimeLayers.length)
    for (var i = 0; i < dasspTimeLayers.length; ++i) {
      if (!dasspTimeLayers[i].timeDependent) continue;
      dasspTimeLayers[i].mapLayer.wmsParams['TIME'] = newTimeStr;
      // if layer is currently displayed in a visible map, redraw it!
      if (maps[j].hasLayer(dasspTimeLayers[i].mapLayer) && j<_displayedNumberOfMaps) {
        dasspTimeLayers[i].mapLayer.redraw();
      };
    };
  };
}


//////////////////////////////////////////////////////////////////////////////
//
// MAP BOOKMARKS FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////
/*
// add a bookmark
function addLocationToBookmarksControl(bookmarksControl, name, latlng, zoom, global) {
  var bm = {
    data: {
      id: name,
      name: name,
      latlng: latlng,
      zoom: zoom,
      global: global,
      userAdded: false
    }
  }
  bookmarksControl._onBookmarkAdd(bm);
};

// clear out all old bookmarks, but retain list of those that were user-added
function clearOldLocationsFromBookmarksControl(bookmarksControl) {

  // save user bookmarks so can add back later
  var userAddedBookmarks = [];
  for (var i = bookmarksControl._data.length - 1; i >= 0; --i) {
    if (bookmarksControl._data[i].userAdded == true) {
      userAddedBookmarks[userAddedBookmarks.length] = {
        data: bookmarksControl._data[i]
      };
    };
    try {
      bookmarksControl._removeBookmark(bookmarksControl._data[i]);
    } catch (err) {
      console.log(err);
      continue;
    }
  };
  return userAddedBookmarks;
};

// add default bookmarks
function addDefaultLocationsToBookmarksControl(bookmarksControl) {
  // add default location bookmarks (name, lat/lon, zoom, global?
  addLocationToBookmarksControl(bookmarksControl, 'Global', [41.4098, -2.1094], 2, true);
  addLocationToBookmarksControl(bookmarksControl, 'CONUS', [39.0021, -97.2949], 4, false);
  if(!GEOWATCH_PUBLIC_MODE) {
    addLocationToBookmarksControl(bookmarksControl, 'Vovchansk, Ukraine', [50.285, 36.947], 13, true);
    addLocationToBookmarksControl(bookmarksControl, 'Kandahar, Afghanistan', [31.623, 65.707], 13, true);
    addLocationToBookmarksControl(bookmarksControl, 'Kaesong, North Korea', [37.96, 126.58], 13, true);
  }
  addLocationToBookmarksControl(bookmarksControl, 'Villa Nueva, New Mexico', [35.27, -105.36], 13, false);
  addLocationToBookmarksControl(bookmarksControl, 'Gunnison, CO', [38.6, -106.9], 12, false);
  addLocationToBookmarksControl(bookmarksControl, 'Crownpoint, NM', [35.87, -107.62], 12, false);
  addLocationToBookmarksControl(bookmarksControl, 'Flagstaff, AZ', [34.7, -111.19], 10, false);
  addLocationToBookmarksControl(bookmarksControl, 'Walnut Gulch, AZ', [31.71, -110.06], 12, false);
  addLocationToBookmarksControl(bookmarksControl, "Great Sand Dunes National Park, CO", [37.76, -105.52], 12, false);
  addLocationToBookmarksControl(bookmarksControl, 'Hanover, NH', [43.69, -72.30], 12, false);
};

function makeBookmarkId(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz'; //'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var arr = new Uint32Array(1);
  for ( var i = 0; i < 10; i++ ) {
    crypto.getRandomValues(arr); //get random byte
    var fraction = arr[0] * Math.pow(2,-32); //get float mantissa 
    result += characters.charAt(Math.floor(fraction * charactersLength));
 }
 return result;
}

// add bookmark control to map
function addBookMarkControl(map, position) {
  // create bookmark control
  var bookmarksControl = new L.Control.Bookmarks({
    //position : 'bottomleft',
    position: position,
    // bookmarkTemplate defined what gets displayed in menu
    bookmarkTemplate: '<li class="{{ itemClass }}" data-id="{{ data.id }}">' +
      '<span class="{{ removeClass }}">&times;</span>' +
      '<span class="{{ nameClass }}">{{ data.name }}</span>' +
      //'<span class="{{ coordsClass }}">{{ data.coords }}</span>' +
      //'<span class="{{ nameClass }}">{{ data.global }}</span>' +
      //'<span class="{{ nameClass }}">{{ data.userAdded }}</span>' +
      '</li>',

    // popupTemplate defined what gets displayed in map marker popups
    popupTemplate: '<div><h3>{{ name }}</h3><p>{{ latlng }}, {{ zoom }}, {{ global }}, {{ userAdded }}</p></div>',
    // override getPopupContent to display added bookmark fields
    getPopupContent: function(bookmark) {
      //console.log("IN getPopupContent, bookmark:");
      //console.log(bookmark);
      return L.Util.template(this.options.popupTemplate, {
        latlng: this.formatCoords(bookmark.latlng),
        name: bookmark.name,
        zoom: bookmark.zoom,
        global: bookmark.global,
        userAdded: bookmark.userAdded,
      });
    },
    popupOnShow: false,

    // override formPopup's getBookmarkData to add bookmark fields
    formPopup: {
      getBookmarkData: function() {
        var input = this._contentNode.querySelector('.' + this.options.templateOptions.inputClass);
        var lat = this._source.getLatLng().lat,
          lng = this._source.getLatLng().lng;
        // global if outside of CONUS bounding box
        var global = lat >= 24. && lat <= 49. && lng >= -125. && lng <= -66.;
        return {
          latlng: this._source.getLatLng(),
          zoom: this._map.getZoom(),
          name: input.value + ' (user-defined)',
          global: global,
          userAdded: true,
          id: makeBookmarkId() //From Leaflet Bookmarks string.js
        };
      },
      // instead of setting input box "placeholder" to inputPlaceholder ("enter bookmark name")
      // we prepopulate it with a default placename (e.g., "Boston") and set input box "value" to it
      template: '<form class="{{ formClass }}">' +
        '<div class="input-group"><input type="text" name="bookmark-name" ' +
        //'placeholder="{{ inputPlaceholder }}" class="form-control {{ inputClass }}">' +
        'value="{{ inputPlaceholder }}" class="form-control {{ inputClass }}">' +
        '<button type="submit" class="input-group-addon {{ submitClass }}">' +
        '{{ submitText }}</button></div>' +
        '<div class="{{ coordsClass }}">{{ coords }}</div>' +
        '</form>'
    }

  });
  // add control to map
  bookmarksControl.addTo(map);

  //override default control functions to prevent addition of bookmark markers to map
  //bookmarksControl._onBookmarkAddStart = function(evt) {};
  bookmarksControl._showBookmark = function(bookmark) {};

  // clear away any previously defined bookmarks (saving user-added ones)
  var userAddedBookmarks = clearOldLocationsFromBookmarksControl(bookmarksControl);

  // add default bookmarks
  addDefaultLocationsToBookmarksControl(bookmarksControl);

  // add back user-defined bookmarks
  for (var i = 0; i < userAddedBookmarks.length; ++i) {
    bookmarksControl._onBookmarkAdd(userAddedBookmarks[i]);
  };
};
*/

//////////////////////////////////////////////////////////////////////////////
//
// LAYER CREATION FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////

// function to create an aerial view layer
function createAerialViewLayer(initial_utc_date_and_time_string) {
  var maplayer = L.tileLayer(AERIAL_VIEW_URL, {attribution: MAPBOX_ATTRIBUTION});
  
  maplayer.isGeoWATCHLayer = false;
  maplayer.legendURL = '';

  var layer = {
    mapLayer: maplayer,
    rawName: AERIAL_VIEW_URL,
    displayName: 'Aerial',
    groupName: 'Base Maps',
    timeDependent: false,
    inMenuByDefault: true,
  };

  return layer;
}


// function to create an elevation contours view layer
function createElevationContoursLayer(initial_utc_date_and_time_string) {
  var maplayer = L.tileLayer(ELEVATION_CONTOURS_URL, {attribution: MAPBOX_ATTRIBUTION});
  
  maplayer.isGeoWATCHLayer = false;
  maplayer.legendURL = '';

  var layer = {
    mapLayer: maplayer,
    rawName: ELEVATION_CONTOURS_URL,
    displayName: 'Elevation Contours',
    groupName: 'Mapbox',
    timeDependent: false,
    inMenuByDefault: true,
  };

  return layer;
}


// function to create a streets and borders layer
function createStreetsAndBordersLayer(initial_utc_date_and_time_string, url) {
  if (!url) {
    url = STREETS_AND_BORDERS_URL;
  }
  var maplayer = L.tileLayer(url, {attribution: MAPBOX_ATTRIBUTION});
  
  maplayer.isGeoWATCHLayer = false;
  maplayer.legendURL = '';

  var layer = {
    mapLayer: maplayer,
    rawName: url,
    displayName: 'Streets and Borders (Mapbox)',
    groupName: 'Base Maps',
    timeDependent: false,
    inMenuByDefault: true,
  };

  return layer;
}

// function to create a WMS layer of given type
function createWMSLayer(layerURL, layerName, displayName, groupName,
  initial_utc_date_and_time_string, timeDependent, inMenuByDefault,
  additionalParams, is_udp) {
  var maplayer = L.tileLayer.wms(
      layerURL, {
      layers: layerName,
      format: 'image/png',
      transparent: true,
      version: '1.3.0',
      tileSize: 256*2,
	  opacity: 0.6,
      //additionalParams: encodeURIComponent(JSON.stringify(additionalParams)),
      //attribution: '&copy Creare'
    }
  );
  maplayer.setParams({RESCALE: 2})
  //maplayer.setParams({RESCALE: 0})
  //    var timeDependent = layerName.substring(0, 'dassp.main_map.afwa'.length)=='dassp.main_map.afwa'
  //					|| layerName.substring(0, 'dassp.main_map.soilmoisture'.length)=='dassp.main_map.soilmoisture'
  //                   || layerName.substring(0, 'dassp.main_map.stdmob'.length)=='dassp.main_map.stdmob';

  maplayer.isGeoWATCHLayer = false;  //changed to false by Chip
  
  //Note by Chip: update this URL for legends for WMS feeds!
  maplayer.legendURL = DEFAULT_GEOWATCH_WMS_SERVER + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layerName + "&STYLE=default&FORMAT=image/png; mode=8bit";
/*
  if (is_udp && additionalParams) {
    try {
      var json = {};
      json.vmin = additionalParams.definition[displayName].style.clim[0];
      json.vmax = additionalParams.definition[displayName].style.clim[1];
      if (additionalParams.definition[displayName].style.colormap) {
        json.colormap = additionalParams.definition[displayName].style.colormap;
      }
      maplayer.legendURL += "&params=" + encodeURIComponent(JSON.stringify(json));
      maplayer.isCustomLayer = additionalParams;
    } catch (ex) {
      alert(ex);
    }
  }
*/
  var layer = {
    mapLayer: maplayer,
    rawName: layerName,
    displayName: displayName,
    groupName: groupName,
    timeDependent: timeDependent,
    inMenuByDefault: inMenuByDefault,
  };

  //console.log(layerName + (timeDependent? " TRUE" : " FALSE"));
  if (layer.timeDependent) layer.mapLayer.setParams({
    'TIME': initial_utc_date_and_time_string
  });
  return layer;
};

/*
function createGeoWatchWMSHillShadeOverlayLayer(main_geowatch_layer_info, hillshadeOpacity, initial_utc_date_and_time_string) {
  var hillshade_layer_spec = main_geowatch_layer_info.hillshade_layer_spec;
  var layerName = hillshade_layer_spec.params.layers,
    displayName = hillshade_layer_spec.name,
    groupName = hillshade_layer_spec.options.group;
  //console.log(layerName);
  //console.log(displayName);
  //console.log(groupName);
  var maplayer = L.tileLayer.wms(
    DEFAULT_GEOWATCH_WMS_SERVER, {
      layers: layerName,
      format: 'image/png',
      transparent: true,
      version: '1.3.0'
    }
  );
  maplayer.setOpacity(hillshadeOpacity);
  var layer = {
    mapLayer: maplayer,
    rawName: layerName,
    displayName: displayName,
    groupName: groupName,
    timeDependent: false,
    inMenuByDefault: false,
  };
  maplayer.isGeoWATCHLayer = true;
  maplayer.legendURL = '/legends/' + layerName;
  if (layer.timeDependent) layer.mapLayer.setParams({
    'TIME': initial_utc_date_and_time_string
  });
  return layer;
};
*/
// create list of available non-overlay layers for display
function createAvailableLayersForMap(main_geowatch_layer_info, dasspTimeLayers, 
                  initial_utc_date_and_time_string, include_advanced_layers) {
	var layers = [];
	var overlay_layers = [];
	if (!IGNORE_MAPBOX_LAYERS) {
		// first add mapbox views
		console.log("maps.js: createAvailableLayersForMap: creating Aerial and Borders layers...");

		if (0) { //set to zero by Chip
			var aerial = createAerialViewLayer(initial_utc_date_and_time_string);
			aerial.mapLayer.overlay = false; //added by chip
			if (aerial.inMenuByDefault || include_advanced_layers) layers[layers.length] = aerial;
		}
		
		//var contours = createElevationContoursLayer(initial_utc_date_and_time_string);
		//if (contours.inMenuByDefault || include_advanced_layers) layers[layers.length] = contours;
		var streets = createStreetsAndBordersLayer(initial_utc_date_and_time_string);
		streets.mapLayer.overlay = false; //added by chip
		if (streets.inMenuByDefault || include_advanced_layers) layers[layers.length] = streets;
	}

	// then add WMS views
	//for (var layer_spec_idx = 0; layer_spec_idx<1; ++layer_spec_idx) {
	var layer_specs = main_geowatch_layer_info.layer_specs;
	//console.log("maps.js: createAvailableLayersForMap: creating WMS layers...");
	for (var idx = 0; idx < layer_specs.length; idx++) {
		//console.log(layer_specs[idx]);

		var layerURL = layer_specs[idx].url;
		var layerName = layer_specs[idx].params.layers;
		var displayName = layer_specs[idx].name;
		var groupName = layer_specs[idx].options.group;
		if (groupName == ''){
			groupName = 'Other';
		}
		var timeDependent = layer_specs[idx].params.isDynamic;
		var inMenuByDefault = layer_specs[idx].params.inMenuByDefault;
		if (!inMenuByDefault && !include_advanced_layers){
			continue; 
		}
		var params = '{"plugin":"GeoWATCH"}';
		//var addlParams = JSON.parse(params);
		var addlParams = '';
		var layer = createWMSLayer(layerURL, layerName, displayName, groupName,
			initial_utc_date_and_time_string, timeDependent, inMenuByDefault,
			addlParams, false);

		layer.mapLayer.overlay = layer_specs[idx].options.overlay; //added by chip: make all WMS layers be overlays

		layers[layers.length] = layer;
		// store list of GeoWATCH time-dependent layers
		if (layer.timeDependent){
			dasspTimeLayers.push(layer);
		};
		
		// added by Chip
		//overlay_layers[overlay_layers.length] = layer
	};

/*  Commented by Chip
  if (ENABLE_CUSTOM_LAYER_FEATURE) {
    getCookieLayer(function(items) {
      // console.log("Loading " + items.length + " custom layers from cookies.");
      for (var i = 0; i < items.length; i++) {
        var item = JSON.parse(items[i]);
        var layer = createWMSLayer('UDP', item.layerName,
          'Added Layers', initial_utc_date_and_time_string, 
          true, true, item, true);
        layers[layers.length] = layer;
        if (layer.timeDependent) dasspTimeLayers.push(layer);
      }
    });

    for (var i = 0; i < URLLayers.length; i++) {
      try {
        console.log(URLLayers[i]);
        console.log(decodeURI(URLLayers[i]));
        var json = JSON.parse(decodeURI(URLLayers[i]));
      } catch (ex) {
        alert(ex);
        return
      }
      var layer = createWMSLayer('UDP', json.layerName,
        'URL Layers', initial_utc_date_and_time_string, true, true,
        json, true);
      layers[layers.length] = layer;
      if (layer.timeDependent) dasspTimeLayers.push(layer);
    }
  }
  */

  //TODO: is hillshade creation necessary here?
  // add hillshade layer also as a non-overlay layers
  // var hillshadeOpacity = 1.0;
  //var hillshade = createDasspWMSHillShadeOverlayLayer(main_dassp_layer_info, hillshadeOpacity, initial_utc_date_and_time_string);
  // var hillshade = createGeoWatchWMSHillShadeOverlayLayer(main_geowatch_layer_info, hillshadeOpacity, initial_utc_date_and_time_string);
  // Don't show this layer.
  // if (hillshade.timeDependent) dasspTimeLayers.push(hillshade);
  //if (hillshade.inMenuByDefault || include_advanced_layers) layers[layers.length] = hillshade;

	/* commented by Chip
  // set flag that this is not an overlay layer
  for (var i = 0; i < layers.length; ++i){
    layers[i].mapLayer.overlay = false;
  }
  */

  return [layers, overlay_layers];
};

// create list of available overlay layers for display
function createAvailableOverlaysForMap(overlayLayers, main_geowatch_layer_info) {
	console.log("maps.js: createAvailableOverlaysForMap: starting...");
  //var overlayLayers = [];

  // first add mapbox views
  var overlayUrl = 'https://api.mapbox.com/styles/v1/rdchambers/ck8hislyf0l9y1irxva2e63uv/tiles/{z}/{x}/{y}?access_token='+MAPBOX_TOKEN;

  overlayLayers[STREETS_AND_BORDERS_OVERLAY_INDEX] = createStreetsAndBordersLayer(initial_utc_date_and_time_string, overlayUrl);

  // then GeoWATCH views
  //overlayLayers[HILLSHADE_OVERLAY_INDEX] = createGeoWatchWMSHillShadeOverlayLayer(main_geowatch_layer_info, DEFAULT_HILLSHADE_OPACITY, //initial_utc_date_and_time_string);
  
    // set flag that this is an overlay layer
  for (var i = 0; i < overlayLayers.length; ++i) overlayLayers[i].mapLayer.overlay = true;

  return overlayLayers;
};

//////////////////////////////////////////////////////////////////////////////
//
// MAP LAYER SELECTION CONTROL FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////

function addDasspLayerPickerControl(map, idx_map, main_geowatch_layer_info, dasspTimeLayers, initial_utc_date_and_time_string) {
  console.log("maps.js: addDasspLayerPickerControl: starting function.");
  
  var layers
  var overlays
  [layers,overlays] = createAvailableLayersForMap( main_geowatch_layer_info, dasspTimeLayers, initial_utc_date_and_time_string, DEFAULT_SHOW_ADVANCED_LAYERS);
  overlays = createAvailableOverlaysForMap(overlays, main_geowatch_layer_info, initial_utc_date_and_time_string);
  // specify active layers based on which map it is
  var targetedLayerName = getActiveLayerNameForMap(main_geowatch_layer_info, idx_map)
  
  console.log("maps.js: addDasspLayerPickerControl: layers...");
  console.log(layers)
  console.log("maps.js: addDasspLayerPickerControl: overlays...");
  console.log(overlays)
  
  
  var slowLoadingLayerPrefixes = getSlowLoadingLayerPrefixesToWarnAbout()
  var layerChanger = L.control.layerChanger({ // L.control.layerChanger DEFINED IN layerChanger.js
    position: 'topleft',
    layers: layers,
    overlays: overlays,
    initialLayerToDisplay: targetedLayerName,
    slowLoadingLayerPrefixesToWarnAbout: slowLoadingLayerPrefixes,
  });

  layerChanger.addTo(map);
  map.layerChanger = layerChanger;


};

//////////////////////////////////////////////////////////////////////////////
//
// MAP SIDEBAR FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////

function createSidebar(map, container, divID, leftOrRight, showCloseButton, buttonFont, buttonHint, buttonFontSize, buttonPosition) {


  // create a placeholder div to temporarily hold sidebar (see initialize function in L.Control.Sidebar.js)
  var sidebarDiv = L.DomUtil.create('div', 'sidebar', container);
  sidebarDiv.style.height = '100%'
  sidebarDiv.style.width = '100%'
  sidebarDiv.id = divID;
  sidebarDiv.innerHTML = '';

  // create the sidebar
  var sidebar = L.control.sidebar(sidebarDiv.id, {
    closeButton: showCloseButton,
    position: leftOrRight,
    autoPan: false,
  });

  // add the sidebar to map
  map.addControl(sidebar);
  map.sidebar = sidebar;
  sidebar.div = sidebarDiv;


  // define callbacks
  map.on('click', function() {
    sidebar.hide();
  })
  map.on('drag', function() {
    sidebar.hide();
  })
  //L.DomEvent.on(sidebar.div, 'click', function () { sidebar.hide(); });
  sidebar.on('show', function() { /*console.log('Sidebar will be visible.');*/ });
  sidebar.on('shown', function() { /* console.log('Sidebar is visible.'); */ });
  sidebar.on('hide', function() { /* console.log('Sidebar will be hidden.'); */ });
  sidebar.on('hidden', function() { /* console.log('Sidebar is hidden.'); */ });
  if (showCloseButton) L.DomEvent.on(sidebar.getCloseButton(), 'click', function() { /*console.log('Close button clicked.');*/ });
  //setTimeout(function () { sidebar.show(); }, 500);// callback to display sidebar initially

  // button to show/hide sidebar
  var btn = L.easyButton(buttonFont, function() {
    sidebar.toggle();
  }, buttonHint, /*maps[imap]*/ ''); // prevent auto-addition to map so can set position first
  btn.options.position = buttonPosition;
  map.addControl(btn);
  //btn._container.style.fontWeight = 'bold'
  btn._container.style.fontSize = buttonFontSize;

  // highlight button in yellow when sidebar open
  sidebar.on('show', function() {
    btn._container.children[0].style.backgroundColor = 'yellow';
  });
  sidebar.on('hidden', function() {
    btn._container.children[0].style.backgroundColor = '';
  });
  if (isIE() && isIE() < 10) sidebar.on('hide', function() {
    btn._container.children[0].style.backgroundColor = '';
  });

  return sidebar;
};

// sidebar that displays copyright and disclaimer information
function createAboutSidebar(map, container) {
  var showCloseButton = true;
  var sidebar = createSidebar(map, container, 'aboutSidebarID', 'right', showCloseButton, 'fa-question', 'About GeoWATCH', '18px', "topright");
  var widthStr = showCloseButton ? '95%' : '100%';

  sidebar.div.innerHTML = '<object type="text/html" data="../about.html" style="height: 99%; width: ' + widthStr + ';" ></object>';

  /*
  setTimeout(function () { sidebar.show(); }, 1000);// callback to display sidebar initially
  setTimeout(function () { sidebar.hide(); }, 4000);// callback to display sidebar initially
  */

  return sidebar;
};

// sidebar that displays copyright and disclaimer information
function createOptionsSidebar(map, container, maps, main_geowatch_layer_info) {
  var showCloseButton = true;
  var btnFont = 'fa-cog';
  var btnHint = 'Customize map display';

  sidebar = createSidebar(map, container, 'optionsSidebarID', 'right', showCloseButton, btnFont, btnHint, '14px', "topright");
  //var widthStr = showCloseButton? '95%' : '100%';
  sidebar.div.innerHTML = '';
  //sidebar.div.style.display = 'block';

  // add a top level icon with heading
  addIconAndHeader(sidebar.div, btnFont, btnHint, 'h2');


  // add section for multiple maps
  addText(sidebar.div, 'Multiple map options', 'h3');
  var menu = document.createElement('select');

  var nMapsForSelection = [1, 2, 4];
  for (var i in nMapsForSelection) {
    var value = nMapsForSelection[i];
    if (value > GEOWATCH_NUM_MAPS_MAX) continue;
    var opt = document.createElement('option');
    opt.innerHTML = value.toString() + (value == 1 ? ' map' : ' maps');
    opt.value = value;
    menu.appendChild(opt);
    if (value == GEOWATCH_NUM_MAPS_INITIAL) menu.selectedIndex = i;
  }
  menu.size = nMapsForSelection.length;



  menu.addEventListener("change", function(evt) {
    var value = this.options[this.selectedIndex].value;
    //var str = this.options[this.selectedIndex].text;
    //console.log(value);
    //console.log(str);
    setNumberOfVisibleMaps(maps, value)
  });


  //Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
  //sidebar.div.setAttribute('aria-haspopup', true); // NO! this makes sidebar disappear when try to interact with it!


  sidebar.div.appendChild(menu);

  // add section for map display options
  addText(sidebar.div, 'Map display options', 'h3');

  // add checkbox for legend display on/off
  sidebar.showLegendsCheckBox = addCheckbox(sidebar.div, 'Show map legends', DEFAULT_SHOW_LEGENDS);
  sidebar.showLegendsCheckBox.addEventListener("change", function() {
    for (var i in maps) {
      mp = maps[i];
      if (!mp.legend) continue;
      if (!this.checked) {
        if (mp.legend._map == mp) mp.removeControl(mp.legend);
      } else if (this.checked) {
        if (mp.legend._map != mp) mp.legend.addTo(mp);
      };
    }
  });

  // add checkbox for streets and borders overlay on/off
  if (!IGNORE_MAPBOX_LAYERS) {
    sidebar.showStreetsCheckBox = addCheckbox(sidebar.div, 'Overlay map streets and borders', DEFAULT_SHOW_STREETS);
    sidebar.showStreetsCheckBox.addEventListener("change", function() {
      for (var i in maps) {
        mp = maps[i];
        if (!mp.streetsAndBordersOverlayLayer) continue;
        if (!this.checked) {
          if (mp.hasLayer(mp.streetsAndBordersOverlayLayer)) mp.removeLayer(mp.streetsAndBordersOverlayLayer);
        } else if (this.checked) {
          if (!mp.hasLayer(mp.streetsAndBordersOverlayLayer)) mp.streetsAndBordersOverlayLayer.addTo(mp);
        };
      }
    });
  }

  // add checkbox for hillshading overlay on/off
  sidebar.showHillshadingCheckBox = addCheckbox(sidebar.div, 'Overlay map hillshading', DEFAULT_SHOW_HILLSHADING);
  sidebar.showHillshadingCheckBox.addEventListener("change", function() {
    for (var i in maps) {
      mp = maps[i];
      if (!mp.hillshadeOverlayLayer) continue;
      if (!this.checked) {
        if (mp.hasLayer(mp.hillshadeOverlayLayer)) mp.removeLayer(mp.hillshadeOverlayLayer);
      } else if (this.checked) {
        if (!mp.hasLayer(mp.hillshadeOverlayLayer)) mp.hillshadeOverlayLayer.addTo(mp);
      };
    }
  });

  // add checkbox for grid overlay on/off
  sidebar.showGridCheckBox = addCheckbox(sidebar.div, 'Overlay map grid', false);
  sidebar.showGridCheckBox.addEventListener("change", function() {
    for (var i in maps) {
      mp = maps[i];
      if (!mp.grid) continue;
      if (!this.checked) {
        if (mp.hasLayer(mp.grid)) mp.removeLayer(mp.grid);
      } else if (this.checked) {
        if (!mp.hasLayer(mp.grid)) mp.grid.addTo(mp);
      };
    }
  });

  // add checkbox for advanced layer display
  if (!GEOWATCH_PUBLIC_MODE) {
    sidebar.showAdvancedLayersCheckBox = addCheckbox(sidebar.div, 'Display advanced map layers', DEFAULT_SHOW_ADVANCED_LAYERS, 'showAdvancedLayersCheckbox');
    sidebar.showAdvancedLayersCheckBox.addEventListener("change", function() {
      //window.wg.showAdvancedLayers = this.checked;

      var utc_date_and_time_string = null;
      for (var i in maps) {
        if (maps[i].dateChanger) {
          utc_date_and_time_string = maps[i].dateChanger.getDateAndTime().toISOString();
          break;
        }
      };
      if (!utc_date_and_time_string) {
        console.log('map.dateChanger not found!')
        return;
      };

      keepPreviousSelection = true;
      for (var i in maps) {
        mp = maps[i];
        if (!map.layerChanger) continue;
        var dasspTimeLayers = [];
        var layers = createAvailableLayersForMap( main_geowatch_layer_info, dasspTimeLayers, utc_date_and_time_string, this.checked);
        mp.layerChanger.updateLayersInMenu(layers, keepPreviousSelection);
        mp.options.dasspTimeLayers = dasspTimeLayers;
      };
    });
  };


  //setTimeout(function () { sidebar.show(); }, 1000);// callback to display sidebar initially

  //console.log(sidebar)

  return sidebar;

}; // end createOptionsSidebar()



// utility function to add a checkbox with label
function addCheckbox(cbcontainer, label, checked, id) {

  var checkboxAndLabelDiv = document.createElement('div');
  checkboxAndLabelDiv.style.display = 'block'; // one per row

  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.name = "name";
  checkbox.value = "value";
  if (id) {
    checkbox.id = id;
  } else {
    checkbox.id = "id";
  }
  //checkbox.style.display = 'inline-block';
  checkbox.checked = checked;
  checkbox.style.verticalAlign = 'middle';

  var labelelement = document.createElement('label')
  labelelement.htmlFor = "id";
  //labelelement.style.display = 'inline-block';
  var textnode = document.createTextNode(label);
  //labelelement.style.display = 'inline-block';
  labelelement.appendChild(textnode);
  labelelement.style.verticalAlign = 'middle';

  checkboxAndLabelDiv.appendChild(checkbox);
  checkboxAndLabelDiv.appendChild(labelelement);

  cbcontainer.appendChild(checkboxAndLabelDiv)
  return checkbox;

}

// utility function to add a header label
function addText(container, label, level) {
  var header = document.createElement(level);
  header.innerHTML = label
  container.appendChild(header);
  return header;
}

// add a top level icon with heading
function addIconAndHeader(container, btnFont, label, level) {

  // add font awesome icon
  var div1 = document.createElement('div');
  var extraClasses = btnFont.lastIndexOf('fa', 0) === 0 ? ' fa fa-lg' : ' glyphicon';
  var icon = L.DomUtil.create('i', btnFont + extraClasses, div1);
  icon.style.fontSize = '24px';
  icon.style.display = 'inline-block';
  div1.style.display = 'inline-block';
  container.appendChild(div1);

  // append the heading
  var div2 = document.createElement('div');
  addText(div2, '&nbsp' + label, level).display = 'inline-block';
  div2.style.display = 'inline-block'
  container.appendChild(div2);


}


//////////////////////////////////////////////////////////////////////////////
//
// MOBILITY DOWNLOAD FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////
/*
function addMenu(container, items, max_height) {
  var menu = document.createElement('select');
  for (var i in items) {
    var item = items[i];
    var opt = document.createElement('option');
    opt.innerHTML = item.toString();
    opt.value = item;
    menu.appendChild(opt);
  }
  menu.selectedIndex = 0;
  menu.size = items.length <= max_height ? items.length : max_height;
  container.appendChild(menu);
  return menu;
}

function addInputField(container, title, defaultValue, isInteger) {
  var input = document.createElement('input');
  input.title = title;
  //if (isInteger) input.type = 'number';
  //input.pattern='[0-9]{3}'
  input.value = defaultValue;
  container.appendChild(input);
  return input;
}


function insertInputFieldInTable(table, title, units, defaultValue, isInteger) {
  var row = table.insertRow();
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);

  // Add some text to the new cells:
  cell1.innerHTML = '<b>' + title + '</b>';
  cell3.innerHTML = units;

  var input = addInputField(cell2, title, defaultValue, isInteger);
  return input;
}
*/

//////////////////////////////////////////////////////////////////////////////
//
// PERMALINK FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////
/*
function create_permalink(map) {
  // grab the current URL, but remove any args (which follow '?')
  var URL = window.location.href.split('?')[0] + '?';
  // assemble options to restore view

  // Public flag
  URL += 'public=' + (GEOWATCH_PUBLIC_MODE ? 'true' : 'false');

  // number of maps
  URL += '&N=' + _displayedNumberOfMaps.toString();

  // ROI
  var center = map.getCenter();
  URL += '&lat=' + center.lat.toString() + '&lng=' + center.lng.toString() + '&zoom=' + map.getZoom().toString();

  // advanced layers option
  var maps = map.options.maps;
  var optionsSidebar = maps[0].optionsSidebar;
  if (typeof optionsSidebar.showAdvancedLayersCheckBox !== 'undefined') { // only defined for FOUO case
    URL += '&xlayers=' + (optionsSidebar.showAdvancedLayersCheckBox.checked ? 'true' : 'false');
  }

  // hillshade option
  URL += '&shade=' + (optionsSidebar.showHillshadingCheckBox.checked ? 'true' : 'false');

  // show legends option
  URL += '&legends=' + (optionsSidebar.showLegendsCheckBox.checked ? 'true' : 'false');

  // overlay streets and borders option
  URL += '&streets=' + (!IGNORE_MAPBOX_LAYERS && optionsSidebar.showStreetsCheckBox.checked ? 'true' : 'false');

  // date and time
  //console.log(maps[0]);
  URL += '&datetime=' + maps[0].dateChanger.getDateAndTime().toISOString();

  // layers
  URL += '&maps='
  var urls = [];
  for (var i in maps) {
    var layerIndex = maps[i].layerChanger.options.mostRecentSelectedIndex;
    var layer = maps[i].layerChanger.options.layers[layerIndex];
    if (layer.mapLayer.isCustomLayer) {
      urls = urls.concat([layer.mapLayer.isCustomLayer]);
    }
    // var name = layer.mapLayer.isCustomLayer ? '&PARAMS=' + JSON.stringify(layer.mapLayer.isCustomLayer) : layer.displayName;
    URL += (i == 0 ? '' : ';') + layer.displayName;
  };
  for (var i in urls) {
    URL += '&PARAMS=' + JSON.stringify(urls[i]);
  }

  URL = encodeURI(URL);
  //console.log(URL)

  prompt("Permalink URL to recreate current view:", URL);
}
*/

//////////////////////////////////////////////////////////////////////////////
//
// GEOTIFF DOWNLOAD FUNCTION
//
//////////////////////////////////////////////////////////////////////////////

/*
// function to download geotiff
function download_geotiff(map) {
  //console.log('download_geotiff');
  //console.log(map);

  // determine which layer is requested (and confirm it is a valid layer)
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

  if (layer == null) {
    window.alert("Error determining map layer for download.");
    return;
  }
  if (!layer.isGeoWATCHLayer) {
    window.alert("Requested map layer is not available for download.");
    return;
  }
  
  var layer_name = layer.wmsParams.layers;

  // determine date for requested geotiff data (if applicable)
  var datetime = layer.wmsParams.TIME;
  if (layer.wmsParams.hasOwnProperty('TIME')) {
    datetime = layer.wmsParams.TIME;
  }
  else {
    datetime = getCurrentDateAndTimeAtMidnight().toISOString();
  }
  //console.log(datetime)

  // determine lat/lon bounding box of geotiff
  var bounds = map.getBounds();
  var nw = bounds.getNorthWest();
  var ulc_lat = nw.lat;
  var ulc_lon = nw.lng;
  // console.log(bounds)
  // console.log(nw)
  var se = bounds.getSouthEast();
  // console.log(se)
  var lrc_lat = se.lat;
  var lrc_lon = se.lng;

  // determine size of geotiff
  var size = map.getSize();
  var width = size.x;
  var height = size.y;

  // get bounding box and "cleanse" latitude to be between -180 and +180
  var minx = ulc_lon;
  var miny = lrc_lat;
  var maxx = lrc_lon;
  var maxy = ulc_lat;
  var lon_delta = maxx - minx;
  if (lon_delta > 360) { // truncate bbox and adjust width proportionally
    minx = -180;
    maxx =  180;
    width = Math.round(width * (360 / lon_delta));
    lon_delta = 360;
  } else {
    while (minx < -180) {
        minx = minx + 360;
    }
    while (maxx > 180) {
        maxx = maxx - 360;
    }
    while (maxx < -180) {
        maxx = maxx + 360;
    }
    while (minx > 180) {
        minx = minx - 360;
    }
    if (maxx < minx) {
        minx = minx - 360;
    }
  }

  var cmd = OGC_ENDPOINT + '?SERVICE=WCS&VERSION=1.0.0&REQUEST=GetCoverage&FORMAT=GeoTIFF&CRS=EPSG:4326&RESPONSE_CRS=EPSG:4326' +
    '&COVERAGE=' + layer_name +
    '&BBOX='     + minx.toString() + ',' + miny.toString() +
    ','          + maxx.toString() + ',' + maxy.toString() + // minx, miny, maxx, maxy
    '&WIDTH='    + width.toString() +
    '&HEIGHT='   + height.toString() +
    '&TIME='     + datetime;

  if (layer.isCustomLayer) {
    cmd += '&PARAMS=' + encodeURIComponent(JSON.stringify(layer.isCustomLayer));
  }

  // console.log(cmd);
  window.open(cmd);
}

*/

//////////////////////////////////////////////////////////////////////////////
//
// MULTIPLE SYNCHRONIZED MAPPING FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////
// number of maps currently displayed (must be zero to start)


var _displayedNumberOfMaps = 0;

// hide all maps (because leaflet required them to have containers when originally created)
function hideInitialSetOfMaps(maps) {
  for (var i = 0; i < GEOWATCH_NUM_MAPS_MAX; ++i) {
    var content = maps[i].getContainer();
    content.parentNode.removeChild(content);
  }
}


// synchronize panning/zooming of displayed maps
function synchonizeMaps(maps, nMaps) {
  for (var i = 0; i < nMaps; i++) {
    // following line resolves synchonization issue weatherground#1
    maps[i].invalidateSize(); // VERY IMPORTANT!!!
  };
  for (var i = 0; i < nMaps; i++) {
    for (var j = 0; j < nMaps; j++) {
      if (i != j) {
		//console.log("maps.js: i = " + i + ", j = " + j + ", Object.getOwnPropertyNames(map[i]) = " + Object.getOwnPropertyNames(maps[i]))
        maps[i].sync(maps[j]);
      };
    };
  };
};

// unsynchronize panning/zooming of displayed maps
function unsynchonizeMaps(maps, nMaps) {
  for (var i = 0; i < nMaps; i++) {
    for (var j = 0; j < nMaps; j++) {
      if (i != j) maps[i].unsync(maps[j]);
    };
  };
};


// set number of visible maps
function setNumberOfVisibleMaps(maps, nMaps) {
  // remember how many maps were previously displayed
  var orig_displayedNumberOfMaps = _displayedNumberOfMaps
  _displayedNumberOfMaps = nMaps;
  if (_displayedNumberOfMaps == orig_displayedNumberOfMaps) return;

  // unsynchronize all previous maps
  unsynchonizeMaps(maps, orig_displayedNumberOfMaps);

  var containerL = L.DomUtil.get('containerL');
  var containerR = L.DomUtil.get('containerR');

  // add maps if needed
  if (_displayedNumberOfMaps > orig_displayedNumberOfMaps) {
    var leftSide = true;
    for (var i = 1; i <= _displayedNumberOfMaps; ++i) {
      if (i > orig_displayedNumberOfMaps) {
        var container = leftSide ? containerL : containerR;
        container.appendChild(maps[i - 1].getContainer())
      };
      leftSide = !leftSide;
    };
  }
  // remove maps if needed
  else if (_displayedNumberOfMaps < orig_displayedNumberOfMaps) {
    for (var i = 1; i <= orig_displayedNumberOfMaps; ++i) {
      if (i > _displayedNumberOfMaps) {
        var content = maps[i - 1].getContainer();
        content.parentNode.removeChild(content);
      }
    };
  }

  // set width of left and right column containers
  if (_displayedNumberOfMaps == 1) {
    containerL.style.width = '100%';
    containerR.style.width = '0%';
  } else {
    containerL.style.width = '49.6%';
    containerR.style.width = '49.6%';
  }

  // set size of individual displayed maps
  for (var idx_map = 0; idx_map < _displayedNumberOfMaps; ++idx_map) {
    var mapdiv_id = "map_" + idx_map.toString();
    var mapdiv = L.DomUtil.get(mapdiv_id);
    mapdiv.style.width = '100%';
    if (_displayedNumberOfMaps == 1 || _displayedNumberOfMaps == 2) mapdiv.style.height = '100%';
    else if (_displayedNumberOfMaps == 3 || _displayedNumberOfMaps == 4) mapdiv.style.height = '50%';
    else if (_displayedNumberOfMaps == 5 || _displayedNumberOfMaps == 6) mapdiv.style.height = '33%';
    else if (_displayedNumberOfMaps == 7 || _displayedNumberOfMaps == 8) mapdiv.style.height = '25%';
    else mapdiv.style.height = '25%';

    //    specify drawing of bottom map borders for bottom maps only
    var drawBottomBorder = idx_map == _displayedNumberOfMaps - 1 || idx_map == _displayedNumberOfMaps - 2;
    if (drawBottomBorder) mapdiv.style.borderBottom = '1px solid #313030';
    else mapdiv.style.borderBottom = '';

    maps[idx_map]._onResize(); // IMPORTANT!  force _onResize so maps repaint correctly
  };


  // synchronize maps
  synchonizeMaps(maps, _displayedNumberOfMaps);
}


//////////////////////////////////////////////////////////////////////////////
//
// MAP CREATION FUNCTIONS
//
//////////////////////////////////////////////////////////////////////////////


// get active layer name for map
function getActiveLayerNameForMap(main_geowatch_layer_info, idx_map) {

  function findGeoWatchLayerName(name) {
    for (var m in main_geowatch_layer_info.layer_specs)
      if (main_geowatch_layer_info.layer_specs[m].params.layers == name) return main_geowatch_layer_info.layer_specs[m].name;
    console.log('Layer "' + name + '" not found');
    return '???';
  }

  if (typeof DEFAULT_LAYERS !== 'undefined' && idx_map >= 0 && idx_map < DEFAULT_LAYERS.length) return DEFAULT_LAYERS[idx_map];
  else return findGeoWatchLayerName(main_geowatch_layer_info.default_global_layer);
}

// get list of slow loading layers that should issue a warning about
function getSlowLoadingLayerPrefixesToWarnAbout() {
  var slowLoadingLayerPrefixes = [];
  return slowLoadingLayerPrefixes;
}

// function to create a customized Leaflet map
function createMap(main_geowatch_layer_info, idx_map, maps, dasspTimeLayers, leftSide) {
	console.log("map.js: createMap: starting...");

  // certain controls only added to first map
  //var allowBookmarks = idx_map == 0 && (!isIE() || isIE() > 9);
  var allowBookmarks = idx_map;
  var addAboutSidebar = idx_map == 0;
  var addOptionsSidebar = idx_map == 0;
  var addSearchControl = idx_map == 0;
  var addZoomControl = idx_map == 0;
  var addCreditsControl = /*idx_map==0*/ false;
  var addScaleControl = idx_map == 0;
  var addDateChangerControl = idx_map == 0;
  var addMapLegend = true;
  var addFullScreenButton = idx_map == 0;
  var addLatLonControl = /*false*/ idx_map == 0;
  var showOverlayGrid = false;
  var addGeoTiffDownloadButton = !GEOWATCH_PUBLIC_MODE;
  var addPermalinkButton = idx_map == 0;
  //var addCustomLayerSidebar = ENABLE_CUSTOM_LAYER_FEATURE && idx_map == 0 && !GEOWATCH_PUBLIC_MODE;
  var addCustomLayerSidebar = 0;
  var addMapIsLoadingIndicatorControl = true;

  if (idx_map == 0) {
    //this._main_dassp_layer_info = main_dassp_layer_info;
    this._main_geowatch_layer_info = main_geowatch_layer_info;
    this._dasspTimeLayers = dasspTimeLayers;
  }

  // get map div, set CSS params, and add to parent container
  //    alternate map additions between left and right parent containers
  var container = L.DomUtil.get(leftSide ? 'containerL' : 'containerR');
  //var container = L.DomUtil.get('map');  //chip WEA

  //    specify map size based on total number of maps displayed
  var className = 'map';
  var mapdiv = L.DomUtil.create('div', className, container);
  mapdiv.id = "map_" + idx_map.toString();
  //var style = mapdiv.style, height = style.height;
  mapdiv.style.width = '100%';
  mapdiv.style.height = '0%';

  //    specify drawing of map borders
  mapdiv.style.borderTop = '1px solid #313030';
  mapdiv.style.borderLeft = '1px solid #313030';
  mapdiv.style.borderRight = '1px solid #313030';

  // now create the map
  var map = L.map(mapdiv.id, {

    // disable default Leaflet map controls so can customize their display
    zoomControl: false,
    attributionControl: true,

    fullscreenControl: false,

    // add context menu to map
//    contextmenu: USE_CUSTOM_RIGHTCLICK_MENU,
//    contextmenuWidth: 250,
//    contextmenuItems: getContextMenuItems(allowBookmarks, map),

    // list of maps and dasspTimeLayers
    maps: maps,
    dasspTimeLayers: dasspTimeLayers,
  });

  //map.attributionControl.setPrefix('&copy Creare') 
  map.attributionControl.setPrefix('Benchtop') 

  map.idx = idx_map

  // then decorate the map with controls


//  // sidebar that displays copyright and disclaimer information
//  map.aboutSidebar = addAboutSidebar ? createAboutSidebar(map, container) : null;


//  // sidebar that displays map configuration and display options
//  map.optionsSidebar = addOptionsSidebar ? createOptionsSidebar(map, container, maps, main_geowatch_layer_info) : null;

//  // logo displayer
//  map.mapboxlogo = L.control({position: 'bottomright'});
//  map.mapboxlogo.onAdd = function(map){
//    var div = L.DomUtil.create('div', 'myclass');
//    div.innerHTML= "<img src='./assets/images/mapbox-logo-white-30px.png' height=30px/>";
//    return div;
//  }
  
  // add date changer control
  if (addDateChangerControl) {
    // add a custom control to navigate dates
    var dateChanger = L.control.dateChanger({
      position: 'bottomleft',
      refreshMaps: refreshMaps,
      maps: maps,
    });
    map.dateChanger = dateChanger;
    //dateChanger.options.dayUpFn = function(e) {adjustDasspLayerDateCallback(dateChanger, dasspTimeLayers, maps, 1, 0, 0);};
    //dateChanger.options.dayDownFn = function(e) {adjustDasspLayerDateCallback(dateChanger, dasspTimeLayers, maps, -1, 0, 0);};
    //dateChanger.options.monthUpFn = function(e) {adjustDasspLayerDateCallback(dateChanger, dasspTimeLayers, maps, 0, 1, 0);};
    //dateChanger.options.monthDownFn = function (e) {adjustDasspLayerDateCallback(dateChanger, dasspTimeLayers, maps, 0, -1, 0);};
    dateChanger.options.dayUpFn = function(e) {
      adjustDasspLayerDateCallback(dateChanger, maps, !e.shiftKey ? 1 : 1 * 8 * 7);
    };
    dateChanger.options.dayDownFn = function(e) {
      adjustDasspLayerDateCallback(dateChanger, maps, !e.shiftKey ? -1 : -1 * 8 * 7);
    };
    dateChanger.options.monthUpFn = function(e) {
      adjustDasspLayerDateCallback(dateChanger, maps, !e.shiftKey ? (!e.altKey ? 8 : 8 * 365) : 8 * 30);
    };
    dateChanger.options.monthDownFn = function(e) {
      adjustDasspLayerDateCallback(dateChanger, maps, !e.shiftKey ? (!e.altKey ? -8 : -8 * 365) : -8 * 30);
    };
    dateChanger.addTo(map);
    //console.log(main_dassp_layer_info);
    //dateChanger.setDateAndTime(INITIAL_UTC_DATE_AND_TIME); // must be after addTo(map)
    //dateChanger.setAvailableDateAndTimes(main_dassp_layer_info.available_times); // must be after addTo(map)
	//console.log("maps.js: main_geowatch_layer_info.available_times = " + main_geowatch_layer_info.available_times);
	dateChanger.setAvailableDateAndTimes(main_geowatch_layer_info.available_times); // must be after addTo(map)
    
	//const available_times = ["2018-03-19T10:30:00Z","2018-03-19T11:00:00Z","2018-03-19T11:30:00Z","2018-03-19T12:00:00Z","2018-03-19T12:30:00Z"]
	//dateChanger.setAvailableDateAndTimes(available_times); // must be after addTo(map)

    //var date = dateChanger.getDateAndTime();
    //console.log(date)
    if (DEFAULT_DATETIME !== null) dateChanger.setDateAndTime(DEFAULT_DATETIME);
    this.initial_utc_date_and_time_string = dateChanger.getDateAndTime().toISOString();
  };

//  // add a lat/lon display control
//  if (addLatLonControl) {
//    L.control.mousePosition({
//      emptyString: '|', // override default "Unavailable"
//      separator: ', ', // override default " : "
//      position: 'bottomleft'
//    }).addTo(map);
//  };

  // add copyright info control (expandable)
//  if (addCreditsControl) {
//    L.controlCredits({
//      image: "././assets/images/creare.png",
//      link: "http://www.creare.com/",
//      text: "<b>GeoWATCH Web Console</b></br>Copyright &copy Creare LLC",
//      position: 'topright',
//      height: 35,
//      width: 35,
//    }).addTo(map);
//  };

  // add bookmark control
//  if (allowBookmarks) {
//    // location bookmarks control
//    addBookMarkControl(map, 'topright');
//  };

  // add a location search control
//  if (addSearchControl) {
//    var locationSearch = L.Control.geocoder({
//      // position: 'topright',
//      showResultIcons: false,
//      placeholder: 'Search Location...',
//      // added a custom maxZoom option to restrict zoom on location search result, so
//      // that local high-resolution soil moisture distribution can be ascertained
//      maxZoom: 14,
//    });
//    locationSearch.options.position = 'topright';
//    locationSearch.addTo(map);
//  };

  // add button to create a URL that will restore current view (ROI and layers)
  if (addPermalinkButton) {
    var btn = L.easyButton('fa-link', function() {
      create_permalink(map);
    }, 'Creare a link (URL) to current view', /*maps[imap]*/ ''); // prevent auto-addition to map so can set position first
    btn.options.position = "topright";
    map.addControl(btn);
  }


  // add a zoom control
  if (addZoomControl) {
    L.control.zoom({
      position: 'topright'
    }).addTo(map);
  }

  // add button to switch to full screen
//  if (addFullScreenButton) {
//    map.options.fullscreenControl = true;
//    // cannot control vertical ordering position of full screen button using default fullscreenControl option in L.map.
//    // To add after the fact, need to invoke the function passed to L.Map.addInitHook() by Leaflet.fullscreen.
//    // Didn't know how to do that so just cut and paste relevant code below
//    if (map.options.fullscreenControl) {
//      map.fullscreenControl = new L.Control.Fullscreen();
//      map.addControl(map.fullscreenControl);
//    }

//    var fullscreenchange;

//    if ('onfullscreenchange' in document) {
//      fullscreenchange = 'fullscreenchange';
//    } else if ('onmozfullscreenchange' in document) {
//      fullscreenchange = 'mozfullscreenchange';
//    } else if ('onwebkitfullscreenchange' in document) {
//      fullscreenchange = 'webkitfullscreenchange';
//    } else if ('onmsfullscreenchange' in document) {
//      fullscreenchange = 'MSFullscreenChange';
//    }

//    if (fullscreenchange) {
//      var onFullscreenChange = L.bind(map._onFullscreenChange, map);
//
//      map.whenReady(function() {
//        L.DomEvent.on(document, fullscreenchange, onFullscreenChange);
//      });
//
//      map.on('unload', function() {
//        L.DomEvent.off(document, fullscreenchange, onFullscreenChange);
//      });
//    }
//  };

  // add a scale display control
  if (addScaleControl) {
    L.control.scale({
      position: 'bottomleft'
    }).addTo(map);
  };

//  // add a rectangular overlay grid
//  var grid = L.virtualGrid({
//    cellSize: 64,
//  })
//  grid.options.style.fill = false;
//  grid.options.style.weight = 0.5;
//  if (showOverlayGrid){
//    grid.addTo(map);
//  }
//  map.grid = grid;

/*
  // add map legend
  map.legend = addMapLegend ? createLegend(map) : null
  if (map.legend && !DEFAULT_SHOW_LEGENDS){
    map.removeControl(map.legend);
  };
*/

  // set initial map position and zoom level
  map.setView(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM);


  // add control that allows user to select displayed layer (must occur after map.setView called!)
  //if (/*idx_map==0*/true) addSimpleLayerControl(map, idx_map, main_dassp_layer_info, dasspTimeLayers, initial_utc_date_and_time_string);
  //else addLayerControl(map, idx_map, main_dassp_layer_info, dasspTimeLayers);
  addDasspLayerPickerControl(map, idx_map, main_geowatch_layer_info, dasspTimeLayers, initial_utc_date_and_time_string);

//  map.addLayerSidebar = addCustomLayerSidebar ? createAddLayerSidebar(map, maps, container, main_geowatch_layer_info) : null;

//  // add button to download geotiff of displayed layer
//  if (addGeoTiffDownloadButton) {
//    var btn = L.easyButton('fa-cloud-download', function() {
//      download_geotiff(map);
//    }, 'Download displayed map data (GeoTIFF file)', /*maps[imap]*/ ''); // prevent auto-addition to map so can set position first
//    btn.options.position = "topleft";
//    map.addControl(btn);
//  };

  // add "loading in progress" indicator
//  if (addMapIsLoadingIndicatorControl) {
//    var loadingControl = L.Control.loading({
//      position: "topleft",
//      separate: true
//    });
//    map.addControl(loadingControl);
//  };


	//console.log("maps.js: createMap: Object.keys(map) = " + Object.keys(map))
  return map;
};


//////////////////////////////////////////////////////////////////////////////
//                                                                          //
//                                                                          //
//  MAIN GeoWATCH WEB CONSOLE CREATION FUNCTIONS                            //
//  -----------------------------------------                               //
//                                                                          //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////


//  invoke json request to load GeoWATCH map data
var GEOWATCH_JSON_MAP_DATA_CREATED, MAIN_GEOWATCH_LAYER_INFO;
var main_map_json_file = './main_map.json'

GEOWATCH_JSON_MAP_DATA_CREATED = $.getJSON(main_map_json_file)
  .done(function(data) {
    MAIN_GEOWATCH_LAYER_INFO = data;
  })
  .then( function() {
      //console.log("maps.jps: GEOWATCH_JSON_MAP_DATA_CREATED = " + GEOWATCH_JSON_MAP_DATA_CREATED);

      // create array of maps
      var maps = [];
      // keep track of GeoWATCH time-dependent layers for updating!
      var dasspTimeLayers = [];
      // alternate addition of maps to left and right columns
      var leftSide = true;

      // initialUtcDatetime = new Date().toISOString();
      // var layerPickerLayers = createAvailableLayersForMap( MAIN_GEOWATCH_LAYER_INFO, dasspTimeLayers, initialUtcDatetime, DEFAULT_SHOW_ADVANCED_LAYERS);

      // set default date time from JSON (if not already set by permalink in index.html)
	  console.log("maps.js: DEFAULT_DATETIME = " + DEFAULT_DATETIME);
      if (DEFAULT_DATETIME === null) DEFAULT_DATETIME = new Date(MAIN_GEOWATCH_LAYER_INFO.default_time).toISOString();

      // GEOWATCH_NUM_MAPS_MAX defined in parent html file
      for (var imap = 0; imap < GEOWATCH_NUM_MAPS_MAX; ++imap) {
        // create the i-th map
        maps[maps.length] = createMap(MAIN_GEOWATCH_LAYER_INFO, imap, maps, dasspTimeLayers, leftSide);
        leftSide = !leftSide;
      };

      // hide all maps (because leaflet required them to have containers when originally created)
      hideInitialSetOfMaps(maps);

      // set number of visible maps
      setNumberOfVisibleMaps(maps, GEOWATCH_NUM_MAPS_INITIAL);

  })
  .fail(function(data) {
	  
	console.log('maps.js: Warning: Could not get JSON GeoWATCH map layer specs from http GET at: ' + main_map_json_file + ".  Proceeding with defaults...");
	
	//console.log(data)

	MAIN_GEOWATCH_LAYER_INFO = DEFAULT_MAIN_GEOWATCH_LAYER_INFO;
	data = MAIN_GEOWATCH_LAYER_INFO;
	//console.log("maps.js: new json = " + MAIN_GEOWATCH_LAYER_INFO);
	//console.log("maps.js: MAIN_GEOWATCH_LAYER_INFO.default_time = " + MAIN_GEOWATCH_LAYER_INFO.default_time);

      // create array of maps
      var maps = [];
      // keep track of GeoWATCH time-dependent layers for updating!
      var dasspTimeLayers = [];
      // alternate addition of maps to left and right columns
      var leftSide = true;

	//console.log("maps.js: DEFAULT_DATETIME = " + DEFAULT_DATETIME);
	if (DEFAULT_DATETIME === null) DEFAULT_DATETIME = new Date(MAIN_GEOWATCH_LAYER_INFO.default_time).toISOString();

	// GEOWATCH_NUM_MAPS_MAX defined in parent html file
	//console.log("maps.js: GEOWATCH_NUM_MAPS_MAX = " + GEOWATCH_NUM_MAPS_MAX)
	for (var imap = 0; imap < GEOWATCH_NUM_MAPS_MAX; ++imap) {
		// create the i-th map
		maps[maps.length] = createMap(MAIN_GEOWATCH_LAYER_INFO, imap, maps, dasspTimeLayers, leftSide);
		//maps[maps.length] = createMap([], imap, maps, dasspTimeLayers, leftSide);
		leftSide = !leftSide;
	};

	// hide all maps (because leaflet required them to have containers when originally created)
	hideInitialSetOfMaps(maps);

	// set number of visible maps
	setNumberOfVisibleMaps(maps, GEOWATCH_NUM_MAPS_INITIAL);
	
	
  });

