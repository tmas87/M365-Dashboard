// =========================
// HEADER: last sync + location
// =========================
async function updateHeader() {
  const now = new Date().toLocaleString();
  document.getElementById("lastSync").textContent = `Last Sync: ${now}`;

  let locationText = "Unavailable";
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    locationText = `${data.city}, ${data.country_name}`;
  } catch(e){ console.log("Location fetch failed", e); }
  document.getElementById("location").textContent = `Location: ${locationText}`;
}
updateHeader();

// =========================
// TENANT
// =========================
document.getElementById("tenant").innerHTML = `
<h3><i class="fas fa-building"></i> Tenant Info</h3>
<p>tmas87.onmicrosoft.com</p>
`;

// =========================
// USERS
// =========================
document.getElementById("users").innerHTML = `
<h3><i class="fas fa-users"></i> Users</h3>
<div class="mini-row">
  <div class="mini"><i class="fas fa-circle text-green"></i> Online: 84</div>
  <div class="mini"><i class="fas fa-circle text-red"></i> Offline: 36</div>
  <div class="mini">Guests: 10</div>
</div>
<p>Total Users: 120</p>
`;

// =========================
// LICENSES
// =========================
document.getElementById("licenses").innerHTML = `
<h3><i class="fas fa-id-badge"></i> Licensing</h3>
<div class="chart-container"><canvas id="licenseChart"></canvas></div>
<div class="mini-row">
  <div class="mini" id="bp">Business Premium: 60</div>
  <div class="mini" id="e3">E3: 38</div>
  <div class="mini" id="ua">Unassigned: 22</div>
</div>
<button onclick="assignLicense('Business Premium',1)">Assign BP</button>
<button onclick="assignLicense('E3',1)">Assign E3</button>
`;

const licenseChart = new Chart(document.getElementById("licenseChart"), {
  type: "doughnut",
  data: { labels:["Business Premium","E3","Unassigned"], datasets:[{data:[60,38,22], backgroundColor:["#0078d4","#107c10","#d83b01"]}]},
  options: { plugins:{legend:{display:false}}, maintainAspectRatio:true, aspectRatio:1 }
});

function assignLicense(type, amount=1){
  let bp = parseInt(document.getElementById("bp").textContent.split(":")[1]);
  let e3 = parseInt(document.getElementById("e3").textContent.split(":")[1]);
  let ua = parseInt(document.getElementById("ua").textContent.split(":")[1]);

  if(type==="Business Premium"){ bp+=amount; ua-=amount; }
  if(type==="E3"){ e3+=amount; ua-=amount; }

  document.getElementById("bp").textContent = `Business Premium: ${bp}`;
  document.getElementById("e3").textContent = `E3: ${e3}`;
  document.getElementById("ua").textContent = `Unassigned: ${ua}`;

  licenseChart.data.datasets[0].data = [bp,e3,ua];
  licenseChart.update();
}

// =========================
// SECURITY
// =========================
document.getElementById("security").innerHTML = `
<h3><i class="fas fa-shield-alt"></i> Security</h3>
<div class="chart-container"><canvas id="securityChart"></canvas></div>
<div class="mini-row">
  <div class="mini">MFA Enabled: 92%</div>
  <div class="mini">Admin MFA: 100%</div>
  <div class="mini">Risky Sign-ins: 5</div>
  <div class="mini">Blocked Sign-ins: 2</div>
</div>
<button onclick="alert('Run Security Report!')">Run Security Report</button>
`;

const securityChart = new Chart(document.getElementById("securityChart"), {
  type:"doughnut",
  data:{ labels:["MFA Enabled","No MFA"], datasets:[{data:[92,8], backgroundColor:["#107c10","#a80000"]}]},
  options:{ plugins:{legend:{display:false}}, maintainAspectRatio:true, aspectRatio:1 }
});

