/*
 * title: 14 Masterpieces from the Prado museum in GigaPixel (Google ArtProject)
 *
 * Museo del Prado Masterpieces:
 *
 * The Annunciation. Fra Angelico.
 * The Cardinal. Raphael.
 * Immaculate Conception. Giovanni Battista Tiepolo.
 * Equestrian Portrait of Charles V at Mühlberg. Titian.
 * The Third of May, 1808 in Madrid. Francisco de Goya.
 * The Nobleman with his Hand on his Chest. El Greco.
 * Jacob’s Dream. José de Ribera.
 * Las Meninas or The Family of Philip IV. Diego Velázquez.
 * The Three Graces. Peter Paul Rubens.
 * Judith at the Banquet of Holofernes. Rembrandt
 * The Garden of Earthly Delights. Hieronymus Bosch.
 * Descent from the Cross. Roger van der Weyden.
 * Crucifixion. Juan de Flandes.
 *
 * dezoomify by zoom in url (or mazZoom in Masterpiece), zoom = in url in url { 0 | 1 | 2 | ... | maxZ (or any number, default=2) }
 *
 * href: http://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00749/img/img_{{Z}}_{{X}}_{{Y}}.jpg
 *
 * Examples:
 *   https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00015/img/img_{{Z}}_{{X}}_{{Y}}.jpg
 *   https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00809/img/img_recortada_{{Z}}_{{X}}_{{Y}}.jpg?z=2
 *
 * rev:
 *      0.1 20200519 (c) mgm
 *      0.2 20201708 (c) mgm
 */

function $(i,e,d){d=d||document; return d.getElementById(i).getElementsByTagName(e)}
function SetArtworkSelected(csel) {
	var linksImg = $('ths', 'IMG');
	for (var i=0; i < linksImg.length; i++) {
		linksImg[i].className = (i == csel) ? 'select' : '';
	}
}
function SetArtworkSelectedUrl(url) {
	if (url.match(/\?.=/)) {
		var param = url.split('?');
		url = param[0];
	}
	var regEx = /^(.*)prado\/(.*)\/img\/(.*)_(.*)_(.*)_(.*).jpg$/i;
	var matches = url.match(regEx)
	var cDirInUrl = matches[2]; // in url  = { P00015 | P00299 | ... | P07878 }

	for(var i = 0; i < aprado.length; i++){
		if (aprado[i][cDir] == cDirInUrl) {
			SetArtworkSelected(i);
		}
	}
}

function eleInArr(arr, obj, nele) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][nele] === obj)
			return arr[i];
	}
	return false;
}

function MkHrefOfThsArtworks(csPrado, divObj, csel) {
	var ths = '';
	for(var i=0;i<csPrado.length;i++){
		var c = csPrado[i];
		ths += '<a href="javascript:ChangeArtwork(\''+c[cDir]+'\',\''+c[preTile]+'\',\''+c[maxZ]+'\',\''+i+'\');"';
		ths += ' title="'+c[cDir]+' - '+c[cTitle]+', '+c[cAutor]+', zoomMax='+c[maxZ]+'">';
		ths += '<img src="'+URLP+'img/'+c[cDir]+'.jpg"></a>';
	}
	var thsObj = document.createElement('div');
	thsObj.id = 'ths';
	divObj.appendChild(thsObj).innerHTML = ths;

	SetArtworkSelected(csel);
}
function ChangeArtwork(cDir, preTile, zoomMax, csel) {
	var _newUrl = URLP+cDir+'/img/'+preTile+'_{{Z}}_{{X}}_{{Y}}.jpg';

	var _inputId = document.getElementById('url');
	var zDL = getZooomDLInUrl(_inputId.value);

	// change new_url in input url
	_inputId.value = _newUrl + '?z=' + zDL;

	// change new_url in select_urls options
	setSelectBoxByValue('selectUrlsDLId', _newUrl);

	// change new_zoom in select_zooms options
	var selectZoomsDL = document.getElementById('selectZoomsDLId');
	// remove options from select
	while (selectZoomsDL.length > 0) {
		selectZoomsDL.remove(0);
	}
	setOptionsZooms(_inputId, selectZoomsDL, zoomMax, zDL);

	SetArtworkSelected(csel);
}
/**
 * Get Zoom Down Load in input url ID ( url?z=2 )
 * @param url in Input ID
 * zDL in url (window.location.hash) or def 2
 */
