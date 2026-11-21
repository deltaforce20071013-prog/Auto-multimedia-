
// AUTO MULTIMEDIA - INTERACTIVE SYSTEM

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

// APP WINDOW
const appStyle = document.createElement("style");
appStyle.textContent = `
.app-modal {
  position:fixed; inset:0; z-index:9999;
  background:rgba(3,5,25,.96);
  display:none; flex-direction:column;
  padding:25px; overflow:auto;
}
.app-modal.active { display:flex; }
.app-header {
  display:flex; justify-content:space-between;
  align-items:center; margin-bottom:30px;
}
.app-header h2 { color:#83dfff; }
.app-close {
  background:#263d88; color:white;
  border:1px solid #668aff; border-radius:12px;
  padding:12px 18px; font-size:18px;
}
.app-content {
  max-width:600px; width:100%;
  margin:auto; text-align:center;
}
.app-content button, .app-content input {
  margin:8px; padding:13px;
  border-radius:12px; border:1px solid #648aff;
}
.app-content button {
  background:#263d88; color:white;
}
.app-content audio { width:100%; margin-top:20px; }
.app-content a { color:#8bdcff; }
`;

document.head.appendChild(appStyle);

const modal = document.createElement("div");
modal.className = "app-modal";
modal.innerHTML = `
  <div class="app-header">
    <h2 id="app-title">AUTO MULTIMEDIA</h2>
    <button class="app-close" onclick="closeApp()">✕</button>
  </div>
  <div class="app-content" id="app-content"></div>
`;
document.body.appendChild(modal);

function closeApp() {
  modal.classList.remove("active");
  const audio = document.getElementById("local-audio");
  if (audio) audio.pause();
}

function showApp(name, content) {
  document.getElementById("app-title").textContent = name;
  document.getElementById("app-content").innerHTML = content;
  modal.classList.add("active");
}

// APPLICATIONS
function openApp(name) {

  if (name === "Navigation" || name === "Maps") {
    showApp("NAVIGATION", `
      <h2>Google Maps</h2>
      <p>Navigate anywhere</p>
      <button onclick="window.open('https://maps.google.com','_blank')">
        Open Google Maps
      </button>
    `);
  }

  else if (name === "Phone") {
    showApp("PHONE", `
      <h2>Phone</h2>
      <p>Telefon raqamini kiritish uchun dialer ochiladi.</p>
      <a href="tel:">Telefon ilovasini ochish</a>
    `);
  }

  else if (name === "Bluetooth") {
    showApp("BLUETOOTH", `
      <h2>Bluetooth</h2>
      <p>Bluetooth ulanishi uchun Android sozlamalaridan foydalaning.</p>
      <p>Bu bo‘lim hozircha interfeys simulyatori.</p>
    `);
  }

  else if (name === "YouTube" || name === "Video") {
    showApp(name.toUpperCase(), `
      <h2>${name}</h2>
      <p>Videolarni YouTube orqali oching.</p>
      <button onclick="window.open('https://youtube.com','_blank')">
        Open YouTube
      </button>
    `);
  }

  else if (name === "Music") {
    showApp("MUSIC PLAYER", `
      <h2>My Music</h2>
      <p>Telefoningizdan audio fayl tanlang.</p>
      <input type="file" accept="audio/*"
        onchange="playLocalMusic(this)">
      <audio id="local-audio" controls></audio>
    `);
  }

  else if (name === "Radio") {
    showApp("FM RADIO", `
      <h2>Radio Station</h2>
      <p>Radio interfeysi</p>
      <p>Internet radio stansiyalari keyingi bosqichda ulanadi.</p>
    `);
  }

  else if (name === "Settings") {
    showApp("SETTINGS", `
      <h2>System Settings</h2>
      <p>Display brightness</p>
      <input type="range" min="30" max="100" value="100"
        oninput="document.body.style.filter='brightness('+this.value+'%)'">
      <p>Auto Multimedia v1.0</p>
    `);
  }
}

// LOCAL MUSIC
let currentAudioURL = null;

function playLocalMusic(input) {
  if (!input.files || !input.files[0]) return;

  if (currentAudioURL) URL.revokeObjectURL(currentAudioURL);

  currentAudioURL = URL.createObjectURL(input.files[0]);

  const audio = document.getElementById("local-audio");
  audio.src = currentAudioURL;
  audio.play();
}

// MUSIC BUTTONS
let isPlaying = false;

function toggleMusic() {
  isPlaying = !isPlaying;
  document.getElementById("play").textContent =
    isPlaying ? "⏸" : "▶";
}

let currentTrack = 0;

const tracks = [
  "Auto Multimedia",
  "My Music",
  "Favorite Song"
];

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

function goHome() {
  closeApp();
}

showTrack();

console.log("AUTO MULTIMEDIA READY");
