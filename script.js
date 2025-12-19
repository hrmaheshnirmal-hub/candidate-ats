// ---------------- LOGIN ----------------
function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "admin") {
    localStorage.setItem("login", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

if (window.location.pathname.includes("dashboard") && !localStorage.getItem("login")) {
  window.location.href = "index.html";
}

// ---------------- ATS DATA ----------------
let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

// ---------------- ADD CANDIDATE ----------------
function addCandidate() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const skills = document.getElementById("skills").value.trim();
  const exp = document.getElementById("exp").value.trim();
  const ctc = document.getElementById("ctc").value.trim();
  const notice = document.getElementById("notice").value.trim();
  const status = document.getElementById("status").value;
  const resumeInput = document.getElementById("resume");

  if (!name || !skills) {
    alert("Name and Skills are required");
    return;
  }

  // Resume optional
  if (resumeInput.files.length === 0) {
    saveCandidateData("");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    saveCandidateData(reader.result);
  };
  reader.readAsDataURL(resumeInput.files[0]);
}

function saveCandidateData(resumeData) {
  const candidate = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    skills: document.getElementById("skills").value,
    exp: document.getElementById("exp").value,
    ctc: document.getElementById("ctc").value,
    notice: document.getElementById("notice").value,
    status: document.getElementById("status").value,
    resume: resumeData
  };

  candidates.push(candidate);
  localStorage.setItem("candidates", JSON.stringify(candidates));

  clearForm();
  render();
}

// ---------------- RENDER LIST ----------------
function render() {
  const list = document.getElementById("list");
  const search = document.getElementById("search").value.toLowerCase();
  const total = document.getElementById("total");

  list.innerHTML = "";

  candidates
    .filter(c => c.name.toLowerCase().includes(search))
    .forEach(c => {
      list.innerHTML += `
        <tr>
          <td>${c.name}</td>
          <td>${c.skills}</td>
          <td>${c.status}</td>
          <td>${c.resume ? `<a href="${c.resume}" target="_blank">View</a>` : "—"}</td>
        </tr>
      `;
    });

  if (total) total.innerText = candidates.length;
}

// ---------------- CLEAR FORM ----------------
function clearForm() {
  document.querySelectorAll("input").forEach(i => i.value = "");
}

// ---------------- EXPORT EXCEL ----------------
function exportExcel() {
  let csv = "Name,Email,Phone,Skills,Experience,CTC,Notice,Status\n";
  candidates.forEach(c => {
    csv += `${c.name},${c.email},${c.phone},${c.skills},${c.exp},${c.ctc},${c.notice},${c.status}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ATS-Candidates.csv";
  link.click();
}

render();
