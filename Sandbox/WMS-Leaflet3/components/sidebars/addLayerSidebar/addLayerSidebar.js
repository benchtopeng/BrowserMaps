/* Local storage methods/variables */
this._prefix = 'user-layer-storage';

this._storage = window.localStorage;
this._data = [];
this._JSON_RE = /^[\{\[](.)*[\]\}]$/;
var jsonInput = document.createElement("div");
var editorOptions = {
  mode: 'code'
}
this.JSONEditor = new JSONEditor(jsonInput, editorOptions);
this.selectedLayerType = 'Spatial Convolution';
var self = this;

/**
 * Provide only the callback to get all items,
 * or provide a key and a callback to get a specific layer.
 * @param  {string}   key      the id of the layer desired for retrieval.
 * @param  {Function} callback function to invoke when item is retrieved.
 */
function getCookieLayer(key, callback) {
  if (callback) {
    var item = this._storage.getItem(this._prefix + key);
    if (item && this._JSON_RE.test(item)) {
      item = JSON.parse(item);
    }
    callback(item);
  } else {
    callback = key;
    var items = [],
      prefixLength = this._prefix.length;
    for (var k in this._storage) {
      if (this._storage.getItem(k) !== null &&
        k.indexOf(this._prefix) === 0) {
        items.push(this._storage.getItem(k));
      }
    }
    callback(items);
  }
};

/**
 * Removes the itemToRemove and runs the callback.
 *
 * Provide only the callback to remove user-added-layers.
 *
 * @param  {string}   itemToRemove [description]
 * @param  {Function} callback     [description]
 */
function removeCookieLayer(itemToRemove, callback) {
  if (callback) {
    this._data.splice(this._data.indexOf(this._storage.getItem(this._prefix + itemToRemove)), 1);
    this._storage.removeItem(this._prefix + itemToRemove);
    callback(itemToRemove);
  } else {
    callback = itemToRemove;
    var items = [],
      prefixLength = this._prefix.length;
    for (var key in this._storage) {
      if (this._storage.getItem(key) !== null &&
        key.indexOf(this._prefix) === 0) {
        items.push(this._storage.getItem(key));
        this._data.splice(this._data.indexOf(this._storage.getItem(key)), 1);
        this._storage.removeItem(key);
      }
    }
    callback(items);
  }

};

function saveCookieLayer(key, item, callback) {
  var itemStr = item.toString();
  if (itemStr === '[object Object]') {
    itemStr = JSON.stringify(item)
  }
  this._storage.setItem(this._prefix + key, itemStr);
  this._data = this._data.concat([item]);
  callback(item);
};
/* End of LocalStorage */

function setEditableLayer(layerName) {
  this._editableLayer = layerName;
}

window.wg = {
  "udpLayerName": "UDP",  // Set the global name of the pipeline
  "udp": {
    "definition": undefined,
    "layerName": undefined
  }
};


function setJSONFromString(ugly) {
  if (ugly.length > 0) {
    try {
      var parsed = JSON.parse(ugly);
      window.wg.udp.definition = parsed;
      self.JSONEditor.set(parsed);
    } catch (ex) {
      alert(ex);
    }
  } else {
    throw "Can't create layer - there is no JSON.";
  }

}

function createNewLayer(layerName) {
  getCookieLayer(layerName, function(item) {
    if (layerName === self._editableLayer || !item) {
      updateColormapParams();
      saveCookieLayer(layerName, window.wg.udp, function(item) {
        console.log("DEBUG: Saving cookie layer = " + JSON.stringify(item));
        refreshLayers(layerName);
        toggleSidebar();
        setEditableLayer(undefined);
      });
    } else {
      alert("Layer name is taken.");
    }
  });
}

function createLayerClick() {
  // console.log('create (custom) layer button clicked.');
  try {
    setJSONFromString(JSON.stringify(self.JSONEditor.get()));
  } catch (ex) {
    alert(ex);
    return;
  }
  createNewLayer(window.wg.udp.layerName);
}

