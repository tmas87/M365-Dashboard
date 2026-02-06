// ==================== HEADER ====================
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

// ==================== TENANT CARD ====================
document.getElementById("tenant").innerHTML = `
<h3><i class="fas fa-building"></i> Tenant Info</h3>
<p>tmas87.onmicrosoft.com</p>
<div class="mini-row">
  <div class="mini"><i class="fas fa-circle text-green"></i> Active</div>
  <div class="mini"><i class="fas fa-users"></i> 120 Users</div>
  <div class="mini"><i class="fas fa-server"></i> 4 Services</div>
</div>`;

// ==================== USERS CARD ====================
document.getElementById("users").innerHTML = `
<h3><i class="fas fa-users"></i> Users</h3>
<div class="mini-row">
  <div class="mini"><i class="fas fa-circle text-green"></i> Online: 84</div>
  <div class="mini"><i class="fas fa-circle text-red"></i> Offline: 36</div>
  <div class="mini">Guests: 10</div>
</div>
<div class="chart-container"><canvas id="usersChart"></canvas></div>
<p>Total Users: 120</p>
`;

new Chart(document.getElementById("usersChart"),{
  type:"doughnut",
  data:{labels:["Online","Offline"], datasets:[{data:[84,36], backgroundColor:["#107c10","#a80000"]}]},
  options:{plugins:{legend:{display:false}}, maintainAspectRatio:true, aspectRatio:1}
});

// ==================== LICENSES CARD ====================
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

