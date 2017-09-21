var map = L.map('map').setView([43.52, 10.331], 13);

var openTopoMap = L.tileLayer(
	'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{
		attribution: 'Dati: <a href="https://opentopomap.org/copyright">OpenTopoMap</a>'
	}).addTo(map);

var periAlluvioneB = L.tileLayer.wms('http://www.geoservices.isprambiente.it/arcgis/services/Alluvioni/Aree_pericolosita_idraulica/MapServer/WmsServer?', {
    layers: '0',
		format: "image/png",
		transparent: true,
		opacity: 0.8,
		attribution: "<a href='http://geoportale.isprambiente.it/'>Istituto Superiore per la Protezione e la Ricerca Ambientale</a>"
}).addTo(map);

var control = L.control.layers({}, {
    'Pericolosità Alluvioni: bassa': periAlluvioneB
})

control.addTo(map);
