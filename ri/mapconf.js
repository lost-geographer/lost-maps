var map = L.map('map').setView([43.52, 10.331], 13);

var openTopoMap = L.tileLayer(
	'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{
		attribution: 'Dati: <a href="https://opentopomap.org/copyright">OpenTopoMap</a>'
	}).addTo(map);

//https://stackoverflow.com/questions/46268753/filter-getfeatureinfo-results-leaflet-wms-plugin
var MinAmbSource = L.WMS.Source.extend({
	'showFeatureInfo': function(latlng, info){
		if (!this._map){return;}

		/*aggiornamento = info.split(/'/)[19];
		switch (aggiornamento){
			case " ":
				aggiornamento = "sconosciuta";
				break;
			default:
				aggiornamento = aggiornamento;
				break;
		}*/

		tipo = info.split(/'/)[21];
		switch (tipo){
			case "ALLUVIONE":
				legenda = info.split(/'/)[27];
				tipo = "ALLUVIONI";
				break;
			case "FRANA":
				legenda = info.split(/'/)[25];
				tipo = "FRANE";
				break;
			default:
				info = "Nessuno dato idrogeologico selezionato.";
				break;
		}

		switch (tipo){
			case "ALLUVIONI":
			case "FRANE":
				switch (legenda){
					case "MOLTO ELEVATA":
						pericolosità = "molto elevata";
						frequenza = "MOLTO FREQUENTI";
						break;
					case "ELEVATA":
						pericolosità = "elevata";
						frequenza = "FREQUENTI";
						break;
					case "MEDIA":
						pericolosità = "media";
						frequenza = "FREQUENTI";
						break;
					case "MODERATA":
						pericolosità = "moderata";
						frequenza = "POCO FREQUENTI";
						break;
					case "SITO DI ATTENZIONE":
						pericolosità = "« sito di attenzione »";
						frequenza = "FREQUENZA SCONOSCIUTA";
						break;
					case "N.D.":
						pericolosità = "non disponibile";
						frequenza = "FREQUENZA SCONOSCIUTA";
						break;
					case "Altro":
						pericolosità = "specifica";
						frequenza = "CONTATTARE AUTORITÀ LOCALI";
						break;
					default:
						pericolosità = "non disponibile";
						frequenza = "FREQUENZA SCONOSCIUTA";
						break;
				}
				info = "Pericolosità " + pericolosità + "<br/><span class=\"legenda\">" + tipo + " " + frequenza + "</span>"/*<br>Data pubblicazione: " + aggiornamento*/;
				break;
			default:
				info = "Nessuno dato idrogeologico selezionato.";
				break;
			}
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
var decessi = L.layerGroup();

L.marker([43.517480, 10.340572]).bindPopup('Bechini Martina').addTo(decessi),
L.marker([43.517466, 10.348805]).bindPopup('Vestuti Roberto').addTo(decessi),
L.marker([43.514152, 10.332958]).bindPopup('Frattali Raimondo').addTo(decessi),
L.marker([43.517567, 10.347260]).bindPopup('Tampucci Gianfranco').addTo(decessi),
L.marker([43.439487, 10.482817]).bindPopup('Nigiotti Matteo').addTo(decessi),
L.marker([43.528494, 10.311868]).bindPopup('Garzelli Glenda<br>Ramacciotti Filippo<br>Ramacciotti Simone<br>Ramacciotti Roberto').addTo(decessi);

var control = L.control.layers({
	'Cliccare sulla mappa per informazioni dettagliate': openTopoMap},{
	'Pericolosità alluvioni: da moderata a molto elevata': periAlluvioneMME,
	'Pericolosità frane: da moderata a molto elevata': periFranaMME,
	'Decessi legati al nubifragio del 10 settembre 2017': decessi.addTo(map)
},{collapsed:false})

control.addTo(map);
