class Tile {
  constructor(id, canvas) {
    this.id = id;
    this.canvas = canvas;
  }
}

class Table {
  constructor() {
    this.tiles = [];
  }
}

const x = document.getElementById("demo");
let mapa;
const tiles = []
const table = new Table();
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
}

function getMapImage() {
  if (!mapa) return;

  leafletImage(mapa, function(err, canvas) {
    if (err) {
      console.log('Błąd podczas generowania obrazu:', err);
      return;
    }
    tiles.length = 0; // czyszczenie starych tiles
    divideToTiles(canvas)
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    displayTiles()
  });
}

function divideToTiles(canvas) {
  const tileWidth = canvas.width / 4;
  const tileHeight = canvas.height / 4;

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const tileCanvas = document.createElement('canvas');
      tileCanvas.width = tileWidth;
      tileCanvas.height = tileHeight;
      const ctx = tileCanvas.getContext('2d');
      ctx.drawImage(canvas,x * tileWidth, y * tileHeight, tileWidth, tileHeight,0, 0, tileWidth, tileHeight);

      tile = new Tile(`{x}{y}`, tileCanvas)

      tiles.push(tile);

      const emptyCanvas = document.createElement('canvas');
      emptyCanvas.width = tileWidth;
      emptyCanvas.height = tileHeight;
      table.tiles.push(new Tile(`{x}{y}`, emptyCanvas));
    }
  }
}


function displayTiles() {
  const container = document.querySelector('.container-puzzle');
  container.innerHTML = '';
  tiles.forEach(tile => {
    const img = document.createElement('img');
    img.src = tile.canvas.toDataURL();
    container.appendChild(img);

  });
}






