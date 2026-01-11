/* -----------------------------------------------------------
   VANBOT CORE SCRIPT - FIREBASE REALTIME EDITION
   -----------------------------------------------------------
*/

// Import Firebase SDK (ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// === CONFIGURATION ===
const firebaseConfig = {
  apiKey: "AIzaSyBrM_MM0J74eN_iP_8-5D1E-Ydh-ib982Q",
  authDomain: "bot-wa-55752.firebaseapp.com",
  projectId: "bot-wa-55752",
  storageBucket: "bot-wa-55752.firebasestorage.app",
  messagingSenderId: "757591173470",
  appId: "1:757591173470:web:7cbaf0427775a7eee147cf",
  measurementId: "G-L5XJC6QKCG",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === DATA FEATURES ===
const featureData = {
  rpg: {
    title: "RPG ADVENTURE",
    items: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
        h: "HUNT SYSTEM",
        p: "Berburu Ore dan EXP untuk meningkatkan level dan kekuatan karaktermu.",
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
        h: "ECONOMY",
        p: "Cek dompet, klaim hadiah harian, atau coba keberuntungan dengan fitur maling.",
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        h: "RPG MENU",
        p: "Akses command lengkap .rpgmenu untuk melihat seluruh daftar petualangan.",
      },
    ],
  },
  ai: {
    title: "SMART AI & ADMIN",
    items: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>',
        h: "DEEPSEEK AI",
        p: "Tanya apa saja ke AI cerdas melalui command .ask untuk solusi instan.",
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>',
        h: "LIST ADMIN",
        p: "Lihat daftar kontak admin yang mengelola bot melalui .listadmin.",
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>',
        h: "GROUP SHIELD",
        p: "Fitur moderasi grup: .kick, .hidetag, dan .tagall untuk kontrol penuh.",
      },
    ],
  },
  stamp: {
    title: "CREATIVE TOOLS",
    items: [
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
        h: "STICKER MAKER",
        p: "Ubah foto/video jadi stiker 1:1 (.s) atau vertical 9:16 (.s 9:16).",
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
        h: "QUOTE GENERATOR",
        p: "Buat gambar kutipan keren dengan gaya iPhone .iqc",
      },
      {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 21h10"></path><path d="M12 21V3"></path><path d="M7 3h10"></path></svg>',
        h: "BRAT DESIGN",
        p: "Bikin stiker teks estetik dengan .brat atau .bratvid.",
      },
    ],
  },
};

// === FIREBASE LISTENER ===
function listenToBotStatus() {
  const dot = document.getElementById("bot-status-dot");
  const text = document.getElementById("bot-status-text");

  // Langsung "mendengarkan" perubahan dokumen vanbot di Firestore
  onSnapshot(
    doc(db, "status_bot", "vanbot"),
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        // Update Lampu Status & Teks
        if (data.online) {
          dot.className = "dot-online";
          text.innerText = "SYSTEM ACTIVE";
        } else {
          dot.className = "dot-offline";
          text.innerText = "SYSTEM OFFLINE";
        }

        // Update Angka Statistik (Users & Hits)
        // Menambahkan text-shadow via JS agar lebih kuat brutalistnya
        const userEl = document.getElementById("user-count");
        const hitEl = document.getElementById("hit-count");

        userEl.innerText = data.users || 0;
        hitEl.innerText = data.hits || 0;
      }
    },
    (error) => {
      console.error("Firebase Error:", error);
      text.innerText = "CONN ERROR";
    }
  );
}

// Jalankan listener saat halaman dimuat
listenToBotStatus();

// === UI INTERACTION FUNCTIONS ===
window.showDetail = function (key) {
  const data = featureData[key];
  const detailTitle = document.getElementById("detail-title");
  const detailBody = document.getElementById("detail-body");
  const homeContent = document.getElementById("home-content");
  const detailPanel = document.getElementById("detail-panel");

  if (!data) return;

  detailTitle.innerText = data.title;
  detailBody.innerHTML = data.items
    .map(
      (i) => `
            <div class="detail-item">
                ${i.icon}
                <div><h5>${i.h}</h5><p>${i.p}</p></div>
            </div>`
    )
    .join("");

  homeContent.classList.add("hidden");
  detailPanel.classList.remove("hidden");
  detailBody.scrollTop = 0;
};

window.hideDetail = function () {
  document.getElementById("home-content").classList.remove("hidden");
  document.getElementById("detail-panel").classList.add("hidden");
};

// === PARTICLE BACKGROUND SYSTEM ===
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
const particleCount = 40;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random() * 0.4;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;

    if (this.x > canvas.width + 20) this.x = -20;
    if (this.x < -20) this.x = canvas.width + 20;
    if (this.y > canvas.height + 20) this.y = -20;
    if (this.y < -20) this.y = canvas.height + 20;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.strokeStyle = `rgba(18, 18, 18, ${this.opacity})`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