function getZooomDLInUrl(_url) {
	if (_url.match(/\?.=/)) {
		var p = _url.split('?');
		var zDL = p[1].split('=')[1];
	}
	return zDL ? parseInt(zDL, 10) : 2;
}
/**
 * Set Select Box Selection By Value
 * @param eid Element ID
 * @param eval Element Index
 */
function setSelectBoxByValue(eid, eval) {
    document.getElementById(eid).value = eval;
}
/**
 * Set Options in Box Selection
 * @param eid Element ID
 * @param zMax zoomMax of artwork
 * @param zDL zoom down load of artwork
 */
function setOptionsZooms(inputId, selectZoomsDL, zoomMax, zDL) {
	for(var i=0; i < zoomMax; i++){
		selectZoomsDL.options.add(new Option(i, i));
		if (i == zDL) {
			selectZoomsDL.options[i].selected = true;
		}
	}
}
/* 
 * https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/img/P00299.jpg
 * https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00015/img/img_{{Z}}_{{X}}_{{Y}}.jpg
 */
var URLP = "https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/";
var [cDir, cAutor, cTitle, tileW, tileH, maxZ, maxW, maxH, preTile] = [0,1,2,3,4,5,6,7,8];
var aprado= [
		['P00015', 'Fra Angelico', 'La Anunciaci&oacute;n, 1426', 256, 256, 9, 86539, 85398, 'img'],
		['P00299', 'Rafael', 'El Cardenal, 1510', 256, 256, 8, 33392, 43012, 'img'],
		['P00363', 'Tiepolo', 'Inmaculada Concepci&oacute;n, 1767-1769', 256, 256, 9, 51952, 95470, 'img'],
		['P00410', 'Tiziano', 'El emperador Carlos V, a caballo, en M&uuml;hlberg, 1548', 256, 256, 9, 58990, 69995, 'img'],
		['P00749', 'Goya', 'El 3 de mayo de 1808 en Madrid: Los fusilamientos en la monta&ntilde;a del Pr&iacute;ncipe P&iacute;o, 1814', 256, 256, 8, 58689, 45252, 'img'],
		['P00809', 'El Greco', 'El caballero de la mano en el pecho, 1580', 256, 256, 6, 12673, 16238, 'img_recortada'],
		['P01117', 'Jos&eacute; de Ribera', 'El sue&ntilde;o de Jacob, 1639', 256, 256, 8, 52560, 39755, 'img'],
		['P01174', 'Vel&aacute;zquez', 'La familia de Felipe IV, o Las Meninas, 1656', 256, 256, 8, 42923, 49403, 'meninas'],
		['P01670', 'Rubens', 'Las Tres Gracias, 1635', 256, 256, 9, 54654, 66596, 'img'],			['P02132', 'Rembrandt', 'Artemisa, 1634', 256, 256, 8, 36898, 34320, 'img'],
		['P02179', 'Durero, Alberto', 'Autorretrato, 1498', 256, 256, 7, 19047, 24047, 'img'],
		['P02823', 'El Bosco', 'El jard&iacute;n de las Delicias, 1500-1505', 256, 256, 10, 156547, 89116, 'img'],
		['P02825', 'Roger van der Weyden', 'El Descendimiento, 1435', 256, 256, 9, 90608, 70303, 'img'],
		['P07878', 'Juan de Flandes', 'La Crucifixi&oacute;n, 1509-1518', 256, 256, 9, 69273, 50061, 'img'],
	   ];

