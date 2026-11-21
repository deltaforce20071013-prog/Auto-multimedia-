
// AUTO MULTIMEDIA SYSTEM

// 1. Real vaqt soati
function updateClock() {
  const now = new Date();

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit"
    });

  document.getElementById("date").textContent =
    now.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "short",
      weekday: "short"
    });
}

updateClock();
setInterval(updateClock, 1000);


// 2. Ilovalarni ochish
function openApp(name) {
  alert(name + " bo'limi tez orada ishga tushadi!");
}


// 3. Bosh ekranga qaytish
function goHome() {
  location.reload();
}


// 4. Musiqa boshqaruvi
let isPlaying = false;

function toggleMusic() {
  isPlaying = !isPlaying;

  document.getElementById("play").textContent =
    isPlaying ? "⏸" : "▶";
}


// 5. Treklar
const tracks = [
  "Auto Multimedia",
  "My Music",
  "Favorite Song"
];

let currentTrack = 0;

function showTrack() {
  document.getElementById("track").textContent =
    tracks[currentTrack];
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  showTrack();
}

function previousTrack() {
  currentTrack =
    (currentTrack - 1 + tracks.length) % tracks.length;
  showTrack();
}

showTrack();

console.log("AUTO MULTIMEDIA SYSTEM READY");
