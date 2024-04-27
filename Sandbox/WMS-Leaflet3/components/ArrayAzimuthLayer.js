
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
	
	findBestMatchingEntry: function () {
		
		//What do we want to plot (how is this layer defined?)
		let targ_Hz = this.options.band_Hz
		let targ_smooth_str = this.options.smoothing
		
		//extract the overall info from the JSON data file
		json = this.json
		//console.log("ArrayAzimuthLayer: drawNewPolygon: json..."); console.log(json);
		site = json['site']
		//console.log("ArrayAzimuthLayer: drawNewPolygon: site = " + site)
		let n_entries= json['n_entries']
		//console.log("ArrayAzimuthLayer: drawNewPolygon: n_entries = " + n_entries)
		let all_given_bands_Hz = json.band_center_Hz

		let test_for_smoothing = false
		let all_smoothing_str = []
		if (json.hasOwnProperty('smoothing')) {
			test_for_smoothing = true
			all_smoothing_str = json['smoothing']
		}

		//console.log("ArrayAzimuthLayer: findBestMatchingEntry: targ_Hz = " + targ_Hz + ", targ_smooth_str = " + targ_smooth_str);
		//console.log("ArrayAzimuthLayer: findBestMatchingEntry: all_given_bands_Hz = " + all_given_bands_Hz);
		//console.log("ArrayAzimuthLayer: findBestMatchingEntry: all_smoothing_str = " + all_smoothing_str);
		

		//find the entry that we want by looping over all entries
		//console.log("ArrayAzimuthLayer: drawNewPolygon: all_given_bands_Hz = " + all_given_bands_Hz)
		let best_entry_ind = 0;
		let best_diff = 99999999
		if (n_entries > 1) {
			for (var ind = 0; ind < n_entries; ind++) {
				//console.log("ArrayAzimuthLayer: drawNewPolygon: targ_smooth_str = " + targ_smooth_str + ", all_smoothing_str[ind] = " + all_smoothing_str[ind])
				//console.log("ArrayAzimuthLayer: drawNewPolygon: test_for_smoothing = " + test_for_smoothing)

				let smooth_option_is_good = true
				//console.log("ArrayAzimuthLayer: drawNewPolygon: ind " + ind + ", smooth_option_is_good = " + smooth_option_is_good + ", targ_smooth_str === all_smoothing_str[ind] = " + (targ_smooth_str === all_smoothing_str[ind]))
				if (test_for_smoothing) {
					if (targ_smooth_str === all_smoothing_str[ind]) {
						//console.log("ArrayAzimuthLayer: drawNewPolygon: smoothing matches!  targ_smooth_str = " + targ_smooth_str + ", all_smoothing_str[ind] = " + all_smoothing_str[ind])
						smooth_option_is_good = true
					} else {
						smooth_option_is_good = false
					}
				}

				//calclulate the difference in this entry's frequency versus the target frequency
				let diff = Math.abs(targ_Hz - all_given_bands_Hz[ind])
				//console.log("ArrayAzimuthLayer: drawNewPolygon: ind " + ind + ", try_this_one = " + try_this_one + ", targ_smooth_str === all_smoothing_str[ind] = " + (targ_smooth_str === all_smoothing_str[ind]) + ", diff Hz = " + diff)

				//now, finally, see if this entry is a better fit
				if ((smooth_option_is_good) && (diff < best_diff)) {
					best_diff = diff;
					best_entry_ind = ind;
				}
			}
		};
		
		return best_entry_ind
	},
	
	getDataClosestInTime: function (entry_data, targ_time_UTC_str) {
		//get metadata for this set of data
		let dt_sec = entry_data['dt_sec']
		let t0_sec = entry_data['t0_sec']
		let n_time = entry_data['n_time']
		let start_datetime_utc_str = entry_data['start_datetime_utc']
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
		//let time_code = entry_data['t0_sec'] //get data at the first time
		let data = entry_data[time_code] 
	
	
		return [data, beyond_time_bounds]
	},
	
	drawNewPolygon: function (targ_time_UTC_str) {

		//get the JSON data
		json = this.json;
	
		//get the specific subset of data that we want
		//console.log("ArrayAzimuthLayer: drawNewPolygon: using band " + best_entry_ind)
		//let best_entry_ind = this.findBestMatchingEntry();
		//let entry_data = json['data' + best_entry_ind];
		let best_entry_ind = this.best_entry_ind
		let entry_data = json['data' + best_entry_ind];
		
		//get the data at target time (the closest available) 
		let [data, beyond_time_bounds] = this.getDataClosestInTime(entry_data, targ_time_UTC_str);

	  //get the lat/long of site from options
		//console.log("ArrayAzimuthLayer: drawNewPolygon: this.options..."); console.log(this.options);
		let array_lngLat =  this.options.all_array_lngLat[site];
		let array_latLng = [array_lngLat[1], array_lngLat[0]];

		//define the scaling for the graphics  (assume data is in decibels)
		//const meanDataVal = -85.0
		//console.log("ArrayAzimuthLayer: drawNewPolygon: data mean = " + this.mean_data_value + ", assumed data mean = " + meanDataVal)
		const meanDataVal = this.mean_data_value
		const minDataVal = meanDataVal;
		const maxDataVal = minDataVal+30.0;
		const maxRadialValue = 0.5 ; //degrees of lattitude

		//build up a polygon for this data
		let n_az = entry_data['n_az'];
		let d_az = 360.0 / n_az;
		var all_latLng = [];
		let longitutde_scale = 1.0 / (Math.cos(array_latLng[0] * (Math.PI / 180.0)));
		for (var Iaz = 0; Iaz < n_az; Iaz++) {
			let az_deg = Iaz * d_az;
			let ang_rad = (90.0 - az_deg)*(Math.PI / 180.0);
			let value = this.mapNumRange(data[Iaz], minDataVal, maxDataVal, 0.0, maxRadialValue);
			let polygon_lon = array_latLng[1] + (Math.cos(ang_rad) * value * longitutde_scale);
			let polygon_lat = array_latLng[0] + (Math.sin(ang_rad) * value);
			all_latLng.push([polygon_lat, polygon_lon]);
		}
		
		//draw the new polygon
		if (beyond_time_bounds) {
			this.setStyle({color:'#888888',fillOpacity:0.2});
		} else {
			//console.log("ArrayAzimuthLayer: drawNewPolygon: best_entry_ind = " + best_entry_ind)
			switch (best_entry_ind) {
				case 0:
					this.setStyle({color:'#0000ff',fillOpacity:0.8});
					break;
				case 1:
					this.setStyle({color:'#3300dd',fillOpacity:0.8});
					break;
				case 2:
					this.setStyle({color:'#6600bb',fillOpacity:0.8});
					break;
				case 3:
					this.setStyle({color:'#990099',fillOpacity:0.8});
					break;
				case 4:
					this.setStyle({color:'#bb0077',fillOpacity:0.8});
					break;
				default:
					this.setStyle({color:'#ff0055',fillOpacity:0.8});
					break;
			}
		}
		this.setLatLngs(all_latLng);

	},
	
	findMeanDataValue: function(best_data) {
		//console.log("ArrayAzimuthlayer: findMeanDataValue: best_data...");console.log(best_data);
		
		//loop over all time
		n_time = best_data['n_time']
		t0_sec = best_data['t0_sec']
		dt_sec = best_data['dt_sec']
		n_az = best_data['n_az']
		let sum_value = 0.0;
		let n_sum = 0
		for (let Itime=0; Itime < n_time; Itime++) {
			cur_time_sec = t0_sec + (Itime*dt_sec)
			cur_data = best_data[cur_time_sec]
			
			//loop over all angle
			for (let Iaz = 0; Iaz < cur_data.length; Iaz++) {
				sum_value += cur_data[Iaz]
				n_sum++
			}
		}
		let mean_value = sum_value / n_sum
		return mean_value;
	},

	parseJson: function (json) {
				
		//save the json to this layer
		this.json = json
		//console.log("ArrayAzimuthLayer: parseJson: json..."); console.log(json)
		
		//find best matching entry given all the entries in the JSON data
		this.best_entry_ind = this.findBestMatchingEntry();
		
		//get the mean data value for use in autoscaling the graphics later
		this.mean_data_value = this.findMeanDataValue(json['data' + this.best_entry_ind]);
	
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