function createAddLayerSidebar(map, maps, container, main_dassp_layer_info) {
  // console.log("Constructing Add Layer Sidebar.");
  this._map = map;
  this._maps = maps;
  this._main_dassp_layer_info = main_dassp_layer_info;
  var showCloseButton = true;
  var buttonFont = 'fa-plus';
  var buttonHint = 'Add layer';
  var sidebar = this._sidebar = createSidebar(this._map, container, 'addLayerID', 'left', showCloseButton, buttonFont, buttonHint, '14px', 'topleft');
  addText(sidebar.div, '<div align="center"><b>Add New Layer</b></div>', 'h2');
  addText(sidebar.div, '<b>Layer Type:</b>', 'h3');
  var layerTypes = [
    'Spatial Convolution',
    'Arithmetic',
    'Soil Moisture Downscaling',
    'Absolute Temporal Statistics',
    'Relative Temporal Statistics',
    'Soil Strength from Statistical Inputs',
  ]
  self.layerMenu = addMenu(sidebar.div, layerTypes, 1);
  self.content = document.createElement('div');
  sidebar.div.appendChild(self.content);
  self.layerMenu.onchange = function() {
    self.selectedLayerType = self.layerMenu.options[self.layerMenu.selectedIndex].text;
    setSelectedLayerType();
  }

  self.colormapDiv = document.createElement('div');
  sidebar.div.appendChild(self.colormapDiv);
  setAvailableColorMaps();

  // Create layer button (all layer types have this).
  var createLayerButtonDiv = document.createElement('div');
  createLayerButtonDiv.style.padding = '10px 0px 20px 0px';
  createLayerButtonDiv.style.bottom = '0';
  createLayerButtonDiv.style.position = 'relative';
  sidebar.div.appendChild(createLayerButtonDiv);
  var createLayerButton = document.createElement('button');
  createLayerButton.innerHTML = 'Create Layer';
  createLayerButton.id = 'createLayerButton';
  createLayerButtonDiv.appendChild(createLayerButton);

  setSelectedLayerType();

  // $(sidebar.div).load('/components/sidebars/addLayerSidebar/addLayerSidebar.html');
  refreshLayers();

  return sidebar;
};

function setLayersInSelect(id, layers, removeOld) {
  var select = $(id);
  if (removeOld) {
    select.find('option').remove().end();
  }

  for (const layer of layers) {
    if(layer.mapLayer === undefined || layer.mapLayer.isGeoWATCHLayer) {
      select.append(new Option(layer.displayName, layer.rawName));
    }
  }
}

function colorMapOnInput() {
  var min = $('#vminInput');
  var max = $('#vmaxInput');
  if (parseFloat(min.val()) > parseFloat(min.attr("max"))) {
    max.val(min.val());
  }
  if (parseFloat(max.val()) < parseFloat(max.attr("min"))) {
    min.val(max.val());
  }
  min.attr({
    "max": max.val(),
    "min": Number.NEGATIVE_INFINITY
  });
  max.attr({
    "max": Number.MAX_VALUE,
    "min": min.val()
  });
}

function setSelectedLayerType(newType) {
  while (self.content.firstChild) {
    self.content.removeChild(self.content.firstChild);
  }
  while (self.colormapDiv.firstChild) {
    self.colormapDiv.removeChild(self.colormapDiv.firstChild);
  }
  if (newType) {
    self.selectedLayerType = newType;
    self.layerMenu.value = self.selectedLayerType;
  }
  $(self.colormapDiv).load('/components/sidebars/addLayerSidebar/colormap.html', function() {
    setAvailableColorMaps();
    document.getElementById('vminInput').oninput = colorMapOnInput;
    document.getElementById('vmaxInput').oninput = colorMapOnInput;
  });

  if (self.selectedLayerType === 'Soil Moisture Downscaling') {
    $(self.content).load('/components/sidebars/addLayerSidebar/soilMoistureDownscaling.html', function() {
        setToSoilMoistureDownscaling(self);
    });
    // $('#addLayerContentDiv').load('/components/sidebars/addLayerSidebar/soilMoistureDownscaling.html');
  } else if (self.selectedLayerType === 'Arithmetic') {
    $(self.content).load('/components/sidebars/addLayerSidebar/arithmetic.html', function() {
      setToArithmetic(self);
    });
    // $('#addLayerContentDiv').load('/components/sidebars/addLayerSidebar/arithmetic.html');
  } else if (self.selectedLayerType === 'Absolute Temporal Statistics') {
    $(self.content).load('/components/sidebars/addLayerSidebar/absoluteTemporalStatistics.html', function() {
      setToAbsoluteTemporalStatistics(self);
    });
    // $('#addLayerContentDiv').load('/components/sidebars/addLayerSidebar/temporalStatistics.html');
  } else if (self.selectedLayerType === 'Relative Temporal Statistics') {
    $(self.content).load('/components/sidebars/addLayerSidebar/relativeTemporalStatistics.html', function() {
      setToRelativeTemporalStatistics(self);
    })
  } else if (self.selectedLayerType === 'Soil Strength from Statistical Inputs') {
    $(self.content).load('/components/sidebars/addLayerSidebar/relativeTemporalStatisticsSoilStrength.html', function() {
      setToRelativeTemporalStatisticsSoilStrength(self);
    });
  } else if (self.selectedLayerType === 'Spatial Convolution') {
    $(self.content).load('/components/sidebars/addLayerSidebar/spatialConvolution.html', function() {
      setToSpatialConvolution(self);
    });
    // $('#addLayerContentDiv').load('/components/sidebars/addLayerSidebar/spatialConvolution.html');
  } else if (self.selectedLayerType === 'Time History') {} else {
    console.log("The requested layer type = " + self.selectedLayerType + " is invalid.");
  }

};


