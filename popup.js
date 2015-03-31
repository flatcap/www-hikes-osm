
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

closer.onclick = function() {
	overlay.setPosition(undefined);
	closer.blur();
	return false;
};

var overlay = new ol.Overlay({
	element: container
});

var map = new ol.Map({
	layers: [
		new ol.layer.Tile({
			source: new ol.source.TileJSON({
				url: 'http://api.tiles.mapbox.com/v3/mapbox.natural-earth-hypso-bathy.jsonp',
				crossOrigin: 'anonymous'
			})
		})
	],
	renderer: exampleNS.getRendererFromQueryString(),
	overlays: [overlay],
	target: 'map',
	view: new ol.View({
		center: [0, 0],
		zoom: 2
	})
});

map.on('click', function(evt) {
	var coordinate = evt.coordinate;
	var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));

	content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
	overlay.setPosition(coordinate);
});
