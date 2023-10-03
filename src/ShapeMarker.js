import L from 'leaflet';

export var ShapeMarker = L.Path.extend({

  initialize: function (latlng, size, options) {
    L.setOptions(this, options);
    this._size = size;
    this._latlng = L.latLng(latlng);
    this._svgCanvasIncludes();
  },

  toGeoJSON: function () {
    return L.GeoJSON.getFeature(this, {
      type: 'Point',
      coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
    });
  },

  _svgCanvasIncludes: function () {
    // implement in sub class
  },

  _project: function () {
    this._point = this._map.latLngToLayerPoint(this._latlng);
  },

  _update: function () {
    if (this._map) {
      this._updatePath();
    }
  },

  _updatePath: function () {
    // implement in sub class
  },

  setLatLng: function (latlng) {
    this._latlng = L.latLng(latlng);
    this.redraw();
    return this.fire('move', {latlng: this._latlng});
  },

  getLatLng: function () {
    return this._latlng;
  },

  setSize: function (size) {
    this._size = size;
    return this.redraw();
  },

  getSize: function () {
    return this._size;
  },

  // NOTE: Needed by the leaflet `Canvas` renderer for interactivity
  // For more details please see https://github.com/boss-solutions/boss_maps/issues/200#issuecomment-1743215427
  // and https://github.com/Esri/Leaflet.shapeMarkers/issues/26
	_containsPoint: function (p) {
    if (p) {
		   return p.distanceTo(this._point) <= this.getSize() + this._clickTolerance();
    }
    return false;
	},

  _updateBounds: function () {
    // NOTE: there is no bounds to update so this is a dummy method to avoid errors
    // For more details please see here https://github.com/Esri/esri-leaflet/issues/1368
  }

});