function refreshLayers(layerName) {
  var dasspTimeLayers = [];
  var layers = createAvailableLayersForMap(this._main_dassp_layer_info, dasspTimeLayers, this._map.dateChanger.getDateAndTime().toISOString(), window.wg.showAdvancedLayers);
  for (var index=0; index < this._maps.length; index++) {
    this._maps[index].layerChanger.updateLayersInMenu(layers, true);
    this._maps[index].options.dasspTimeLayers = dasspTimeLayers;
  }
  if (layerName) {
    self._map.layerChanger.selectOption(layerName);
  }
}

function getSelectedLayerFromMap() {
  return this._map.layerChanger.options.layers[this._map.layerChanger.options.mostRecentSelectedIndex].displayName;
}

function toggleSidebar() {
  this._sidebar.toggle();
}

function isSidebarShowing() {
  return this._sidebar.isVisible();
}

/**
 * Adds another layer to the definition of the new layer
 * This other layer can either be a named layer, or another UDP layer
 *
 * NOTE: This function should be called on an empty definition (usually)
 * To make sure that the order of the nodes is correct. So, normally, this
 * is the first thing called to modify the definition.
 *
 * @param  {string}   userLayerName Name of the layer in the new definition
 * @param  {string}   layerName     WMS Layer name
 * @param  {object}   layerNameUDP  UDP Layer name
 * @param  {object}   definition    Dictionary of the new layer definition
 * @param  {list}     reserved      List of strings with reserved layer names
  */
function addUserLayerToDefinition(userLayerName, layerName, layerNameUDP, definition, reserved){
  if (reserved === undefined){
    reserved = [userLayerName];
  }
  if (layerName.indexOf(window.wg.udpLayerName) > -1) {
      getCookieLayer(layerNameUDP, function(item) {
        var inputMap = {};  // Keep track of name changes to avoid name clashing
        for (var k in item.definition){
          var newInputEntry = false;  // We have to delay adding new name changes, flag keeps track of this
          var key = null;
          if (k === layerNameUDP){  // The layer gets a new name for the current definition
            definition[userLayerName]  = item.definition[k];
            key = userLayerName;
          } else if ((k in definition) | (reserved.includes(k))){
            // Reserved or name clash, need a new name
            var num = 0;
            while ((k + num) in definition){
              num += 1;
            }
            key = k + num;
            definition[k + num] = item.definition[k];
            newInputEntry = true;
          } else {
            // No name clash, use name as-is
            definition[k] = item.definition[k];
            key = k;
          }
          // Any of the inputs to intermediate layers could have been renamed to avoid
          // clashes. So we need to replace their inputs with the new name
          if (definition[key].inputs !== undefined){
            for (var k2 in definition[key].inputs){
              var oldName = definition[key].inputs[k2];
              if (oldName in inputMap) {
                definition[key].inputs[k2] = inputMap[oldName];
              }
            }
          }
          // Add new entries to inputMap, if needed based on flag
          if (newInputEntry){
            inputMap[k] = key;
          }
        }
      });
    } else {
      definition[userLayerName] = {
        "plugin": "GeoWATCH",
        "node": layerName
      }
    }
}
