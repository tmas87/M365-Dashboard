/* =========================
   THEME TOGGLE
========================= */
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

/* =========================
   MODALS
========================= */
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

/* =========================
   LIVE TIME & DATE
========================= */
setInterval(() => {
  const now = new Date();
  document.getElementById("time").innerText =
    `🕒 ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}, 1000);

/* =========================
   LOCATION (PLACE NAME)
========================= */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.suburb ||
          "Unknown city";

        const region = data.address.state || "";
        const country = data.address.country || "";

        document.getElementById("location").innerText =
          `📍 ${city}, ${region}, ${country}`;
      } catch (err) {
        document.getElementById("location").innerText =
          "📍 Location unavailable";
      }
    },
    () => {
      document.getElementById("location").innerText =
        "📍 Location blocked";
    }
  );
} else {
  document.getElementById("location").innerText =
    "📍 Location not supported";
}

/* =========================
   CHARTS
========================= */

// Licensing
new Chart(document.getElementById("licenseChart"), {
  type: "doughnut",
  data: {
    labels: ["M365 E3", "M365 E5"],
    datasets: [{
      data: [60, 40],
      backgroundColor: ["#0078d4", "#00bcf2"]
    }]
  },
  options: {
    plugins: { legend: { display: false } }
  }
});

// Users
new Chart(document.getElementById("usersChart"), {
  type: "doughnut",
  data: {
    labels: ["Online", "Offline"],
    datasets: [{
      data: [120, 30],
      backgroundColor: ["#107c10", "#a4c400"]
    }]
  },
  options: {
    plugins: { legend: { display: false } }
  }
});

// Security
new Chart(document.getElementById("securityChart"), {
  type: "doughnut",
  data: {
    labels: ["Secure", "At Risk"],
    datasets: [{
      data: [85, 15],
      backgroundColor: ["#107c10", "#d83b01"]
    }]
  },
  options: {
    plugins: { legend: { display: false } }
  }
});

// Risk Register
new Chart(document.getElementById("riskChart"), {
  type: "doughnut",
  data: {
    labels: ["High", "Medium"],
    datasets: [{
      data: [3, 7],
      backgroundColor: ["#a80000", "#ffb900"]
    }]
  },
  options: {
    plugins: { legend: { display: false } }
  }
});