var prado_viewer = (function() {
	return {
		"name": "Museo-Prado",
		"description": "Just put the url of a tile, replacing it's horizontal coordinate by {{X}} and vertical coordinate by {{Y}}.",
		"urls": [/\{\{Z\}\}_\{\{X\}\}_\{\{Y\}\}/],
		"urlsdef": [ 
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00015/img/img_{{Z}}_{{X}}_{{Y}}.jpg", 
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00299/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00363/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00410/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00749/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00809/img/img_recortada_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P01117/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P01174/img/meninas_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P01670/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P02132/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P02179/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P02823/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P02825/img/img_{{Z}}_{{X}}_{{Y}}.jpg",
				"https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P07878/img/img_{{Z}}_{{X}}_{{Y}}.jpg"
			   ],
		"mkSelectUrlsDef": function() {

			if (document.getElementById('urlsdefDezoomer')) {
				return;
			}

			// input url (window.location.hash)
			var selUrl = document.getElementById('url');

			var newDiv = document.createElement('div');
			selUrl.parentNode.insertBefore( newDiv, selUrl.nextSibling );
			newDiv.id = 'urlsdefDezoomer';

			// random url to download
			var i = (Math.random() * aprado.length | 0) + 0;

			// Select of urls in aprado
			var selectUrlsDL = document.createElement('select');
			//newDiv.parentNode.insertBefore( selectUrlsDL, newDiv.nextSibling );
			newDiv.appendChild(selectUrlsDL);

			selectUrlsDL.id = 'selectUrlsDLId';
			selectUrlsDL.title = 'Select URL Download';

			selectUrlsDL.onchange = function(){
				var z = selectZoomsDL.value;
				selUrl.value = this.value + '?z=' + z;
				SetArtworkSelectedUrl(this.value);
			};

			var zDL = getZooomDLInUrl(selUrl.value);
			
			for(var j = 0; j < aprado.length; j++){
				var url = URLP + aprado[j][cDir] + '/img/' + aprado[j][preTile] + '_{{Z}}_{{X}}_{{Y}}.jpg';
				selectUrlsDL.options.add(new Option(url, url));
				if (j == i) {
					selectUrlsDL.options[j].selected = true;
					selUrl.value = url;
				}
			}

			// Select of zooms (0..zoomMax)
			var selectZoomsDL = document.createElement('select');
			selectUrlsDL.parentNode.insertBefore( selectZoomsDL, selectUrlsDLId.nextSibling );

			selectZoomsDL.id = 'selectZoomsDLId';
			selectZoomsDL.title = 'Select Zoom Download';
			selectZoomsDL.onchange = function(){
				var url = selUrl.value;
				if (url.match(/\?/)) {
					var param = url.split('?');
					url = param[0];
				}
				selUrl.value = url + '?z=' + this.value;
			};

			var zoomMax = aprado[i][maxZ]; // zoomMax of artwork
			for(var j = 0; j < zoomMax; j++){
				selectZoomsDL.options.add(new Option(j, j));
				if (j == zDL) {
					selectZoomsDL.options[j].selected = true;
					selUrl.value = selUrl.value + '?z=' + j;
				}
			}

			MkHrefOfThsArtworks(aprado, newDiv, i);
		},
		// https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00015/img/img_{{Z}}_{{X}}_{{Y}}.jpg?z=2
		"open": function(url) {
			if (url.match(/\?.=/)) {
				var param = url.split('?');
				url = param[0];
				var zDL = param[1].split('=')[1];
			}
			var regEx = /^(.*)prado\/(.*)\/img\/(.*)_(.*)_(.*)_(.*).jpg$/i;
			var matches = url.match(regEx)
			var cDirInUrl = matches[2]; // in url  = { P00015 | P00299 | ... | P07878 }
			var zoomDL = zDL ? parseInt(zDL, 10) : 2; // in url = { 0 | 1 | 2 | ... | maxZ (or any number) }

			var arrcp = eleInArr(aprado, cDirInUrl, cDir);
			var tileSize = arrcp[tileW];
			zoomDL = (zoomDL > 0 || zoomDL <= arrcp[maxZ]) ? zoomDL : arrcp[maxZ];

			// width exact of zoomDL (in url)
			var widthReal = Math.ceil((arrcp[maxW] / Math.pow(2, arrcp[maxZ] - zoomDL)));
			var heightReal = Math.ceil((arrcp[maxH] / Math.pow(2, arrcp[maxZ] - zoomDL)));

			// num tiles of zoomDL
			var num_tiles_x = Math.ceil(widthReal / tileSize);
			var num_tiles_y = Math.ceil(heightReal / tileSize);

			// Dimensions zoomDL Tiles for dezoommify
			var width = tileSize * num_tiles_x;
			var height = tileSize * num_tiles_y;

			return ZoomManager.readyToRender({
				tileOrigin: "BOTTOM_LEFT",
				"origin": url,
				"width": width,
				"height": height,
				"widthReal": widthReal,
				"heightReal": heightReal,
				"tileSize": tileSize,
				"nbrTilesX": num_tiles_x,
				"nbrTilesY": num_tiles_y,
				"maxZoomLevel": zoomDL
				//"totalTiles": num_tiles_x * num_tiles_y
			});

		},
		"getTileURL": function(x, y, z, data) {
			y = data.nbrTilesY - y - 1;
			return data.origin.replace("{{Z}}", z).replace("{{X}}", x).replace("{{Y}}", y);
		}
	};
}
)();
ZoomManager.addDezoomer(prado_viewer);
