// ======== THEME TOGGLE ========
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

// ======== MODAL ========
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
modalClose.addEventListener("click", () => { modal.style.display = "none"; });
function openModal(title, content) {
  modalBody.innerHTML = `<h2>${title}</h2>${content}`;
  modal.style.display = "block";
}

// ======== SYNC TIME ========
document.getElementById("syncTime").innerText = new Date().toLocaleString();

// ======== LOCATION ========
navigator.geolocation.getCurrentPosition(
  pos => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
      .then(r => r.json())
      .then(data => { document.getElementById("location").innerText = data.display_name; });
  },
  err => { document.getElementById("location").innerText = "Unavailable"; }
);

// ======== DEMO DATA ========
const data = {
  tenant: { name: "tmas87.onmicrosoft.com", users: 150, licensed: 130, guests: 20 },
  users: { total: 150, licensed: 130, guests: 20 },
  licenses: { businessPremium: 80, e3: 60, unassigned: 10 },
  security: { mfaEnabledPercent: 85, adminMfa: 100, riskySignins: 6 },
  conditionalAccess: { policiesEnabled: 12, reportOnly: 3, lastRiskySignin: "2026-02-05 14:15" },
  services: { exchange: "Healthy", sharepoint: "Healthy", teams: "Warning", onedrive: "Healthy" },
  patching: { deployed: 10, pending: 3 },
  mailflow: { delivered: 1200, failed: 45, pending: 30 },
  devices: { compliant: 95, nonCompliant: 15 }
};

// ======== HELPER: DONUT CHART ========
function createDonutChart(id, labels, values, colors) {
  const canvas = document.createElement("canvas");
  canvas.id = `${id}-chart`;
  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: { labels: labels, datasets: [{ data: values, backgroundColor: colors }] },
    options: { plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }
  });
  return canvas;
}

// ======== HELPER: MINI INFO BLOCKS ========
function createMiniInfo(items) {
  const div = document.createElement("div");
  div.className = "mini-info";
  items.forEach(i => {
    const block = document.createElement("div");
    block.innerHTML = `<strong>${i.label}</strong><br>${i.value}`;
    div.appendChild(block);
  });
  return div;
}

// ======== CARDS POPULATION FUNCTION ========
function initCard(id, title, chartLabels, chartValues, chartColors, miniItems, modalContent) {
  const card = document.getElementById(id);
  card.innerHTML = `<h3>${title}</h3><div class="chart-container"></div>`;
  card.querySelector(".chart-container").appendChild(
    createDonutChart(id, chartLabels, chartValues, chartColors)
  );
  card.appendChild(createMiniInfo(miniItems));
  card.addEventListener("click", () => openModal(title, modalContent));
}

// ======== EXISTING CARDS ========

// Tenant card
initCard(
  "tenant","Tenant Overview",
  ["Licensed","Guests","Unassigned"],
  [data.tenant.licensed,data.tenant.guests,data.tenant.users - data.tenant.licensed - data.tenant.guests],
  ["#0078d4","#d83b01","#666"],
  [
    {label:"Total Users", value:data.tenant.users},
    {label:"Licensed", value:data.tenant.licensed},
    {label:"Guests", value:data.tenant.guests}
  ],
  `<p>Tenant: ${data.tenant.name}</p><p>Total Users: ${data.tenant.users}</p>`
);

// Users
initCard(
  "users","Users",
  ["Licensed","Guests","Unassigned"],
  [data.users.licensed,data.users.guests,data.users.total - data.users.licensed - data.users.guests],
  ["#107c10","#d83b01","#666"],
  [
    {label:"Total Users", value:data.users.total},
    {label:"Licensed", value:data.users.licensed},
    {label:"Guests", value:data.users.guests}
  ],
  `<p>Total: ${data.users.total}<br>Licensed: ${data.users.licensed}<br>Guests: ${data.users.guests}</p>`
);

// Licenses
initCard(
  "licenses","Licenses",
  ["Business Premium","E3","Unassigned"],
  [data.licenses.businessPremium,data.licenses.e3,data.licenses.unassigned],
  ["#0078d4","#107c10","#666"],
  [
    {label:"Business Premium", value:data.licenses.businessPremium},
    {label:"E3", value:data.licenses.e3},
    {label:"Unassigned", value:data.licenses.unassigned}
  ],
  `<button onclick="alert('Assign License')">Assign License</button>`
);

