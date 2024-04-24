
L.ArrayAzimuthLayer = L.Polygon.extend({
	options: {
		async: true
	},
	
	az_params: {},

	initialize: function (fname, datetime_UTC_str, options) {
		L.Util.setOptions(this, options);
		this._fname = fname;
		this._layers = {};
		this.datetime_UTC_str = datetime_UTC_str;
		//this.data_json = {};
	
		//put in dummy polygon at the Chunky array
		all_array_lngLat = options.all_array_lngLat
		center_lngLat = all_array_lngLat['Chunky']
		latlngs = [center_lngLat[1], center_lngLat[0]]
		latlngs = [latlngs, [latlngs[0]+0.5, latlngs[1]], [latlngs[0], latlngs[1]+0.5]]
		var l = L.Polyline.prototype.initialize.call(this, latlngs, options);
		this._initWithHoles(latlngs);
	
		if (fname) {
			this.addFromJson(fname, options, this.options.async);
		}
			
	},
	

	loadJson: function (url, callback_loadJson, options, async) {
		if (async === undefined) async = this.options.async;
		if (options === undefined) options = this.options;

		//console.log("ArrayAzimuthLayer: loadJson: url = " + url)

	  $.getJSON(url).done(
			function(data) {
				callback_loadJson(data,options);
			}
		)
		.fail(
			function(data) {
				console.log("ArrayAzimuthLayer: Failed to load JSON from " + url);
				console.log("    : data..."); console.log(data);
			}
		);
	},
	
	/*
	loadJson_old: function (url, cb, options, async) {
		if (async === undefined) async = this.options.async;
		if (options === undefined) options = this.options;

		var req = new window.XMLHttpRequest();  //supposedly good for any request, not just XML.  So, let's use for JSON
		
		// Check for IE8 and IE9 Fix Cors for those browsers
		if (req.withCredentials === undefined && typeof window.XDomainRequest !== 'undefined') {
			var xdr = new window.XDomainRequest();
			xdr.open('GET', url, async);
			xdr.onprogress = function () { };
			xdr.ontimeout = function () { };
			xdr.onerror = function () { };
			xdr.onload = function () {
				if (xdr.responseText) {
					var json = new window.ActiveXObject('Microsoft.XMLDOM');  //should update this for JSON, but I don't know how
					json.loadJson(xdr.responseText);  //was loadXML
					cb(json, options);
				}
			};
			setTimeout(function () { xdr.send(); }, 0);
		} else {
			req.open('GET', url, async);
			req.setRequestHeader('Accept', 'application/json');
			try {
				req.overrideMimeType('application/json'); // or text/plain ??
			} catch (e) { }
			
			req.onreadystatechange = function () {
				if (req.readyState !== 4) return;
				if (req.status === 200) cb(req.responseXML, options);
			};
			
			req.send(null);
		}
	},
	*/
	
		
	addFromJson: function (url, options, async) {
		var _this = this;
		var callback_loadJson = function (json) { _this._addJson(json); };
		this.loadJson(url, callback_loadJson, options, async);
	},
	
	
	_addJson: function (json) {
		let layer_type = "ArrayAzimuth"
		
		//var layers = L.ArrayAzimuthLayer.parseJson(json);
		var layers = this.parseJson(json);
		if (!layers || !layers.length) return;
		
		for (var i = 0; i < layers.length; i++) {
			if (!layers[i].hasOwnProperty("layer_type")) {
				layers[i].layer_type = layer_type
			}
			this.fire('addlayer', {
				layer: layers[i]
			});
			this.addLayer(layers[i]);
		}
		//this.latLngs = L.arrayAzimuthLayer.getLatLngs(json);
		if (!this.hasOwnProperty("layer_type")) {
			this.layer_type = layer_type
		}
		this.fire('loaded');
	},

	setParams: function (params, noRedraw) {

		//L.extend(this.wmsParams, params);
		L.extend(this.az_params, params);

		//if (!noRedraw) {
		//	this.redraw();
		//}

		return this;
	},

	updateTime: function () {
		//console.log("ArrayAzimuthLayer: updateTime: this...");console.log(this);
		targ_time_UTC_str = this.TIME;
		this.drawNewPolygon(targ_time_UTC_str);
	},

	mapNumRange: function (num, inMin, inMax, outMin, outMax) {
		let val = ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
		return Math.min(Math.max(val, outMin), outMax)
	},
	
	drawNewPolygon: function (targ_time_UTC_str) {
		
		//get site from JSON
		json = this.json
		//console.log("ArrayAzimuthLayer: parseJson: json..."); console.log(json);
		site = json['site']
		//console.log("ArrayAzimuthLayer: parseJson: site = " + site)

		//get lat/long of site from options
		//console.log("ArrayAzimuthLayer: parseJson: this.options..."); console.log(this.options);
		let array_lngLat =  this.options.all_array_lngLat[site]
		let array_latLng = [array_lngLat[1], array_lngLat[0]]
		
		//get the frequency band that we want
		let n_bands = json['n_bands']
		let targ_Hz = this.options.band_Hz
		let given_bands_Hz = json.band_center_Hz
		console.log("ArrayAzimuthLayer: parseJson: given_bands_Hz = " + given_bands_Hz)
		let band_best_ind = 0;
		let best_diff = Math.abs(targ_Hz - given_bands_Hz[band_best_ind])
		if (n_bands > 1) {
			for (var ind = 0; ind < n_bands; ind++) {
				var diff = Math.abs(targ_Hz - given_bands_Hz[ind])
				if (diff < best_diff) {
					best_diff = diff;
					band_best_ind = ind;
				}
			}
		};
		//console.log("ArrayAzimuthLayer: parseJson: using band " + band_best_ind)
		let band_data = json['band' + band_best_ind]
		
		
		//get metadata for this set of data
		let n_az = band_data['n_az']
		let dt_sec = band_data['dt_sec']
		let t0_sec = band_data['t0_sec']
		let n_time = band_data['n_time']
		let start_datetime_utc_str = band_data['start_datetime_utc']
		if (start_datetime_utc_str[start_datetime_utc_str.length-1] != 'Z') start_datetime_utc_str += 'Z' //ensure that it's flagged as UTC
		
		//find the closest time index to the given value
		//console.log("ArrayAzimuthLayer: computeNewPolygon: targ_time_UTC_str = " + targ_time_UTC_str + ", start_datetime_utc_str = " + start_datetime_utc_str);
		let targTimeUTC = new Date(targ_time_UTC_str);
		let jsonStartUTC = new Date(start_datetime_utc_str);
		//console.log("ArrayAzimuthLayer: computeNewPolygon:  targTimeUTC = " + (targTimeUTC) + ", targTimeUTC.toISOString() = " + targTimeUTC.toISOString())
		//console.log("ArrayAzimuthLayer: computeNewPolygon: jsonStartUTC = " + (jsonStartUTC) + ", jsonStartUTC.toISOString() = " + jsonStartUTC.toISOString())
		let dt_start_msec = targTimeUTC - jsonStartUTC
		let dt_start_sec = dt_start_msec / 1000.0
		//let time_ind = Math.min(n_time-1,Math.max(0,Math.floor(dt_start_sec / dt_sec)))
		time_ind = Math.floor(dt_start_sec / dt_sec)
		let beyond_time_bounds = false
		if ( (time_ind < 0) || (time_ind >= n_time) ) beyond_time_bounds = true;
		time_ind = Math.min(n_time-1, Math.max(0, time_ind))
		let time_code = parseInt(time_ind * dt_sec + t0_sec)
		//console.log("ArrayAzimuthLayer: computeNewPolygon: dt_start_sec = " + dt_start_sec + ", time_code = " + time_code)
			
		//get the data we want
		//let time_code = band_data['t0_sec'] //get data at the first time
		let data = band_data[time_code] 

		const minDataVal = -85.0
		const maxDataVal = minDataVal+30.0
		const maxRadialValue = 0.5
		
		//build up a polygon for this data
		let d_az = 360.0 / n_az
		var all_latLng = []
		let longitutde_scale = 1.0 / (Math.cos(array_latLng[0] * (Math.PI / 180.0)))
		for (var Iaz = 0; Iaz < n_az; Iaz++) {
			let az_deg = Iaz * d_az
			let ang_rad = (90.0 - az_deg)*(Math.PI / 180.0)
			let value = this.mapNumRange(data[Iaz], minDataVal, maxDataVal, 0.0, maxRadialValue)
			let polygon_lon = array_latLng[1] + (Math.cos(ang_rad) * value * longitutde_scale)
			let polygon_lat = array_latLng[0] + (Math.sin(ang_rad) * value)
			//let polygon_lon = array_latLng[1] + (Math.cos(ang_rad) * 0.5) * longitutde_scale
			//let polygon_lat = array_latLng[0] + (Math.sin(ang_rad) * 0.5)
			all_latLng.push([polygon_lat, polygon_lon])
		}
		
		//draw the new polygon
		if (beyond_time_bounds) {
			this.setStyle({color:'#888888',fillOpacity:0.2});
		} else {
			console.log("ArrayAzimuthLayer: parseJson: band_best_ind = " + band_best_ind)
			switch (band_best_ind) {
				case 0:
					this.setStyle({color:'#0000ff',fillOpacity:0.8});
					break;
				case 1:
					this.setStyle({color:'#3300ff',fillOpacity:0.8});
					break;
				case 2:
					this.setStyle({color:'#6600ff',fillOpacity:0.8});
					break;
				case 3:
					this.setStyle({color:'#9900dd',fillOpacity:0.8});
					break;
				case 4:
					this.setStyle({color:'#bb00aa',fillOpacity:0.8});
					break;
				default:
					this.setStyle({color:'#ff0088',fillOpacity:0.8});
					break;
			}
		}
		this.setLatLngs(all_latLng);

	},

	parseJson: function (json) {
				
		//save the json to this layer
		this.json = json
		//console.log("ArrayAzimuthLayer: parseJson: json..."); console.log(json)
		//console.log("ArrayAzimuthLayer: parseJson: this..."); console.log(this)
		targ_datetime_utc_str = this.TIME
		
		//plot a new polygon
		this.drawNewPolygon(targ_datetime_utc_str);
		
		var layers = this

		if (!layers.hasOwnProperty("layer_type")) { 
			layers.layer_type = "ArrayAzimuth"
		}
		//console.log(layers)
		return layers;
	}


});

L.Util.extend(L.ArrayAzimuthLayer, {

	
	
	
});

L.arrayAzimuthlayer = function (fname, center_latLng, datetime_UTC_str, options) {
	return new L.ArrayAzimuthlayer(fname, center_latLng, datetime_UTC_str, options);
};