const licenseChart = new Chart(document.getElementById("licenseChart"),{
  type:"doughnut",
  data:{labels:["Business Premium","E3","Unassigned"], datasets:[{data:[60,38,22], backgroundColor:["#0078d4","#107c10","#d83b01"]}]},
  options:{plugins:{legend:{display:false}}, maintainAspectRatio:true, aspectRatio:1}
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

// ==================== SECURITY CARD ====================
document.getElementById("security").innerHTML = `
<h3><i class="fas fa-shield-alt"></i> Security</h3>
<div class="chart-container"><canvas id="securityChart"></canvas></div>
<div class="mini-row">
  <div class="mini">MFA Enabled: 92%</div>
  <div class="mini">Admin MFA: 100%</div>
  <div class="mini">Risky Sign-ins: 5</div>
  <div class="mini">Blocked Sign-ins: 2</div>
</div>
<button onclick="alert('Run Security Report')">Run Report</button>
`;

new Chart(document.getElementById("securityChart"),{
  type:"doughnut",
  data:{labels:["MFA Enabled","No MFA"], datasets:[{data:[92,8], backgroundColor:["#107c10","#a80000"]}]},
  options:{plugins:{legend:{display:false}}, maintainAspectRatio:true, aspectRatio:1}
});

// ==================== CONDITIONAL ACCESS ====================
document.getElementById("conditionalAccess").innerHTML = `
<h3><i class="fas fa-lock"></i> Conditional Access</h3>
<div class="mini-row">
  <div class="mini">Enabled Policies: 5</div>
  <div class="mini">Report-only: 2</div>
  <div class="mini">Last Risky Sign-in: 2026-02-05</div>
</div>`;

// ==================== SERVICES ====================
document.getElementById("services").innerHTML = `
<h3><i class="fas fa-server"></i> Service Health</h3>
<div class="mini-row">
  <div class="mini"><i class="fas fa-envelope"></i> Exchange ✔</div>
  <div class="mini"><i class="fas fa-comments"></i> Teams ✔</div>
  <div class="mini"><i class="fas fa-share-square"></i> SharePoint ✔</div>
  <div class="mini"><i class="fas fa-cloud"></i> OneDrive ✔</div>
</div>`;

// ==================== VULNERABILITIES ====================
let vulnerabilitiesData = [
  {name:"CVE-2026-001", severity:"Critical", system:"Server01", status:"Open"},
  {name:"CVE-2026-002", severity:"High", system:"PC-42", status:"Open"},
  {name:"CVE-2026-003", severity:"Medium", system:"Server02", status:"Open"},
];

document.getElementById("vulnerabilities").innerHTML = `
<h3><i class="fas fa-bug"></i> Vulnerabilities</h3>
<div class="chart-container"><canvas id="vulnChart"></canvas></div>
`;

const vulnChart = new Chart(document.getElementById("vulnChart"),{
  type:"bar",
  data:{labels:["Critical","High","Medium","Low"], datasets:[{data:[0,0,0,0], backgroundColor:"#a80000"}]},
  options:{plugins:{legend:{display:false}}, maintainAspectRatio:true, aspectRatio:1}
});

function updateVulnChart(){
  const counts={Critical:0,High:0,Medium:0,Low:0};
  vulnerabilitiesData.forEach(v=>{ if(v.status!=="Resolved") counts[v.severity]++; });
  vulnChart.data.datasets[0].data=[counts.Critical,counts.High,counts.Medium,counts.Low];
  vulnChart.update();
}
updateVulnChart();

function markVulnResolved(i){
  vulnerabilitiesData[i].status="Resolved";
  document.getElementById(`vuln-status-${i}`).textContent="Resolved";
  updateVulnChart();
}

// ==================== RISK REGISTER ====================
let riskData = [
  {risk:"Data Breach", severity:"High", owner:"IT Sec", status:"Open"},
  {risk:"Phishing Attack", severity:"Medium", owner:"Helpdesk", status:"Open"},
  {risk:"Unauthorized Access", severity:"Low", owner:"Admin", status:"Open"},
];

document.getElementById("riskRegister").innerHTML = `
<h3><i class="fas fa-exclamation-triangle"></i> Risk Register</h3>
<div class="mini-row">
  <div class="mini text-red">High: ${riskData.filter(r=>r.severity==="High").length}</div>
  <div class="mini text-orange">Medium: ${riskData.filter(r=>r.severity==="Medium").length}</div>
  <div class="mini text-green">Low: ${riskData.filter(r=>r.severity==="Low").length}</div>
</div>`;

// ==================== PATCHING ====================
document.getElementById("patching").innerHTML = `
<h3><i class="fas fa-tools"></i> Patching</h3>
<div class="mini-row">
  <div class="mini">Servers compliant: 92%</div>
  <div class="mini">Endpoints compliant: 88%</div>
</div>
<button onclick="alert('Open Patching Options')">More Options</button>`;

// ==================== MAILFLOW ====================
document.getElementById("mailflow").innerHTML = `
<h3><i class="fas fa-envelope"></i> Mail Flow</h3>
<div class="mini-row">
  <div class="mini">Inbound: OK</div>
  <div class="mini">Outbound: OK</div>
</div>`;

// ==================== DEVICE COMPLIANCE ====================
document.getElementById("deviceCompliance").innerHTML = `
<h3><i class="fas fa-mobile-alt"></i> Device Compliance</h3>
<div class="mini-row">
  <div class="mini text-green">Compliant: 102</div>
  <div class="mini text-red">Non-compliant: 18</div>
</div>`;

// ==================== MODAL & CLICKABLE ====================
const modal=document.getElementById("modal");
const modalBody=document.getElementById("modalBody");

document.querySelectorAll(".clickable").forEach(card=>{
  card.onclick=()=>{
    if(card.id==="vulnerabilities"){
      let html=`<h3>Detailed Vulnerabilities</h3><table border="1" style="width:100%;text-align:left;"><tr><th>Name</th><th>Severity</th><th>System</th><th>Status</th><th>Action</th></tr>`;
      vulnerabilitiesData.forEach((v,i)=>{
        html+=`<tr>
          <td>${v.name}</td>
          <td>${v.severity}</td>
          <td>${v.system}</td>
          <td id="vuln-status-${i}">${v.status}</td>
          <td><button onclick="markVulnResolved(${i})">Mark Resolved</button></td>
        </tr>`;
      });
      html+=`</table>`;
      modalBody.innerHTML=html;
    } else if(card.id==="riskRegister"){
      let html=`<h3>Risk Register Details</h3><table border="1" style="width:100%;text-align:left;"><tr><th>Risk</th><th>Severity</th><th>Owner</th><th>Status</th><th>Action</th></tr>`;
      riskData.forEach((r,i)=>{
        html+=`<tr>
          <td>${r.risk}</td>
          <td>${r.severity}</td>
          <td>${r.owner}</td>
          <td id="risk-status-${i}">${r.status}</td>
          <td><button onclick="closeRisk(${i})">Close</button></td>
        </tr>`;
      });
      html+=`</table>`;
      modalBody.innerHTML=html;
    } else { modalBody.innerHTML=card.innerHTML; }
    modal.style.display="block";
  }
