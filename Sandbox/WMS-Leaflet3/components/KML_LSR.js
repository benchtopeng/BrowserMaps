

var KmlLsrIconBig = L.Icon.extend({
    options: {
        shadowUrl: 'assets/diam_black.png',
        iconSize:     [24,28],
        shadowSize:   [0,0],
        iconAnchor:   [12,14],
        shadowAnchor: [12,14],
        popupAnchor:  [0,-14]
    },
			
});
var KmlLsrIconSmall = L.Icon.extend({
    options: {
        shadowUrl: 'assets/diam_black.png',
        iconSize:     [18,22],
        shadowSize:   [0,0],
        iconAnchor:   [9,11],
        shadowAnchor: [9,11],
        popupAnchor:  [0,-11]
    },

});

var iconsDiam = [new KmlLsrIconSmall({iconUrl: 'assets/diam_red.png'}),
				  new KmlLsrIconSmall({iconUrl: 'assets/diam_lightOrange.png'}),
				  new KmlLsrIconSmall({iconUrl: 'assets/diam_gray4.png'}),
				  new KmlLsrIconSmall({iconUrl: 'assets/diam_gray2.png'})]
var iconsDiamT = [new KmlLsrIconBig({iconUrl: 'assets/diamT_red.png'}),
				  new KmlLsrIconBig({iconUrl: 'assets/diamT_lightOrange.png'}),
				  new KmlLsrIconBig({iconUrl: 'assets/diamT_gray4.png'}),
				  new KmlLsrIconBig({iconUrl: 'assets/diamT_gray2.png'})]
var iconsDiamH = [new KmlLsrIconSmall({iconUrl: 'assets/diamH_red.png'}),
				  new KmlLsrIconSmall({iconUrl: 'assets/diamH_lightOrange.png'}),
				  new KmlLsrIconSmall({iconUrl: 'assets/diamH_gray4.png'}),
				  new KmlLsrIconSmall({iconUrl: 'assets/diamH_gray2.png'})]

L.KML_LSR = L.FeatureGroup.extend({
	options: {
		async: true
	},
	
	kml_params: {},
	latLngs: [],

	initialize: function (kml, options) {
		console.log("KML_SLR: initialize...");
		L.Util.setOptions(this, options);
		this._kml = kml;
		this._layers = {};
		this.datetime_UTC_str = '';
		this.event_type = '';
		this.keyword = options['keyword']
		//this.overlay = KML_LSR_overlay_val;
		this.icons = structuredClone(iconsDiam);
		

		if (kml) {
			this.addKML(kml, options, this.options.async);
		}

	},

	loadXML: function (url, cb, options, async) {
		if (async === undefined) async = this.options.async;
		if (options === undefined) options = this.options;

		console.log("KML_LSR: loadXML (start)");

		var req = new window.XMLHttpRequest();
		
		// Check for IE8 and IE9 Fix Cors for those browsers
		if (req.withCredentials === undefined && typeof window.XDomainRequest !== 'undefined') {
			var xdr = new window.XDomainRequest();
			xdr.open('GET', url, async);
			xdr.onprogress = function () { };
			xdr.ontimeout = function () { };
			xdr.onerror = function () { };
			xdr.onload = function () {
				if (xdr.responseText) {
					var xml = new window.ActiveXObject('Microsoft.XMLDOM');
					xml.loadXML(xdr.responseText);
					cb(xml, options);
				}
			};
			setTimeout(function () { xdr.send(); }, 0);
		} else {
			req.open('GET', url, async);
			req.setRequestHeader('Accept', 'application/vnd.google-earth.kml+xml');
			try {
				req.overrideMimeType('text/xml'); // unsupported by IE
			} catch (e) { }
			req.onreadystatechange = function () {
				if (req.readyState !== 4) return;
				if (req.status === 200) cb(req.responseXML, options);
			};
			req.send(null);
		}
	},

	addKML: function (url, options, async) {
		var _this = this;
		var cb = function (kml) { _this._addKML(kml); };
		console.log("KML_LSR: addKML: calling loadXML with callback");
		this.loadXML(url, cb, options, async);
	},

	_addKML: function (xml) {
		let layerType = "KML_LSR"
		console.log("KML_LSR: _addKML (start)");
		var layers = L.KML_LSR.parseKML(xml);
		if (!layers || !layers.length) return;
		for (var i = 0; i < layers.length; i++) {
			if (!layers[i].hasOwnProperty("layerType")) {
				layers[i].layerType = layerType
			}
			this.fire('addlayer', {
				layer: layers[i]
			});
			this.addLayer(layers[i]);
		}
		this.latLngs = L.KML_LSR.getLatLngs(xml);
		if (!this.hasOwnProperty("layerType")) {
			this.layerType = layerType
		}
		this.fire('loaded');
	},
	
	setParams: function (params, noRedraw) {

		//L.extend(this.wmsParams, params);
		L.extend(this.kml_params, params);

		//if (!noRedraw) {
		//	this.redraw();
		//}

		return this;
	},

	
});

