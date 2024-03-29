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
 * L.Control.DateChanger is used for to navigate dates backward and forward for time-dependent map layers.
 * mostly based on Leaflet code for L.Control.Zoom
 * by JYB
 */
L.Control.DateChanger = L.Control.extend({

  selectedHour: undefined,

  options: {
    position: 'topleft',
    refreshMaps: function() {
      alert('no refreshMaps function defined.');
    },
    maps: undefined,

    dayUpIcon: 'fa-step-forward',
    dayUpTitle: 'Advance +1 time interval',
    dayUpText: '',
    dayUpFn: function(e) {
      alert('dayUpFn callback not defined');
    },

    dayDownIcon: 'fa-step-backward',
    dayDownTitle: 'Advance -1 time interval',
    dayDownText: '',
    dayDownFn: function(e) {
      alert('dayDownFn callback not defined');
    },

    monthUpIcon: 'fa-fast-forward',
    monthUpTitle: 'Advance +8 time intervals',
    monthUpText: '',
    monthUpFn: function(e) {
      alert('monthUpFn callback not defined');
    },

    monthDownIcon: 'fa-fast-backward',
    monthDownTitle: 'Advance -8 time intervals',
    monthDownText: '',
    monthDownFn: function(e) {
      alert('monthDownFn callback not defined');
    },


  },

  // set displayed date (if in the available list)
  setDateAndTime: function(newDateStr) {
    // console.log('DEBUG: setDateAndTime called for ' + newDateStr);
    var newDate = moment(newDateStr);
    var changed = false;
    for (var idx_date = 0; idx_date < this._availableDates.length; ++idx_date) {
      if (this._availableDates[idx_date].isSame(newDate, 'year') &&
      this._availableDates[idx_date].isSame(newDate, 'month') &&
      this._availableDates[idx_date].isSame(newDate, 'day') &&
      this._availableDates[idx_date].isSame(newDate, 'hour')) {
        // There is surely a better way, but this hacks around the issue when
        // setting to a time for which there is LIS and GALWEM data - future data
        // is given with a 1 second offset, which doesn't play nicely with hour
        // intervals in the picker.
        if (this._availableDates[idx_date + 1] && this._availableDates[idx_date + 1].isSame(newDate)) {
          this._selectedDateIndex = idx_date + 1;
        } else {
          this._selectedDateIndex = idx_date;
        }
        changed = true;
        break;
      } else if (this._availableDates[idx_date].isSame(newDate, 'year') &&
      this._availableDates[idx_date].isSame(newDate, 'month') &&
      this._availableDates[idx_date].isSame(newDate, 'day')) {
        this._selectedDateIndex = idx_date;
        changed = true;
      }

    }
    if (changed) {
      $('#datetimepicker').data('DateTimePicker').date(this._availableDates[this._selectedDateIndex]);
      this.options.refreshMaps(this, this.options.maps);
      var bkcolor = (this.getDateAndTime() > (new Date("2024-02-20T09:00:00Z"))) ? "rgb(0, 255, 255)" : 'white';
      this.container.style.backgroundColor = bkcolor;
      this.selectedHour = $('#datetimepicker').data('DateTimePicker').date().hour();
      this.updateSelectedHour();
      // console.log('DEBUG: refreshed maps, set to valid date = ' + this._availableDates[this._selectedDateIndex].format());
    }
    return changed;
  },
  // increment date by specified number of dates
  incrementSelectedDateAndTime: function(deltaIndex, thresholdTimeToRecolor) {
    var index = this._selectedDateIndex + deltaIndex;
    if (index < 0) index = 0;
    if (index > this._availableDates.length - 1) index = this._availableDates.length - 1;
    this.setDateAndTime(this._availableDates[index]);
  },

  updateSelectedHour: function() {
    var self = this;
    $('.timepicker-hours').find('td').each (function(col, td) {
      if (self.selectedHour === parseInt($(td).text())) {
        $(td).addClass('active');
      } else {
        $(td).removeClass('active');
      }
    });
  },

  onAdd: function(map) {
    var zoomName = 'leaflet-control-zoom';
    this.container = L.DomUtil.get('dateTimeBar')
    this.container.style.width = '346px';
    this.container.style.backgroundColor = 'white';
    this.container.style.color = 'black';
    var roundedCornerPx = '8px';
    this.container.style.borderRadius = roundedCornerPx;
    this._map = map;

    var self = this;

    function addButton(txt, title, id, container, fn, desiredIcon) {
      var btn = self._createButton(
        txt, title,
        zoomName + '-in', container, fn, self);
      var extraClasses = desiredIcon.lastIndexOf('fa', 0) === 0 ? ' fa fa-lg' : ' glyphicon';
      var icon = L.DomUtil.create('i', desiredIcon + extraClasses, btn);
      icon.id = self.options.id;
      icon.style.fontSize = '12px';
      icon.style.verticalAlign = 'middle';

      btn.style.display = 'inline-block';
      btn.style.border = '1px solid #313030';
      btn.style.padding = '0 0 2px 0';
      btn.style.verticalAlign = "middle"
      btn.style.borderRadius = '0px';
      btn.style.backgroundColor = 'rgba(245,245,245,1.0)';
      btn.style.width = '25%';
      btn.style.height = '100%';

      // change background color of button to yellow on mouseover
      L.DomEvent
        .on(btn, 'mouseover', function() {
          btn.style.backgroundColor = 'yellow';
        }, self)
        .on(btn, 'mouseout', function() {
          btn.style.backgroundColor = 'rgba(245,245,245,1.0)';
        }, self);

      return btn;
    };

    this._monthDownButton = addButton(this.options.monthDownText, this.options.monthDownTitle, zoomName + '-in', L.DomUtil.get('dateButtonCol'), this.options.monthDownFn, this.options.monthDownIcon)
    this._monthDownButton.style.borderTopLeftRadius = roundedCornerPx;
    this._monthDownButton.style.borderBottomLeftRadius = roundedCornerPx;

    this._dayDownButton = addButton(this.options.dayDownText, this.options.dayDownTitle, zoomName + '-in', L.DomUtil.get('dateButtonCol'), this.options.dayDownFn, this.options.dayDownIcon)
    this._dayUpButton = addButton(this.options.dayUpText, this.options.dayUpTitle, zoomName + '-in', L.DomUtil.get('dateButtonCol'), this.options.dayUpFn, this.options.dayUpIcon)
    this._monthUpButton = addButton(this.options.monthUpText, this.options.monthUpTitle, zoomName + '-in', L.DomUtil.get('dateButtonCol'), this.options.monthUpFn, this.options.monthUpIcon)
    this._monthUpButton.style.borderTopRightRadius = roundedCornerPx;
    this._monthUpButton.style.borderBottomRightRadius = roundedCornerPx;

    this._dateField = $('#datetimepicker').datetimepicker({
      timeZone: 'UTC',
      format: 'ddd, DD MMM YYYY H:00:00 z',
      ignoreReadonly: true,
      widgetPositioning: {
        vertical: 'top',
        horizontal: 'left'
      }
    });
    L.DomUtil.get('datetimeform-control').onclick = function (e) {
      $('#datetimepicker').data('DateTimePicker').toggle();
    }
    L.DomUtil.get('datetimeform-control').oncontextmenu = function (evt) {
      evt.preventDefault();
      if ($('#datetimepicker').data('DateTimePicker').timeZone() === 'UTC') {
        $('#datetimepicker').data('DateTimePicker').timeZone(moment.tz(moment.tz.guess()).zoneAbbr());
      } else {
        $('#datetimepicker').data('DateTimePicker').timeZone('UTC');
      }
      self.incrementSelectedDateAndTime(0);
      evt.stopPropagation();
    }
    $('#datetimepicker').data('DateTimePicker').actions.incrementHours = function() {
      self.incrementSelectedDateAndTime(1);
    };
    $('#datetimepicker').data('DateTimePicker').actions.decrementHours = function() {
      self.incrementSelectedDateAndTime(-1);
    };

    // Copied from bootstrap-datetimepicker.js, then edited to handle cases where
    // the target day doesn't have the old date's hour. In this case, we select the
    // closest available time. This also shows the hour picker, which mimics the
    // functionality of propagating through bootstrap-datetimepicker.js's datePickerModes.
    $('#datetimepicker').data('DateTimePicker').actions.selectDay = function(e) {
      var day = $('#datetimepicker').data("DateTimePicker").viewDate().clone();
      var toggle = false;

      if (e && e.target) {
        if ($(e.target).is('.old')) {
          day.subtract(1, 'M');
        }
        if ($(e.target).is('.new')) {
          day.add(1, 'M');
        }
        day = day.date(parseInt($(e.target).text(), 10))
        toggle = true;
      } else {
        day = e;
      }
      if (!day.isSame(self._availableDates[self._selectedDateIndex], 'hour') ||
      !day.isSame(self._availableDates[self._selectedDateIndex], 'day') ||
      !day.isSame(self._availableDates[self._selectedDateIndex], 'month') ||
      !day.isSame(self._availableDates[self._selectedDateIndex], 'year')) {
        if (!self.setDateAndTime(day)) {
          if (!toggle) {
            day = day.isAfter(self._availableDates[self._selectedDateIndex]) ? day.clone().add(1, 'd') : day.clone().subtract(1, 'd');
            $('#datetimepicker').data('DateTimePicker').actions.selectDay(day);
          }
        }
      }
      if (self._selectedDateIndex === self._availableDates.length - 1) {
        $('#hourViewHeaderNext').addClass('disabled');
      } else if (self._selectedDateIndex === 0) {
        $('#hourViewHeaderPrev').addClass('disabled');
      } else {
        $('#hourViewHeaderPrev').removeClass('disabled');
        $('#hourViewHeaderNext').removeClass('disabled');
      }

      if (toggle) {
        //change time selector styling so month/date fit in datetimepicker box
        var seltime = L.DomUtil.get('selectTime')
        seltime.style.width = 'auto';
        seltime.style.height = 'auto';
        $('#datetimepicker').data('DateTimePicker').actions.showHours();
        e.target = $('#selectTime');
        $('#datetimepicker').data('DateTimePicker').actions.togglePicker(e);
        self.updateSelectedHour();
      }
    };

    // Copied from bootstrap-datetimepicker.js, then edited to keep the hour
    // picker displayed, and only set time/refresh maps when the hour is changed.
    // This mimics the functionality when propagating through the times in
    // bootstrap-datetimepicker.js's datePickerModes (i.e. day, month, year, decade)
    $('#datetimepicker').data('DateTimePicker').actions.selectHour = function(e) {
        var hour = parseInt($(e.target).text(), 10);
        var date = $('#datetimepicker').data("DateTimePicker").date().clone();

        if (!$('#datetimepicker').data('DateTimePicker').use24Hours()) {
            if (date.hours() >= 12) {
                if (hour !== 12) {
                    hour += 12;
                }
            } else {
                if (hour === 12) {
                    hour = 0;
                }
            }
        }

        if (date.hours() !== hour) {
          self.setDateAndTime(date.clone().hours(hour));
        }
    };

    $('#datetimepicker').on('dp.change', function(e) {  
    // console.log('DEBUG: change event = ' + JSON.stringify(e));
      if (!e.date.isSame(self._availableDates[self._selectedDateIndex], 'hour') ||
      !e.date.isSame(self._availableDates[self._selectedDateIndex], 'day') ||
      !e.date.isSame(self._availableDates[self._selectedDateIndex], 'month') ||
      !e.date.isSame(self._availableDates[self._selectedDateIndex], 'year')) {
        self.setDateAndTime(e.date);
      }
    });

    $('#datetimepicker').on('dp.update', function(e) {
        // console.log('DEBUG: update event = ' + JSON.stringify(e));
        if (!e.viewDate.isSame(self._availableDates[self._selectedDateIndex], 'hour') ||
        !e.viewDate.isSame(self._availableDates[self._selectedDateIndex], 'day') ||
        !e.viewDate.isSame(self._availableDates[self._selectedDateIndex], 'month') ||
        !e.viewDate.isSame(self._availableDates[self._selectedDateIndex], 'year')) {
            self.setDateAndTime(e.viewDate);
        }
    })

    var stop = L.DomEvent.stopPropagation
    L.DomEvent
      .on(this.container, 'click', stop)
      .on(this.container, 'mousedown', stop)
      .on(this.container, 'dblclick', stop);

    this._updateDisabled();

    return this.container;
  },

  onRemove: function(map) {
    //map.off('zoomend zoomlevelschange', this._updateDisabled, this);
  },

  _createButton: function(html, title, className, container, fn, context) {
    var link = L.DomUtil.create('a', className, container);
    link.innerHTML = html;
    link.href = '#';
    link.title = title;

    var stop = L.DomEvent.stopPropagation;

    L.DomEvent
      .on(link, 'click', stop)
      .on(link, 'mousedown', stop)
      .on(link, 'dblclick', stop)
      .on(link, 'click', L.DomEvent.preventDefault)
      .on(link, 'click', fn, context)
      .on(link, 'click', this._refocusOnMap, context);

    return link;
  },

  _updateDisabled: function() {
    var map = this._map,
      className = 'leaflet-disabled';

    L.DomUtil.removeClass(this._dayUpButton, className);
    L.DomUtil.removeClass(this._dayDownButton, className);

  },

  // set available dates and times, and select most recent one for display
  setAvailableDateAndTimes: function(available_times) {
    for (var idx_date = 0; idx_date < available_times.length; idx_date++) {
      var datestr = available_times[idx_date];
	  var currentMoment = moment(datestr).utc();
      var roundedMoment = currentMoment.clone().minutes(0).seconds(0);
      this._availableDates[this._availableDates.length] = currentMoment;
	  //console.log("dateChanger.js: setAvailableDateAndTimes: idx_date = " + idx_date + ", moment = " + currentMoment.format());
      if (idx_date === 0) {
        this._disableIntervals[this._disableIntervals.length] = [moment(-8640000000000000), roundedMoment];
      }
      if (idx_date === (available_times.length - 1)) {
        this._disableIntervals[this._disableIntervals.length] = [roundedMoment, moment(8640000000000000)];
      } else {
        this._disableIntervals[this._disableIntervals.length] = [roundedMoment, moment(available_times[idx_date + 1]).minutes(0).seconds(0)];
      }
    };
	
	/*
	console.log("dateChanger.js: setAvailableDateAndTimes: this._disableIntervals.length = " + this._disableIntervals.length)
	for (var idx_date = 0; idx_date < this._disableIntervals.length; idx_date++) {
		console.log("dateChanger.js: setAvailableDateAndTimes: this._disableIntervals[idx_date]= " + this._disableIntervals[idx_date]);
	}
	*/	
	
	/*
	console.log("dateChanger.js: setAvailableDateAndTimes: this._availableDates = " + this._availableDates)
	console.log("dateChanger.js: setAvailableDateAndTimes: this._disableIntervals = " + this._disableIntervals)
	console.log("dateChanger.js: setAvailableDateAndTimes: Object.keys($('#datetimepicker').data('DateTimePicker')) = " + Object.keys($('#datetimepicker').data("DateTimePicker")))
    */
	
	$('#datetimepicker').data("DateTimePicker").enabledDates(this._availableDates);
    $('#datetimepicker').data("DateTimePicker").disabledTimeIntervals(this._disableIntervals);
	
	/*
	console.log("dateChanger.js: this._availableDates.length = " + this._availableDates.length);
	console.log("dateChanger.js: this._availableDates[0] = " + this._availableDates[0].format());
	console.log("dateChanger.js: this._availableDates[this._availableDates.length - 1] = " + this._availableDates[this._availableDates.length - 1].format());
	*/
	
    //$('#datetimepicker').data("DateTimePicker").minDate(this._availableDates[0]);
    //$('#datetimepicker').data("DateTimePicker").maxDate(this._availableDates[this._availableDates.length - 1]);
    $('#datetimepicker').data("DateTimePicker").minDate(this._availableDates[0]);
    $('#datetimepicker').data("DateTimePicker").maxDate(this._availableDates[this._availableDates.length - 1]);
    
	
	this._selectedDateIndex = this._availableDates.length - 1;
    this.incrementSelectedDateAndTime(0); // force updating of displayed date string
  },

  // get displayed date
  getDateAndTime: function() {
    if (this._selectedDateIndex > -1) return this._availableDates[this._selectedDateIndex]
    else return null;
  },

  _availableDates: [],
  _disableIntervals: [
    []
  ],
  _selectedDateIndex: -1,

});

L.control.dateChanger = function(options) {
  return new L.Control.DateChanger(options);
};