// =========================
// CONDITIONAL ACCESS
// =========================
document.getElementById("conditionalAccess").innerHTML = `
<h3><i class="fas fa-user-shield"></i> Conditional Access</h3>
<div class="mini-row">
  <div class="mini">Policies Enabled: 5</div>
  <div class="mini">Report Only: 2</div>
  <div class="mini">Last Risky Sign-in: Today</div>
</div>
`;

// =========================
// SERVICE HEALTH
// =========================
document.getElementById("services").innerHTML = `
<h3><i class="fas fa-server"></i> Service Health</h3>
<div class="mini-row">
  <div class="mini"><i class="fab fa-windows"></i> Exchange ✔</div>
  <div class="mini"><i class="fab fa-windows"></i> Teams ✔</div>
  <div class="mini"><i class="fab fa-windows"></i> SharePoint ✔</div>
  <div class="mini"><i class="fab fa-windows"></i> OneDrive ✔</div>
</div>
`;

// =========================
// VULNERABILITIES
// =========================
document.getElementById("vulnerabilities").innerHTML = `
<h3><i class="fas fa-exclamation-triangle"></i> Vulnerabilities</h3>
<div class="chart-container"><canvas id="vulnChart"></canvas></div>
<div class="mini-row">
  <div class="mini text-red">Critical: 1</div>
  <div class="mini text-red">High: 3</div>
  <div class="mini">Medium: 6</div>
  <div class="mini">Low: 12</div>
</div>
`;

const vulnChart = new Chart(document.getElementById("vulnChart"), {
  type:"bar",
  data:{ labels:["Critical","High","Medium","Low"], datasets:[{data:[1,3,6,12], backgroundColor:["#a80000","#d83b01","#f5a623","#107c10"]}]},
  options:{plugins:{legend:{display:false}}}
});

// =========================
// RISK REGISTER
// =========================
document.getElementById("riskRegister").innerHTML = `
<h3><i class="fas fa-exclamation-circle"></i> Risk Register</h3>
<div class="mini-row">
  <div class="mini text-red">High: 2</div>
  <div class="mini">Medium: 4</div>
  <div class="mini">Low: 7</div>
</div>
<button onclick="alert('Open Risk Register Details')">View Details</button>
`;

// =========================
// PATCHING
// =========================
document.getElementById("patching").innerHTML = `
<h3><i class="fas fa-tools"></i> Patching</h3>
<div class="mini-row">
  <div class="mini">Servers Compliant: 92%</div>
  <div class="mini">Endpoints Compliant: 88%</div>
</div>
<button onclick="alert('Open Patching Options')">Manage Patching</button>
`;

// =========================
// MAIL FLOW
// =========================
document.getElementById("mailflow").innerHTML = `
<h3><i class="fas fa-envelope"></i> Mail Flow</h3>
<div class="mini-row">
  <div class="mini">Inbound: OK</div>
  <div class="mini">Outbound: OK</div>
</div>
<button onclick="alert('Open Mail Flow Details')">View Details</button>
`;

// =========================
// DEVICE COMPLIANCE
// =========================
document.getElementById("deviceCompliance").innerHTML = `
<h3><i class="fas fa-mobile-alt"></i> Device Compliance</h3>
<div class="mini-row">
  <div class="mini">Compliant: 102</div>
  <div class="mini text-red">Non-compliant: 18</div>
</div>
<button onclick="alert('Open Device Compliance')">View Details</button>
`;

// =========================
// MODAL
// =========================
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
document.querySelectorAll(".clickable").forEach(card=>{
  card.onclick = () => {
    modalBody.innerHTML = card.innerHTML;
    modal.style.display = "block";
  };
});
document.getElementById("modalClose").onclick = () => { modal.style.display = "none"; };

// =========================
// DARK/LIGHT MODE
// =========================
document.getElementById("themeToggle").onclick = () => { 
  document.body.classList.toggle("dark"); 
  document.body.classList.toggle("light"); 
};
