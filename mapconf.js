var map = L.map('map').setView([43.52, 10.331], 13);

var openTopoMap = L.tileLayer(
	'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{
		attribution: 'Dati: <a href="https://opentopomap.org/copyright">OpenTopoMap</a>'
	}).addTo(map);

//https://stackoverflow.com/questions/46268753/filter-getfeatureinfo-results-leaflet-wms-plugin
var MinAmbSource = L.WMS.Source.extend({
	'showFeatureInfo': function(latlng, info){
		if (!this._map){return;}
		tipo = info.split(/'/)[21];
		switch (tipo){
			case "ALLUVIONE":
				legenda = info.split(/'/)[27];
				switch (legenda){
					case "MOLTO ELEVATA":
						info = "Pericolosità molto elevata<br/><span class=\"legenda\">ALLUVIONI MOLTO FREQUENTI</span>";
						break;
					case "ELEVATA":
						info = "Pericolosità elevata<br/><span class=\"legenda\">ALLUVIONI FREQUENTI</span>";
						break;
					case "MEDIA":
						info = "Pericolosità media<br/><span class=\"legenda\">ALLUVIONI FREQUENTI</span>";
						break;
					case "MODERATA":
						info = "Pericolosità moderata<br/><span class=\"legenda\">ALLUVIONI POCO FREQUENTI</span>";
						break;
					case "SITO DI ATTENZIONE":
						info = "Sito di attenzione";
						break;
					case "N.D.":
						info = "Legenda non disponibile";
						break;
					case "Altro":
						info = "Legenda specifica";
						break;
					default:
						info = "Legenda non disponibile";
						break;
				}
				info;
				break;
			case "FRANA":
				legenda = info.split(/'/)[25];
				switch (legenda){
					case "MOLTO ELEVATA":
						info = "Pericolosità molto elevata<br/><span class=\"legenda\">FRANE MOLTO FREQUENTI</span>";
						break;
					case "ELEVATA":
						info = "Pericolosità elevata<br/><span class=\"legenda\">FRANE FREQUENTI</span>";
						break;
					case "MEDIA":
						info = "Pericolosità media<br/><span class=\"legenda\">FRANE FREQUENTI</span>";
						break;
					case "MODERATA":
						info = "Pericolosità moderata<br/><span class=\"legenda\">FRANE POCO FREQUENTI</span>";
						break;
					case "SITO DI ATTENZIONE":
						info = "Sito di attenzione";
						break;
					case "N.D.":
						info = "Legenda non disponibile";
						break;
					case "Altro":
						info = "Legenda specifica";
						break;
					default:
						info = "Legenda non disponibile";
						break;
				}
				info;
				break;
			default:
				info = "Nessuno dato idrogeologico selezionato.";
				break;
		}
		info;
		this._map.openPopup(info, latlng);
	}
});

var MinAmbPeri = new MinAmbSource("http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/PAI_pericolosita.map",{
		format: "image/png",
		transparent: true,
		attribution: "<a href='http://www.pcn.minambiente.it'>Ministero dell&#8217;Ambiente e della Tutela del Territorio e del Mare</a>",
		info_format: "text/plain",
		opacity: 0.8
	}
);

var periAlluvioneMME = MinAmbPeri.getLayer("RN.PAI.PERICOLOSITA.ALLUVIONE").addTo(map);

var periFranaMME = MinAmbPeri.getLayer("RN.PAI.PERICOLOSITA.FRANA_01").addTo(map);

L.marker([43.517480, 10.340572]).addTo(map)
.bindPopup('Bechini Martina')

L.marker([43.517466, 10.348805]).addTo(map)
.bindPopup('Vestuti Roberto')

L.marker([43.514152, 10.332958]).addTo(map)
.bindPopup('Frattali Raimondo')

L.marker([43.517567, 10.347260]).addTo(map)
.bindPopup('Tampucci Gianfranco')

L.marker([43.439487, 10.482817]).addTo(map)
.bindPopup('Nigiotti Matteo')

L.marker([43.528494, 10.311868]).addTo(map)
.bindPopup('Garzelli Glenda<br>Ramacciotti Filippo<br>Ramacciotti Simone<br>Ramacciotti Roberto')

var control = L.control.layers({}, {
    'Pericolosità Alluvioni: da moderata a molto elevata': periAlluvioneMME,
    'Pericolosità Frane: da moderata a molto elevata': periFranaMME
})
control.addTo(map);
