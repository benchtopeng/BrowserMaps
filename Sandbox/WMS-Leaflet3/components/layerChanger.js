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
const arrayLocations = {
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'properties': {	'description': "ALAM",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-86.76433993,	34.86009693]}
		},
		{
			'type': 'Feature',
			'properties': {	'description': "ScottOrchard",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-86.62662163, 34.9962665]}
		},
		{
			'type': 'Feature',
			'properties': {	'description': "WLB",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-87.2405405, 34.60448088]}
		},
		{
			'type': 'Feature',
			'properties': {	'description': "WLT",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-86.83890086, 34.88339657]}
		},
		{
			'type': 'Feature',
			'properties': {	'description': "Chunky",'icon': 'downTriangle'	},
			'geometry': {'type': 'Point', 'coordinates': [-88.96902047, 32.33351041]}
		},

	]
};

var ArrayIcon = L.Icon.extend({
    options: {
        shadowUrl: 'assets/circleX_black.png',
        iconSize:     [16,16],
        shadowSize:   [16,16],
        iconAnchor:   [8,8],
        shadowAnchor: [8,8],
        popupAnchor:  [0,-8]
    }
});
var arrayIcons = [new ArrayIcon({iconUrl: 'assets/circleX_red.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_green.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_blue.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_yellow.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_magenta.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_cyan.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_gray2.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_gray4.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_gray6.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_gray8.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_black.png'}),
				  new ArrayIcon({iconUrl: 'assets/circleX_clear.png'})]
