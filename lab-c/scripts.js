class Tile {
  constructor(id, canvas) {
    this.id = id;
    this.canvas = canvas;
  }
}

let mapa;
const tiles = [];
const table = document.getElementById("table");


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function success(position) {
  getMap([position.coords.latitude, position.coords.longitude]);
}

function error() {
  alert("Couldn't get your location, showing default location");
  getMap([53.447084, 14.49183]);
}


function getMap(position) {
  mapa = L.map("map").setView(position, 18);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        '&copy; <a href="https://www.esri.com/">Esri</a>'
    }
  ).addTo(mapa);
}


function getMapImage() {
  leafletImage(mapa, function (err, canvas) {
    if (err) return;

    tiles.length = 0;

    divideToTiles(canvas);

    createBoard();
    displayTiles();
  });
}


function divideToTiles(canvas) {
  const tileWidth = canvas.width / 4;
  const tileHeight = canvas.height / 4;

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const tileCanvas = document.createElement("canvas");
      tileCanvas.width = tileWidth;
      tileCanvas.height = tileHeight;

      const ctx = tileCanvas.getContext("2d");

      ctx.drawImage(
        canvas,
        x * tileWidth,
        y * tileHeight,
        tileWidth,
        tileHeight,
        0,
        0,
        tileWidth,
        tileHeight
      );

      const id = `${x}-${y}`;
      tiles.push(new Tile(id, tileCanvas));
    }
  }
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function displayTiles() {
  const container = document.querySelector(".container-puzzle");
  container.innerHTML = "";

  tiles.forEach((tile) => {
    const img = document.createElement("img");
    img.src = tile.canvas.toDataURL();
    img.draggable = true;
    img.dataset.id = tile.id;

    img.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("tile-id", tile.id);
    });

    container.appendChild(img);
  });
}


function createBoard() {
  table.innerHTML = "";

  for (let i = 0; i < 16; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.dataset.index = i;

    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    slot.addEventListener("drop", (e) => {
      e.preventDefault();

      const id = e.dataTransfer.getData("tile-id");
      const tile = tiles.find((t) => t.id === id);

      if (!tile) return;

      slot.innerHTML = "";

      const img = document.createElement("img");
      img.src = tile.canvas.toDataURL();
      img.dataset.id = tile.id;

      slot.appendChild(img);

      checkWin();
    });

    table.appendChild(slot);
  }
}

function checkWin() {
  const slots = document.querySelectorAll(".slot");

  for (let i = 0; i < slots.length; i++) {
    const img = slots[i].querySelector("img");

    if (!img) return;

    const [x, y] = img.dataset.id.split("-").map(Number);
    const correctIndex = y * 4 + x;

    if (correctIndex !== i) {
      return;
    }
  }

  win();
}

function win() {
  if (Notification.permission === "granted") {
    new Notification("Success", {
      body: "You solved puzzle!"
    });
  } else {
    alert("Success, You solved puzzle!");
  }
}
console.log(Notification.permission);
