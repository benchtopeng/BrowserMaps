function updateColormapParams() {
  var layerName = window.wg.udp.layerName;

  // clim
  var vmin = parseFloat($('#vminInput').val(), 10);
  var vmax = parseFloat($('#vmaxInput').val(), 10);
  
  if (!isNaN(vmin) || !isNaN(vmax)) {
    window.wg.udp.definition[layerName].style["clim"] = [undefined, undefined];
  }
  if (!isNaN(vmin)) {
    window.wg.udp.definition[layerName].style.clim[0] = vmin;
  }
  if (!isNaN(vmax)) {
    window.wg.udp.definition[layerName].style.clim[1] = vmax;
  }
  
  // colormap
  var colormap = $('#colormapSelect option:selected').val();
  if (colormap.indexOf('Select a colormap') <= -1) {
    if ($('#reverseColormap').is(":checked")) {
      colormap += '_r';
    }
    window.wg.udp.definition[layerName].style["colormap"] = colormap;
  }
}

function setAvailableColorMaps() {
  // From matplotlib.pyplot.colormaps(), which is used in backend:
  var colormaps = [
    'viridis',
    'Accent',
    'Blues',
    'BrBG',
    'BuGn',
    'BuPu',
    'CMRmap',
    'Dark2',
    'GnBu',
    'Greens',
    'Greys',
    'OrRd',
    'Oranges',
    'PRGn',
    'Paired',
    'Pastel1',
    'Pastel2',
    'PiYG',
    'PuBu',
    'PuBuGn',
    'PuOr',
    'PuRd',
    'Purples',
    'RdBu',
    'RdGy',
    'RdPu',
    'RdYlBu',
    'RdYlGn',
    'Reds',
    'Set1',
    'Set2',
    'Set3',
    'Spectral',
    'Vega10',
    'Vega20',
    'Vega20b',
    'Vega20c',
    'Wistia',
    'YlGn',
    'YlGnBu',
    'YlOrBr',
    'YlOrRd',
    'afmhot',
    'autumn',
    'binary',
    'bone',
    'brg',
    'bwr',
    'cool',
    'coolwarm',
    'copper',
    'cubehelix',
    'flag',
    'gist_earth',
    'gist_gray',
    'gist_heat',
    'gist_ncar',
    'gist_stern',
    'gist_yarg',
    'gnuplot',
    'gnuplot2',
    'gray',
    'hot',
    'hsv',
    'inferno',
    'jet',
    'magma',
    'nipy_spectral',
    'ocean',
    'pink',
    'plasma',
    'prism',
    'rainbow',
    'seismic',
    'spectral',
    'spring',
    'summer',
    'tab10',
    'tab20',
    'tab20b',
    'tab20c',
    'terrain',
    'winter'
  ]

  var select = $('#colormapSelect');
  for (var i = 0; i < colormaps.length; i++) {
    select.append(new Option(colormaps[i], colormaps[i]));
  }
}
