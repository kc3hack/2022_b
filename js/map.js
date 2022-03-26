var map = L.map('mapid', {
  center: [35.66572, 139.73100],
  zoom: 17,
});

var tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',}
);

tileLayer.addTo(map);
var features = [];

var place = [{
  // "name": "東京ミッドタウン",
  "lat": "35.66572",
  "long": "139.73100"
}, {
  // "name": "サントリー美術館",
  "lat": "35.6662186",
  "long": "139.7303961"
},]

// GeoJSON形式で複数個のマーカーを設定する
for (var i = 0; i < place.length; i++) {
  features.push({ 
    "type": "Feature",
    "properties": {
      "name": place[i].name
    },
    "geometry": {
      "type": "Point",
      "coordinates": [place[i].long, place[i].lat]
    }
  });
}

L.geoJson(features, {
  onEachFeature: function(features, layer) {
    if (features.properties && features.properties.name) {
      layer.bindPopup(features.properties.name);
      layer.on('mouseover', function(e) {
        this.openPopup();
      });
      layer.on('mouseout', function(e) {
        this.closePopup();
      });
      layer.on('click', function(e) {
        alert('ここにゴミ捨てるの?');
      });
    }
  }
}).addTo(map);