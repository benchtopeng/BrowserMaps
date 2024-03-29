/***
 ---------------------------
 Creare GeoWATCH
 Copyright 2013-2023 Creare, LLC
 Proprietary. All Rights Reserved.

 This file is subject to the terms and conditions defined in
 file 'LICENSE.txt', which is part of this source code package.
 ---------------------------
 */
/*
 * L.Control.LayerChanger is used for to change the displayed layer in a map.
 * by JYB
 */

// This GeoJSON contains features that include an "icon"
// property. The value of the "icon" property corresponds
// to an image in the Mapbox Light style's sprite.
const places = {
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'properties': {	'description': "WLT",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-86.83890086, 34.88339657]}
		},
		{
			'type': 'Feature',
			'properties': {	'description': "WLB",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-87.2405405, 34.60448088]}
		},
		{
			'type': 'Feature',
			'properties': {	'description': "ALAM",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-86.76433993,	34.86009693]}
		},
		{
			'type': 'Feature',
			'properties': {	'description': "ScottOrchard",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-86.62662163, 34.9962665]}
		}
	]
};
var markerIcon = L.icon({
    iconUrl: 'assets/downTriangle.png',
    shadowUrl: 'assets/downTriangle.png',

    iconSize:     [20, 20], // size of the icon
    shadowSize:   [20, 20], // size of the shadow
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 20],  // the same for the shadow
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});
var track1 = [[	34.957	,	-87.138	]	,
			[	34.955	,	-87.057	]	,
			[	34.97	,	-87.097	]	,
			[	34.968	,	-87.016	]	,
			[	34.928	,	-86.915	]	,
			[	34.963	,	-86.874	]	,
			[	34.965	,	-86.955	]	,
			[	34.917	,	-86.854	]	,
			[	34.974	,	-86.873	]	,
			[	35	,	-86.911	]	,
			[	34.971	,	-86.812	]	,
			[	34.97	,	-86.65	]	,
			[	34.966	,	-86.589	]]
var track2 = [[	34.8	,	-86.817	],[	34.8	,	-86.817	]]
//var track2 = [[	34.957	,	-87.138	],[	34.957	,	-87.138	]]
var track3 = [[	34.327	,	-86.81	]	,
			[	34.348	,	-86.862	]	,
			[	34.341	,	-86.769	]	,
			[	34.32	,	-86.679	]]

var STREETS_AND_BORDERS_OVERLAY_INDEX = 0;
var HILLSHADE_OVERLAY_INDEX = 1;


