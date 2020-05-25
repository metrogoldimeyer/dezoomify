/*
 * title: 14 Masterpieces from the Prado in GigaPixel (Google ArtProject)
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
 * dezoomify by zoom in url (or mazZoom in Masterpiece), zoom = in url in url { 0 | 1 | 2 | ... | maxZ (or any number) }
 *
 * href: http://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00749/img/img_{{ZOOM}}_{{X}}_{{Y}}.jpg
 *
 * Examples:
 *   https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00015/img/img_2_{{X}}_{{Y}}.jpg
 *   https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00809/img/img_recortada_2_{{X}}_{{Y}}.jpg
 *   https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P01174/img/meninas_2_{{X}}_{{Y}}.jpg
 *
 * rev: 20200519 (c) mgm
 */
function eleInArr(arr, obj, nele) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][nele] === obj)
			return arr[i];
	}
	return false;
}
function getImage(url) {
	var img = new Image;
	//img.src = url + '?t=' + (new Date()).getTime();
	img.src = url;
}
var prado_viewer = (function() {
	return {
		"name": "Museo-Prado",
		"description": "Just put the url of a tile, replacing it's horizontal coordinate by {{X}} and vertical coordinate by {{Y}}.",
		"urls": [/\{\{X\}\}_\{\{Y\}\}/],
		"urldef": "https://mw2.google.com/mw-earth-vectordb/gallery_layers/prado/P00015/img/img_4_{{X}}_{{Y}}.jpg",
		"open": function(url) {
			var [gDir, cDir, cAutor, cTitle, tileW, tileH, maxZ, maxW, maxH, preTile] = [0,1,2,3,4,5,6,7,8,9];
			var cprado=[
			['prado', 'P00015', 'Fra Angelico', 'La Anunciación, 1426', 256, 256, 9, 86539, 85398, 'img'],
			['prado', 'P00299', 'Rafael', 'El Cardenal, 1510', 256, 256, 8, 33392, 43012, 'img'],
			['prado', 'P00363', 'Tiepolo', 'Inmaculada Concepción, 1767-1769', 256, 256, 9, 51952, 95470, 'img'],
			['prado', 'P00410', 'Tiziano', 'El emperador Carlos V, a caballo, en Mühlberg, 1548', 256, 256, 9, 58990, 69995, 'img'],
			['prado', 'P00749', 'Goya', 'El 3 de mayo de 1808 en Madrid: Los fusilamientos en la montaña del Príncipe Pío, 1814', 256, 256, 8, 58689, 45252, 'img'],
			['prado', 'P00809', 'El Greco', 'El caballero de la mano en el pecho, 1580', 256, 256, 6, 12673, 16238, 'img_recortada'],
			['prado', 'P01117', 'José de Ribera', 'El sueño de Jacob, 1639', 256, 256, 8, 52560, 39755, 'img'],
			['prado', 'P01174', 'Velázquez', 'La familia de Felipe IV, o Las Meninas, 1656', 256, 256, 8, 42923, 49403, 'meninas'],
			['prado', 'P01670', 'Rubens', 'Las Tres Gracias, 1635', 256, 256, 9, 54654, 66596, 'img'],
			['prado', 'P02132', 'Rembrandt', 'Artemisa, 1634', 256, 256, 8, 36898, 34320, 'img'],
			['prado', 'P02179', 'Durero, Alberto', 'Autorretrato, 1498', 256, 256, 7, 19047, 24047, 'img'],
			['prado', 'P02823', 'El Bosco', 'El jardín de las Delicias, 1500-1505', 256, 256, 10, 156547, 89116, 'img'],
			['prado', 'P02825', 'Roger van der Weyden', 'El Descendimiento, 1435', 256, 256, 9, 90608, 70303, 'img'],
			['prado', 'P07878', 'Juan de Flandes', 'La Crucifixión, 1509-1518', 256, 256, 9, 69273, 50061, 'img']
			];

			var regEx = /^(.*)prado\/(.*)\/img\/(.*)_([0-9]+)_(.*)_(.*).jpg$/i;
			var parts = url.match(regEx)
			var cDirInUrl = parts[2]; // in url { P00015 | P00299 | ... | P07878 }
			var zoom = parts[4]; // in url { 0 | 1 | 2 | ... | maxZ (or any number) }

			var arrcp = eleInArr(cprado, cDirInUrl, cDir);
			var tileSize = arrcp[tileW];
			zoom = (zoom > 0 || zoom <= arrcp[maxZ]) ? zoom : arrcp[maxZ];

			// width of zoom (in url)
			var width = Math.ceil((arrcp[maxW] / Math.pow(2, arrcp[maxZ] - zoom)));
			var height = Math.ceil((arrcp[maxH] / Math.pow(2, arrcp[maxZ] - zoom)));

			// num tiles of zoom
			var num_tiles_x = Math.ceil(width / tileSize);
			var num_tiles_y = Math.ceil(height / tileSize);

			// Dimensions zoom Tiles for dezoommify
			width = tileSize * num_tiles_x;
			height = tileSize * num_tiles_y;

			for (var y = 0; y < num_tiles_y; y++) {
				for (var x = 0; x < num_tiles_x; x++) {
					var next_url = url.replace("{{X}}", x).replace("{{Y}}", y);
					getImage(next_url)
				}
			}

			return ZoomManager.readyToRender({
				"origin": url,
				"width": width,
				"height": height,
				"tileSize": tileSize,
				"nbrTilesX": num_tiles_x,
				"nbrTilesY": num_tiles_y,
				"baseZoomLevel": zoom,
				"maxZoomLevel": zoom
			});

		},
		"getTileURL": function(x, y, zoom, data) {
			y = data.nbrTilesY - y - 1;
			return data.origin.replace("{{X}}", x).replace("{{Y}}", y);
		}
	};
}
)();
ZoomManager.addDezoomer(prado_viewer);