/*
var markerIcon = L.icon({
    iconUrl: 'assets/downTriangle.png',
    shadowUrl: 'assets/downTriangle.png',

    iconSize:     [20, 20], // size of the icon
    shadowSize:   [20, 20], // size of the shadow
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 20],  // the same for the shadow
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});
*/

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


	//this appears to be called only once...at startup when the layerPicker is added to the map
  updateLayersInMenu: function(layers, keepPreviousSelection) {
    var menu = this._menu;
    var map = this._map;

		// remove all old layers, but save list of overlay layers so can add back
		//console.log("layerChanger: updateLayersInMenu: starting. keepPreviousSelection = " + keepPreviousSelection);
    var self = this;
    var overlays = [];
    var maplayers = self._map._layers; //this will be empty the first time this is called
		let was_empty_map = true    
		var previouslySelectedLayerName = null;
    if (keepPreviousSelection) {
      previouslySelectedLayerName = self.options.layers[self.options.mostRecentSelectedIndex].displayName;
      console.log(previouslySelectedLayerName);
    };
    for (var i in maplayers) {
			//console.log("layerChanger.js: updateLayersInMenu: mplayers = "); console.log(maplayers[i]);
			was_empty_map = false; //this map had layers!
			
			try {
				if (maplayers[i].overlay) {
					overlays[overlays.length] = maplayers[i];
				}
				self._map.removeLayer(maplayers[i]);
			} catch(e){
				console.log("layerChanger.js: updateLayersInMenu: fail.");
				if (e instanceof TypeError){
					console.log("layerChanger: updateLayersInMenu: Skip removing non-displayed map layer.");
				}
				else {
					throw(e);
				}
			}
		};

    // remove all previously added items from menu
    while (menu.firstChild) menu.removeChild(menu.firstChild);

		//choose defaults if none were selected
		if (!keepPreviousSelection && (previouslySelectedLayerName == null)) {
			//console.log("layerChanger: updateLayersInMenu: using default for previous selected layer");
			
			//add a base map...assume that first layer is our base map
			map.addLayer(layers[0].mapLayer);  //add it to the map
			this.checkVisibilityofMapboxLogo(map, layers[0].mapLayer);
			this.options.mostRecentSelectedIndex = 0;
			keepPreviousSelection = true;
			
			//now assign a default weather layer
			previouslySelectedLayerName = this.options.initialLayerToDisplay;
		}
		//console.log("layerChanger: updateLayersInMenu: previouslySelectedLayerName = " + previouslySelectedLayerName);
		
    // add the (grouped) layers to the layer selection list
    this.options.layers = layers;
    var previousGroup = null;
    var defaultLayerHasBeenSet = false;
    for (var i in layers) {  //loop over each layer
			let this_layer_already_active = false;
		
			//is this the start of a new group within the menu?
      if (previousGroup == null || layers[i].groupName != previousGroup.label) {
				//create a new group within the menu
        if (previousGroup) menu.appendChild(previousGroup);
        previousGroup = document.createElement('OPTGROUP');
        previousGroup.label = layers[i].groupName;
        //console.log('created ' + previousGroup.label)
      }
  
			//now, create the menu item itself
			var opt = document.createElement('option', 'leaflet-control' + ' leaflet-bar');
      opt.innerHTML = layers[i].displayName;
      opt.value = i;
      previousGroup.appendChild(opt);
	  
			//look to see if this layer is the selected layer (and make it active)
      if (keepPreviousSelection && previouslySelectedLayerName != null) {
				//is this the layer that matches our initial selection?
        if (previouslySelectedLayerName == layers[i].displayName && !defaultLayerHasBeenSet) {
					//yes, it is our selected layer
          //console.log("layerChanger.js: updateLayersInMenu A: layers[i].displayName = " + layers[i].displayName)
          opt.selected = true;
					map.addLayer(layers[i].mapLayer);  //add this layer to the map
          this.options.mostRecentSelectedIndex = i;
          defaultLayerHasBeenSet = true;
					this_layer_already_active = true;
        };
      } else if (layers[i].displayName && layers[i].displayName.indexOf(this.options.initialLayerToDisplay) != -1 && !defaultLayerHasBeenSet) {
				//an alaterntive way of finding the layer to make active
				//console.log("layerChanger.js: updateLayersInMenu B: layers[i].displayName = " + layers[i].displayName)
				opt.selected = true;
        map.addLayer(layers[i].mapLayer); //add this layer to the map
        this.options.mostRecentSelectedIndex = i;
        defaultLayerHasBeenSet = true;
				this_layer_already_active = true;
        this.checkVisibilityofMapboxLogo(map, layers[i].mapLayer);
      };
			
			//add this if forced to be the active layer by the original layer_specs (if it's not already activated)
			//console.log("layerChanger: updateLayersInMenu: here A");
			if (was_empty_map && (!this_layer_already_active)) {
				//console.log("layerChanger: updateLayersInMenu: here B: layers[i].mapLayer...");
				//console.log(layers[i].mapLayer);
				if (layers[i].mapLayer.hasOwnProperty("default_active")) {
					//console.log("layerChanger: updateLayersInMenu: here C");
					if (layers[i].mapLayer.default_active == true) {
						//console.log("layerChanger: updateLayersInMenu: here D");
						map.addLayer(layers[i].mapLayer);  //add this layer to the map
					}
				}
			}
			
    } //end loop over layers
    
	/*
		// if default layer wasn't found, select the first one
    if (!defaultLayerHasBeenSet) {
	  //console.log("layerChanger.js: updateLayersInMenu C: layers[0].displayName = " + layers[0].displayName)
      map.addLayer(layers[0].mapLayer);
      this.checkVisibilityofMapboxLogo(map, layers[0].mapLayer);
      this.options.mostRecentSelectedIndex = 0;

    }
	*/
    if (previousGroup) menu.appendChild(previousGroup); //what is this?  To ensure that we added the last group?

    // add back overlays (need to be on top so visible!)
		//console.log("layerChanger.js: upCdateLayersInMenu (D): overlays.length = " + overlays.length);
    for (var i = 0; i < overlays.length; i++) self._map.addLayer(overlays[i]);
	
		// Added array location markers by chip
		for (var i in arrayLocations.features) {
			var lon = arrayLocations.features[i].geometry.coordinates[0];
			var lat = arrayLocations.features[i].geometry.coordinates[1];
			//console.log("layerChanger: updateLayersInMenu: lat = " + lat + ", lon = " + lon)
			var marker = L.marker([lat, lon], {icon: arrayIcons[i]}).addTo(map)
				.bindPopup(arrayLocations.features[i].properties.description);		

		}

  },

  onAdd: function(map) {

		//console.log("layerChanger: onAdd: starting...");

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

    this.updateLayersInMenu(this.options.layers); //this draws the layers? but only when the layer selector is added to the map
    this._removeLayerButton = L.easyButton('fa-trash-o', function() { /* do nothing*/ }, 'Remove layer', '');
    this._removeLayerButton.options.position = 'topleft';

    // ***************************************************
    // event handler for when user changes selected layer (and only when the user selects a layer, not at startup)
    // ***************************************************
    var self = this;
    menu.addEventListener('change', 
			function(evt) {
				//console.log("layerChanger: onAdd: addEventListener 'change': starting...");

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
				for (var i in maplayers) {
					if (maplayers[i].overlay) {
						overlays[overlays.length] = maplayers[i];
					} else {
						baselayers[baselayers.length] = maplayers[i];
					}
					self._map.removeLayer(maplayers[i]);
				};

				// get the new layer
				self.options.mostRecentSelectedIndex = this.selectedIndex;
				var value = this.options[this.selectedIndex].value;
				var str = this.options[this.selectedIndex].text;
				var newLayer = self.options.layers[value].mapLayer;
				if (newLayer == undefined) newLayer = self.options.layers[value] //added by Chip to handle KML_LSR layers
				
				
				//loop over all layer types and add them.
				//Note: we are only (currently) allowing one layer for each type of layer (layerID).
				//You can display multiple layerIDs simulatneously, but only one representative of each
				//layerID.  This is an arbitrary choice...it's may way of keeping the maps sane.
				//You might choose to change this to allow multiple layers for each layerID.  Your call.
				for (var layerID = 0; layerID < 100; layerID++) {   //let's assume 100 is big enough to cover all layerIDs
					if (newLayer.overlay == layerID) {  //if the current layerID is the same as the new layer, only add the new new layer
						self._map.addLayer(newLayer);
						self.checkVisibilityofMapboxLogo(self._map, newLayer); 
					} else {
						if (layerID==0) { // zero means that it's a base layer
							//add in the base layer(s)
							for (var i in baselayers) self._map.addLayer(baselayers[i]);
						} else {
							///add in the overlay layers, but only those on if a different ID than the current newLayer
							for (var i in overlays) {
								if (newLayer.overlay != overlays[i].overlay) self._map.addLayer(overlays[i]);
							}
						}
					}
				}

				/* Commented by Chip
				// restore overlay grid if option selected
					var sidebar = self._map.options.maps[0].sidebar
					if (sidebar.showGridCheckBox && sidebar.showGridCheckBox.checked) self._map.grid.addTo(self._map)
				*/
						
				//update all time dependent layers
				//console.log("layerChanger: change: self..."); console.log(self)
				dateChanger = self._map.dateChanger
				//console.log("layerChanger: change: dateChanger..."); console.log(dateChanger)
				maps = dateChanger.options.maps
				//console.log("layerChanger: change: maps..."); console.log(maps)
				dateChanger.options.refreshMaps(dateChanger, maps);

			} 

			
		);  // end menu.addEventListener('change'

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