L.Control.LayerChanger = L.Control.extend({


  options: {
    position: 'topleft',
    layers: null,
    overlays: null,
    initialLayerToDisplay: null,
    slowLoadingLayerPrefixesToWarnAbout: [],
    mostRecentSelectedIndex: -1,

  },

  checkVisibilityofMapboxLogo: function(map, layer) {
	  /* commented by Chip
    if (layer.isGeoWATCHLayer) {
      if (map.mapboxlogo._map!=null) map.mapboxlogo.removeFrom(map);
    }
    else {
      if (map.mapboxlogo._map==null) map.mapboxlogo.addTo(map);
    };
	*/
  },


  updateLayersInMenu: function(layers, keepPreviousSelection) {
    var menu = this._menu;
    var map = this._map;

    // remove all old layers, but save list of overlay layers so can add back
	console.log("layerChanger: updateLayersInMenu: starting...keepPreviousSelection=" + keepPreviousSelection);

    var self = this;
    var overlays = [];
    var maplayers = self._map._layers;
    var previouslySelectedLayerName = null;
    if (keepPreviousSelection) {
      previouslySelectedLayerName = self.options.layers[self.options.mostRecentSelectedIndex].displayName;
      console.log(previouslySelectedLayerName);
    };
    for (var i in maplayers) {
		console.log("layerChanger.js: updateLayersInMenu: mplayers = ");
		console.log(maplayers[i]);
		
      try {
        if (maplayers[i].overlay) overlays[overlays.length] = maplayers[i];
        self._map.removeLayer(maplayers[i]);
      }
      catch(e){
   	    console.log("layerChanger.js: updateLayersInMenu: fail.");
        if (e instanceof TypeError){
          console.log("Skip removing non-displayed map layer.");
        }
        else {
          throw(e);
        }
      }
    };


    // remove all previously added items from menu
    while (menu.firstChild) menu.removeChild(menu.firstChild);

    // add the (grouped) layers to the layer selection list
    this.options.layers = layers;
    var previousGroup = null;
    var defaultLayerHasBeenSet = false;
    for (var i in layers) {
      if (previousGroup == null || layers[i].groupName != previousGroup.label) {
        if (previousGroup) menu.appendChild(previousGroup);
        previousGroup = document.createElement('OPTGROUP');
        previousGroup.label = layers[i].groupName;
        //console.log('created ' + previousGroup.label)
      }
      var opt = document.createElement('option', 'leaflet-control' + ' leaflet-bar');
      opt.innerHTML = layers[i].displayName;
      opt.value = i;
      previousGroup.appendChild(opt);

      if (keepPreviousSelection && previouslySelectedLayerName != null) {
        if (previouslySelectedLayerName == layers[i].displayName && !defaultLayerHasBeenSet) {
          opt.selected = true;
		  //console.log("layerChanger.js: updateLayersInMenu A: layers[i].displayName = " + layers[i].displayName)
          map.addLayer(layers[i].mapLayer);
          this.options.mostRecentSelectedIndex = i;
          defaultLayerHasBeenSet = true;
        };
      } else if (layers[i].displayName && layers[i].displayName.indexOf(this.options.initialLayerToDisplay) != -1 && !defaultLayerHasBeenSet) {
        //console.log("layerChanger.js: updateLayersInMenu B: layers[i].displayName = " + layers[i].displayName)
		opt.selected = true;
        map.addLayer(layers[i].mapLayer);
        this.options.mostRecentSelectedIndex = i;
        defaultLayerHasBeenSet = true;
        this.checkVisibilityofMapboxLogo(map, layers[i].mapLayer);
      };

    }
    // if default layer wasn't found, select the first one
    if (!defaultLayerHasBeenSet) {
	  //console.log("layerChanger.js: updateLayersInMenu C: layers[0].displayName = " + layers[0].displayName)
      map.addLayer(layers[0].mapLayer);
      this.checkVisibilityofMapboxLogo(map, layers[0].mapLayer);
      this.options.mostRecentSelectedIndex = 0;
    }
    if (previousGroup) menu.appendChild(previousGroup);


    // add back overlays (need to be on top so visible!)
	//console.log("layerChanger.js: updateLayersInMenu (D): overlays.length = " + overlays.length);
    for (var i = 0; i < overlays.length; i++) self._map.addLayer(overlays[i]);
	
	// Added markers by chip
	for (var i in places.features) {
		var lon = places.features[i].geometry.coordinates[0];
		var lat = places.features[i].geometry.coordinates[1];
		console.log("layerChanger: updateLayersInMenu: lat = " + lat + ", lon = " + lon)
		var marker = L.marker([lat, lon], {icon: markerIcon}).addTo(map)
			.bindPopup(places.features[i].properties.description);		
		//	.bindPopup('A pretty CSS popup.<br> Easily customizable.');
		//	.openPopup();
		console.log("layerChanger: updateLayersInMenu: marker = ");
		console.log(marker);
	}
	// Add Storm Track
//    var polyline1 = L.polyline(track1, {color: 'red'}).addTo(map);
//    var polyline2 = L.polyline(track2, {color: 'red'}).addTo(map);
//	var polyline3 = L.polyline(track3, {color: 'red'}).addTo(map);
  },

  onAdd: function(map) {

	console.log("layerChanger: onAdd: starting...");

    // create the control.
    // use native HTML select element, but need special handling to get it to work on
    // touch-enabled devices
    var className = 'leaflet-control';
    var container = this._container = L.DomUtil.create('div', className);

    this._map = map;

    // create the control (essentially a drop-down menu)
    var menu = this._menu = L.DomUtil.create('select', className + '-toggle', container);
    menu.style.fontSize = '16px';
    menu.style.fontWeight = 'bold';
    menu.setAttribute('id', 'layer-changer-' + map.idx);

    this.updateLayersInMenu(this.options.layers);
    this._removeLayerButton = L.easyButton('fa-trash-o', function() { /* do nothing*/ }, 'Remove layer', '');
    this._removeLayerButton.options.position = 'topleft';

    // ***************************************************
    // event handler for when user changes selected layer
    // ***************************************************
    var self = this;
    menu.addEventListener('change', function(evt) {
	  console.log("layerChanger: onAdd: addEventListener 'change': starting...");

      var previousSelectionStr = this.options[self.options.mostRecentSelectedIndex].text;
      var pendingSelectionStr = this.options[this.selectedIndex].text;

      for (var idx in self.options.slowLoadingLayerPrefixesToWarnAbout) {
        slowLoadingLayerPrefix = self.options.slowLoadingLayerPrefixesToWarnAbout[idx]
        if (pendingSelectionStr.substring(0, slowLoadingLayerPrefix.length) == slowLoadingLayerPrefix) {
          var msg = "WARNING!\n" +
            "   Computationally Expensive Layer Selected:\n" +
            "   \"" + pendingSelectionStr + "\"\n\n" +
            "To prevent overload of GeoWATCH server:\n" +
            "   1) FIRST zoom/pan to region of interest prior to selection.\n" +
            "   2) DO NOT zoom/pan map with layer selected.\n\n" +
            "Proceed with layer display?";
          if (!window.confirm(msg)) {
            this.selectedIndex = self.options.mostRecentSelectedIndex;
            return;
          };
        }
      }

      // remove all old layers, but save list of overlay layers so can add back
      var overlays = [];
	  var baselayers= []
      var maplayers = self._map._layers;
	  console.log("layerChanger: change: removing all maplayers...");
	  console.log(maplayers);
      for (var i in maplayers) {
        if (maplayers[i].overlay) {
			overlays[overlays.length] = maplayers[i];
		} else {
			baselayers[baselayers.length] = maplayers[i];
		}
        self._map.removeLayer(maplayers[i]);
      };

	  // if the new layer is a base layer, add it

      // add new layer
      self.options.mostRecentSelectedIndex = this.selectedIndex;
      var value = this.options[this.selectedIndex].value;
      var str = this.options[this.selectedIndex].text;
      var newLayer = self.options.layers[value].mapLayer;
	  console.log("layerChanger: change: new layer = ");
	  console.log(newLayer);
	  if (newLayer.overlay == true) {
		  //add the old base layers first
		  console.log("layerChanger: change: adding base layers");
		  for (var i in baselayers) self._map.addLayer(baselayers[i]);
	  }
	  console.log("layerChanger: change: adding new layer");
      self._map.addLayer(newLayer);
      self.checkVisibilityofMapboxLogo(self._map, newLayer);

      //if (ENABLE_CUSTOM_LAYER_FEATURE) {
      //  if (newLayer.isCustomLayer) {
      //
      //    self._removeLayerButton.intendedFunction = function() {
      //      removeCookieLayer(self.options.layers[value].displayName, function(item) {
      //        refreshLayers();
      //        self.selectOption(self.options.layers[0].displayName);
      //      });
      //    };
      //    if (!self._removeLayerButton._map) {
      //      self._map.addControl(self._removeLayerButton);
      //    }
      //    getCookieLayer(self.options.layers[value].displayName, function(item) {
      //      if (!item) item = newLayer.isCustomLayer;
      //      setJSONFromString(JSON.stringify(item.definition));
      //    });
      //  } else {
      //    if (self._removeLayerButton._map) {
      //      self._map.removeControl(self._removeLayerButton);
      //    }
      //  }
      //}
      
	  
	  // if this was a change in baselayer, add back overlays (need to be on top so visible!)
	  if (newLayer.overlay == false) {
		  console.log("layerChanger: change: adding overlays back in...");
		  console.log(overlays)
		  for (var i in overlays) self._map.addLayer(overlays[i]);
	  }

	  /* Commented by Chip
	  // restore overlay grid if option selected
      var sidebar = self._map.options.maps[0].sidebar
      if (sidebar.showGridCheckBox && sidebar.showGridCheckBox.checked) self._map.grid.addTo(self._map)
	  */
  
		// Added marker by chip
//		var lon = places.features[0].geometry.coordinates[0];
//		var lat = places.features[0].geometry.coordinates[1];
//		console.log("layerChanger: updateLayersInMenu: lat = " + lat + ", lon = " + lon)
//		marker = L.marker([lat, lon]).addTo(map)
//			.bindPopup(places.features[0].properties.description);		
//		//	.bindPopup('A pretty CSS popup.<br> Easily customizable.');
//		//	.openPopup();
//		console.log("layerChanger: updateLayersInMenu: marker = ");
//		console.log(marker);
	
    });

    // special handling for touch interfaces
    if (L.Browser.touch) {


      //Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released?
      // THIS DOESN'T SEEM TO HELP ON IE10!
      container.setAttribute('aria-haspopup', true);
      menu.setAttribute('aria-haspopup', true);

      // keep click from propagating down to map layer
      L.DomEvent.on(menu, 'click', L.DomEvent.stop); // this seems safe...
      L.DomEvent.on(menu, 'dblclick', L.DomEvent.stop); // this seems safe...
      //L.DomEvent.on(menu, 'mousedown', L.DomEvent.stop); // NO!!! this will break menu on some android (e.g., Silk)
      //L.DomEvent.disableClickPropagation(container); // NO!!! this will break menu on some android (e.g., Silk)


      // TODO: try "Work around for Firefox android issue" in leaflet-src.js
      L.DomEvent.on(menu, 'click', function() {
        // focus() alone seems to be enough to activate on iPhone (Safari and Chrome)
        // focus() also at least allows subsequent use of a virtual keyboard on IE and Firefox
        menu.focus();
        // enable opening of dropdown menu on touch devices with a custom event
        // custom event seems to work on Android/Chrome, Kindle/Silk, and Windows/Chrome
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('mousedown', true, true, window, 0,
          event.screenX, event.screenY, event.clientX, event.clientY,
          event.ctrlKey, event.altKey, event.shiftKey, event.metaKey,
          0, null);
        menu.dispatchEvent(event);
      });
    } else {
      //L.DomEvent.on(menu, 'click', L.DomEvent.stop);
      //L.DomEvent.on(menu, 'dblclick', L.DomEvent.stop);
      //L.DomEvent.disableClickPropagation(menu);
      //L.DomEvent.on(container, 'click', L.DomEvent.stop);
      //L.DomEvent.on(container, 'dblclick', L.DomEvent.stop);
      L.DomEvent.disableClickPropagation(container); // this fixes issues with scrollbar dragging in dropdown menu for Firefox/IE
      L.DomEvent.disableScrollPropagation(container); // this fixes issues with scrolwheel fall-through in dropdown menu for Firefox/IE

    };

//commented out by Chip
    // also prepare for available overlay layers (e.g., streets)
//    if (this.options.overlays) {
//      var overlays = this.options.overlays;
//      map.streetsAndBordersOverlayLayer = overlays[STREETS_AND_BORDERS_OVERLAY_INDEX].mapLayer;
//      //map.hillshadeOverlayLayer = overlays[HILLSHADE_OVERLAY_INDEX].mapLayer;  //Commented by Chip
//      for (var j = 0; j < overlays.length; ++j) {
//        var layerIsActive = false;
//        if (j == HILLSHADE_OVERLAY_INDEX) layerIsActive = DEFAULT_SHOW_HILLSHADING;
//        else if (j == STREETS_AND_BORDERS_OVERLAY_INDEX) layerIsActive = DEFAULT_SHOW_STREETS;
//        else layerIsActive = true;
//        if (layerIsActive) map.addLayer(overlays[j].mapLayer);
//      };
//    };



    return container;
  },

  selectOption: function(selectMe) {
    for (var i in this.options.layers) {
      var layer = this.options.layers[i];
      if (layer.displayName === selectMe) {
        $('#layer-changer-' + this._map.idx).val(i);
        document.querySelector('#layer-changer-' + this._map.idx).dispatchEvent(new Event('change'));
        return;
      }
    }
  },

});

L.control.layerChanger = function(options) {
  return new L.Control.LayerChanger(options);
};
