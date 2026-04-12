const x = document.getElementById("demo");
let mapa;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  getMap([position.coords.latitude, position.coords.longitude])
}

function error() {
  alert("Couldn't get your location, showing default location");
  getMap([53.447084, 14.49183])
}


function getMap(position) {
  mapa = L.map('map').setView(position, 70);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &amp; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);
  L.marker(position).addTo(mapa)
}

function saveRasterMap() {
  if (mapa) {
    leafletImage(mapa, function(err, canvas) {
      if (err) {
        console.log('Błąd podczas generowania obrazu:', err);
        return;
      }

      const imgUrl = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = imgUrl;
      link.download = 'mapa.png';
      link.click();
    });
  } else {
    console.log("Mapa nie została załadowana!");
  }
}



class Tile {
  constructor(id) {
    this.id = id;
  }

}