L.Util.extend(L.KML_LSR, {

	parseKML: function (xml) {
		console.log("KML_LSR: parseKML (start)");
		var style = this.parseStyles(xml);
		this.parseStyleMap(xml, style);
		var el = xml.getElementsByTagName('Folder');
		var layers = [], l;
		for (var i = 0; i < el.length; i++) {
			if (!this._check_folder(el[i])) { continue; }
			console.log("KML_LSR: parseKML: reading folder...");
			l = this.parseFolder(el[i], style);
			if (l) { layers.push(l); }
		}
		el = xml.getElementsByTagName('Placemark');
		for (var j = 0; j < el.length; j++) {
			if (!this._check_folder(el[j])) { continue; }
			//console.log("KML_LSR: parseKML: reading placemarks directly...");
			l = this.parsePlacemark(el[j], xml, style);
			if (l) { layers.push(l); }
		}
//		el = xml.getElementsByTagName('GroundOverlay');
//		for (var k = 0; k < el.length; k++) {
//			l = this.parseGroundOverlay(el[k]);
//			if (l) { layers.push(l); }
//		}

		if (!layers.hasOwnProperty("layerType")) { 
			layers.layerType = "KML_LSR"
		}
		//console.log(layers)
		return layers;
	},

	// Return false if e's first parent Folder is not [folder]
	// - returns true if no parent Folders
	_check_folder: function (e, folder) {
		e = e.parentNode;
		while (e && e.tagName !== 'Folder')
		{
			e = e.parentNode;
		}
		return !e || e === folder;
	},

	parseStyles: function (xml) {
		var styles = {};
		var sl = xml.getElementsByTagName('Style');
		for (var i=0, len=sl.length; i<len; i++) {
			var style = this.parseStyle(sl[i]);
			if (style) {
				var styleName = '#' + style.id;
				styles[styleName] = style;
			}
		}
		return styles;
	},

	parseStyle: function (xml) {
		var style = {}, poptions = {}, ioptions = {}, el, id;

		var attributes = {color: true, width: true, Icon: true, href: true, hotSpot: true};

		function _parse (xml) {
			var options = {};
			for (var i = 0; i < xml.childNodes.length; i++) {
				var e = xml.childNodes[i];
				var key = e.tagName;
				if (!attributes[key]) { continue; }
				if (key === 'hotSpot')
				{
					for (var j = 0; j < e.attributes.length; j++) {
						options[e.attributes[j].name] = e.attributes[j].nodeValue;
					}
				} else {
					var value = e.childNodes[0].nodeValue;
					if (key === 'color') {
						options.opacity = parseInt(value.substring(0, 2), 16) / 255.0;
						options.color = '#' + value.substring(6, 8) + value.substring(4, 6) + value.substring(2, 4);
					} else if (key === 'width') {
						options.weight = value;
					} else if (key === 'Icon') {
						ioptions = _parse(e);
						if (ioptions.href) { options.href = ioptions.href; }
					} else if (key === 'href') {
						options.href = value;
					}
				}
			}
			return options;
		}

		el = xml.getElementsByTagName('LineStyle');
		if (el && el[0]) { style = _parse(el[0]); }
		el = xml.getElementsByTagName('PolyStyle');
		if (el && el[0]) { poptions = _parse(el[0]); }
		if (poptions.color) { style.fillColor = poptions.color; }
		if (poptions.opacity) { style.fillOpacity = poptions.opacity; }
		el = xml.getElementsByTagName('IconStyle');
		if (el && el[0]) { ioptions = _parse(el[0]); }
		if (ioptions.href) {
			style.icon = new L.KML_LSR_Icon({
				iconUrl: ioptions.href,
				shadowUrl: null,
				anchorRef: {x: ioptions.x, y: ioptions.y},
				anchorType:	{x: ioptions.xunits, y: ioptions.yunits}
			});
		}
		
		id = xml.getAttribute('id');
		if (id && style) {
			style.id = id;
		}
		
		return style;
	},
	
	parseStyleMap: function (xml, existingStyles) {
		var sl = xml.getElementsByTagName('StyleMap');
		
		for (var i = 0; i < sl.length; i++) {
			var e = sl[i], el;
			var smKey, smStyleUrl;
			
			el = e.getElementsByTagName('key');
			if (el && el[0]) { smKey = el[0].textContent; }
			el = e.getElementsByTagName('styleUrl');
			if (el && el[0]) { smStyleUrl = el[0].textContent; }
			
			if (smKey === 'normal')
			{
				existingStyles['#' + e.getAttribute('id')] = existingStyles[smStyleUrl];
			}
		}
		
		return;
	},

	parseFolder: function (xml, style) {
		var el, layers = [], l;
//		el = xml.getElementsByTagName('Folder');
//		for (var i = 0; i < el.length; i++) {
//			if (!this._check_folder(el[i], xml)) { continue; }
//			l = this.parseFolder(el[i], style);
//			if (l) { layers.push(l); }
//		}
		el = xml.getElementsByTagName('Placemark');
		//if (el) { console.log("KML_LSR: parseFolder: about to parsePlacemarks for " + el.length + " items..."); }
		for (var j = 0; j < el.length; j++) {
			if (!this._check_folder(el[j], xml)) { continue; }
			l = this.parsePlacemark(el[j], xml, style);
			//l.layerType = 'KML_LSR'
			if (l) { layers.push(l); }
		}
//		el = xml.getElementsByTagName('GroundOverlay');
//		for (var k = 0; k < el.length; k++) {
//			if (!this._check_folder(el[k], xml)) { continue; }
//			l = this.parseGroundOverlay(el[k]);
//			if (l) { layers.push(l); }
//		}
		if (!layers.length) { return; }
		if (layers.length === 1) { return layers[0]; }
		var layerGroup = new L.FeatureGroup(layers);
		layerGroup.layerType = 'KML_LSR'
		//var layerGroup = layers;
		return layerGroup
	},

	parseExtendedData: function(data) {
		var descr='';
		var datetime_UTC_str='';
		var event_type='';
		for(var i=0; i<data.length; i++) { 
			if (data[i].getAttribute("name")) {
				var dataname = data[i].getAttribute("name"); 
				//console.log("KML_LSR.: parseExtendedData: i = " + i + ", dataname = " + dataname);
				//console.log("KML_LSR.: parseExtendedData: data[i].firstChild == null ..." + (data[i].firstChild == null));
				if (data[i].firstChild != null) {
					var value = data[i].firstChild.data; 
					
					//look for special fields
					if (dataname === "Report Time (UTC Timezone)") {
						datetime_UTC_str = value;
					}
					if (dataname === "Event Type") {
						event_type = value;
						//name = this.event_type + ": " + name
					}
					
					//ignore certain fields when expanding the description
					var exclude_names = ['Office', 'County', 'Location', 'Event Type','ST', 'Lat', 'Lon' ,'ugc', 'ugcname'];
					var include_in_descr = !(exclude_names.includes(dataname))
					
					//update the description text for this point
					if (include_in_descr) {
						descr = descr + dataname + ": " + value + "<br>"
					}
				}
			}
		}
		return [descr, datetime_UTC_str, event_type];
	},

	parsePlacemark: function (place, xml, style, options) {
		var h, i, j, k, el, il, opts = options || {};

		el = place.getElementsByTagName('styleUrl');
		for (i = 0; i < el.length; i++) {
			var url = el[i].childNodes[0].nodeValue;
			for (var a in style[url]) {
				opts[a] = style[url][a];
			}
		}
		
		il = place.getElementsByTagName('Style')[0];
		if (il) {
			var inlineStyle = this.parseStyle(place);
			if (inlineStyle) {
				for (k in inlineStyle) {
					opts[k] = inlineStyle[k];
				}
			}
		}
		
		// get the name for this placemark
		var name='';
		el = place.getElementsByTagName('name');
		if (el.length && el[0].childNodes.length) {
			name = el[0].childNodes[0].nodeValue;
		}
		
		//get any description based on the extended data
		var data = place.getElementsByTagName("SimpleData");
		var descr, datetime_UTC_str, event_type;
		[descr, datetime_UTC_str, event_type] = this.parseExtendedData(data);

		
		// ////////////// Create a marker for each event
			
		//parse out the lat/lon for the place
		var layers = [];
		el = place.getElementsByTagName('Point');
		for (i = 0; i < el.length; i++) {
			var l = this.parsePoint(el[i], xml, opts); //returns a marker
			
			//add to list
			if (l) { 
				//add in the extra data
				l.name = name;
				l.descr = descr;
				l.datetime_UTC_str = datetime_UTC_str;
				l.event_type = event_type;
				l.icons = structuredClone(iconsDiam);
				l.icons_tornado = structuredClone(iconsDiamT);
				l.icons_hail = structuredClone(iconsDiamH);
					
				//l.overlay = KML_LSR_overlay_val;
				
				//push it onto the list
				layers.push(l);
			}
		}

		if (!layers.length) { return; }	
		var layer = layers[0];
		//if (layers.length > 1) { 
		//  layer = new L.FeatureGroup(layers);
		//	layer.layerType = 'KML_LSR'
		//}
		
		//console.log("KML_LSR: parsePlacemark: layer group")
		//console.log(layer);

		// /////////////// Create the pop-up tag (and text) associated with the marker
		if (name) {
			layer.on('add', function () {
				layer.bindPopup('<b>' + layer.name + '</b>' + '<br>' + layer.descr);
			});
		}

		return layer;
	},

	parseCoords: function (xml) {
		var el = xml.getElementsByTagName('coordinates');
		return this._read_coords(el[0]);
	},

//	parseLineString: function (line, xml, options) {
//		var coords = this.parseCoords(line);
//		if (!coords.length) { return; }
//		return new L.Polyline(coords, options);
//	},

//	parseTrack: function (line, xml, options) {
//		var el = xml.getElementsByTagName('gx:coord');
//		if (el.length === 0) { el = xml.getElementsByTagName('coord'); }
//		var coords = [];
//		for (var j = 0; j < el.length; j++) {
//			coords = coords.concat(this._read_gxcoords(el[j]));
//		}
//		if (!coords.length) { return; }
//		return new L.Polyline(coords, options);
//	},

	parsePoint: function (place, xml, options) {
		var el = place.getElementsByTagName('coordinates');
		if (!el.length) { return; }
		var ll = el[0].childNodes[0].nodeValue.split(',');
		var marker = new L.KML_LSR_Marker(new L.LatLng(ll[1], ll[0]), options);
	
		//return the new marker
		return marker;
	},

	/*
	parsePolygon: function (line, xml, options) {
		var el, polys = [], inner = [], i, coords;
		el = line.getElementsByTagName('outerBoundaryIs');
		for (i = 0; i < el.length; i++) {
			coords = this.parseCoords(el[i]);
			if (coords) {
				polys.push(coords);
			}
		}
		el = line.getElementsByTagName('innerBoundaryIs');
		for (i = 0; i < el.length; i++) {
			coords = this.parseCoords(el[i]);
			if (coords) {
				inner.push(coords);
			}
		}
		if (!polys.length) {
			return;
		}
		if (options.fillColor) {
			options.fill = true;
		}
		if (polys.length === 1) {
			return new L.Polygon(polys.concat(inner), options);
		}
		return new L.MultiPolygon(polys, options);
	},
	*/

	getLatLngs: function (xml) {
		var el = xml.getElementsByTagName('coordinates');
		var coords = [];
		for (var j = 0; j < el.length; j++) {
			// text might span many childNodes
			coords = coords.concat(this._read_coords(el[j]));
		}
		return coords;
	},
	
	_read_coords: function (el) {
		var text = '', coords = [], i;
		for (i = 0; i < el.childNodes.length; i++) {
			text = text + el.childNodes[i].nodeValue;
		}
		text = text.split(/[\s\n]+/);
		for (i = 0; i < text.length; i++) {
			var ll = text[i].split(',');
			if (ll.length < 2) {
				continue;
			}
			coords.push(new L.LatLng(ll[1], ll[0]));
		}
		return coords;
	},

/*
	_read_gxcoords: function (el) {
		var text = '', coords = [];
		text = el.firstChild.nodeValue.split(' ');
		coords.push(new L.LatLng(text[1], text[0]));
		return coords;
	},
	*/

/*
	parseGroundOverlay: function (xml) {
		var latlonbox = xml.getElementsByTagName('LatLonBox')[0];
		var bounds = new L.LatLngBounds(
			[
				latlonbox.getElementsByTagName('south')[0].childNodes[0].nodeValue,
				latlonbox.getElementsByTagName('west')[0].childNodes[0].nodeValue
			],
			[
				latlonbox.getElementsByTagName('north')[0].childNodes[0].nodeValue,
				latlonbox.getElementsByTagName('east')[0].childNodes[0].nodeValue
			]
		);
		var attributes = {Icon: true, href: true, color: true};
		function _parse (xml) {
			var options = {}, ioptions = {};
			for (var i = 0; i < xml.childNodes.length; i++) {
				var e = xml.childNodes[i];
				var key = e.tagName;
				if (!attributes[key]) { continue; }
				var value = e.childNodes[0].nodeValue;
				if (key === 'Icon') {
					ioptions = _parse(e);
					if (ioptions.href) { options.href = ioptions.href; }
				} else if (key === 'href') {
					options.href = value;
				} else if (key === 'color') {
					options.opacity = parseInt(value.substring(0, 2), 16) / 255.0;
					options.color = '#' + value.substring(6, 8) + value.substring(4, 6) + value.substring(2, 4);
				}
			}
			return options;
		}
		var options = {};
		options = _parse(xml);
		if (latlonbox.getElementsByTagName('rotation')[0] !== undefined) {
			var rotation = latlonbox.getElementsByTagName('rotation')[0].childNodes[0].nodeValue;
			options.rotation = parseFloat(rotation);
		}
		return new L.RotatedImageOverlay(options.href, bounds, {opacity: options.opacity, angle: options.rotation});
	}
	*/

	redraw: function() {
	},
	

});

L.KML_LSR_Icon = L.Icon.extend({
	_setIconStyles: function (img, name) {
		L.Icon.prototype._setIconStyles.apply(this, [img, name]);
		var options = this.options;
		this.options.popupAnchor = [0,(-0.83*img.height)];
		if (options.anchorType.x === 'fraction')
			img.style.marginLeft = (-options.anchorRef.x * img.width) + 'px';
		if (options.anchorType.y === 'fraction')
			img.style.marginTop  = ((-(1 - options.anchorRef.y) * img.height) + 1) + 'px';
		if (options.anchorType.x === 'pixels')
			img.style.marginLeft = (-options.anchorRef.x) + 'px';
		if (options.anchorType.y === 'pixels')
			img.style.marginTop  = (options.anchorRef.y - img.height + 1) + 'px';
	}
});


L.KML_LSR_Marker = L.Marker.extend({
	options: {
		//icon: new L.KML_LSR_Icon.Default()
		icon: iconsDiamT[0]
	},
	
	/*	
	update: function () {
		if (this._icon) {
			console.log("KML_LSR: update()...");
			var pos = this._map.latLngToLayerPoint(this._latlng).round();
			this._setPos(pos);
		}

		return this;
	},
	*/

});