// Security
initCard(
  "security","Security",
  ["MFA Enabled","Admin MFA","Risky Sign-ins"],
  [data.security.mfaEnabledPercent,data.security.adminMfa,data.security.riskySignins],
  ["#d83b01","#a80000","#666"],
  [
    {label:"MFA %", value:data.security.mfaEnabledPercent},
    {label:"Admin MFA", value:data.security.adminMfa},
    {label:"Risky Sign-ins", value:data.security.riskySignins}
  ],
  `<p>MFA Enabled: ${data.security.mfaEnabledPercent}%<br>Admin MFA: ${data.security.adminMfa}<br>Risky Sign-ins: ${data.security.riskySignins}</p>`
);

// Conditional Access
initCard(
  "conditionalAccess","Conditional Access",
  ["Enabled Policies","Report-only"],
  [data.conditionalAccess.policiesEnabled,data.conditionalAccess.reportOnly],
  ["#0078d4","#666"],
  [
    {label:"Enabled", value:data.conditionalAccess.policiesEnabled},
    {label:"Report-only", value:data.conditionalAccess.reportOnly}
  ],
  `<p>Last Risky Sign-in: ${data.conditionalAccess.lastRiskySignin}</p>`
);

// Service Health
initCard(
  "services","Service Health",
  ["Healthy","Warning","Issues"],
  [3,1,0],
  ["#107c10","#d83b01","#a80000"],
  [
    {label:"Exchange", value:data.services.exchange},
    {label:"Teams", value:data.services.teams},
    {label:"OneDrive", value:data.services.onedrive}
  ],
  `<p>Service health overview</p>`
);

// ======== NEW CARDS ========

// Patching Card
const patchCard = document.createElement("div");
patchCard.className = "card orange clickable";
patchCard.innerHTML = "<h3>Patching</h3><div class='chart-container'></div>";
patchCard.querySelector(".chart-container").appendChild(
  createDonutChart("patch", ["Deployed","Pending"], [data.patching.deployed, data.patching.pending], ["#107c10","#d83b01"])
);
patchCard.appendChild(createMiniInfo([
  {label:"Deployed", value:data.patching.deployed},
  {label:"Pending", value:data.patching.pending}
]));
patchCard.addEventListener("click", () => openModal("Patching Options", `
  <p>Latest Patch: Feb 5, 2026</p>
  <button onclick="alert('Deploy Patch')">Deploy Patch</button>
  <button onclick="alert('Schedule Patch')">Schedule Patch</button>
  <button onclick="alert('View Patch History')">View Patch History</button>
`));
document.querySelector(".grid").appendChild(patchCard);

// Mailflow Card
const mailCard = document.createElement("div");
mailCard.className = "card blue clickable";
mailCard.innerHTML = "<h3>Mailflow</h3><div class='chart-container'></div>";
mailCard.querySelector(".chart-container").appendChild(
  createDonutChart("mailflow", ["Delivered","Failed","Pending"], [data.mailflow.delivered,data.mailflow.failed,data.mailflow.pending], ["#107c10","#a80000","#d83b01"])
);
mailCard.appendChild(createMiniInfo([
  {label:"Delivered", value:data.mailflow.delivered},
  {label:"Failed", value:data.mailflow.failed},
  {label:"Pending", value:data.mailflow.pending}
]));
mailCard.addEventListener("click", () => openModal("Mailflow Details", `<p>Email traffic overview</p>`));
document.querySelector(".grid").appendChild(mailCard);

// Device Compliance Card
const deviceCard = document.createElement("div");
deviceCard.className = "card green clickable";
deviceCard.innerHTML = "<h3>Device Compliance</h3><div class='chart-container'></div>";
deviceCard.querySelector(".chart-container").appendChild(
  createDonutChart("devices", ["Compliant","Non-Compliant"], [data.devices.compliant,data.devices.nonCompliant], ["#107c10","#a80000"])
);
deviceCard.appendChild(createMiniInfo([
  {label:"Compliant", value:data.devices.compliant},
  {label:"Non-Compliant", value:data.devices.nonCompliant}
]));
deviceCard.addEventListener("click", () => openModal("Device Compliance Details", `<p>Device compliance summary</p>`));
document.querySelector(".grid").appendChild(deviceCard);
