// ---------------- LOGIN ----------------
function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "admin") {
    localStorage.setItem("login", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid username or password");
  }
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

if (window.location.pathname.includes("dashboard") && !localStorage.getItem("login")) {
  window.location.href = "index.html";
}

// ---------------- DATA ----------------
let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

// ---------------- ADD CANDIDATE ----------------
function addCandidate() {
  const candidate = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    skills: document.getElementById("skills").value.trim(),
    exp: document.getElementById("exp").value.trim(),
    ctc: document.getElementById("ctc").value.trim(),
    notice: document.getElementById("notice").value.trim(),
    status: document.getElementById("status").value,
    resume: ""
  };

  if (!candidate.name || !candidate.skills) {
    alert("Candidate Name and Skills are required");
    return;
  }

  const resumeInput = document.getElementById("resume");

  // Resume optional
  if (resumeInput.files.length === 0) {
    saveCandidate(candidate);
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    candidate.resume = reader.result;
    saveCandidate(candidate);
  };
  reader.readAsDataURL(resumeInput.files[0]);
}

function saveCandidate(candidate) {
  candidates.push(candidate);
  localStorage.setItem("candidates", JSON.stringify(candidates));
  clearForm();
  render();
}

// ---------------- RENDER ----------------
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
          <td>${c.resume ? `<a href="${c.resume}" target="_blank">View</a>` : "-"}</td>
        </tr>
      `;
    });

  total.innerText = candidates.length;
}

// ---------------- CLEAR FORM ----------------
function clearForm() {
  document.querySelectorAll(".form-box input").forEach(i => i.value = "");
}

// ---------------- EXPORT ----------------
function exportExcel() {
  let csv = "Name,Email,Phone,Skills,Experience,CTC,Notice,Status\n";
  candidates.forEach(c => {
    csv += `${c.name},${c.email},${c.phone},${c.skills},${c.exp},${c.ctc},${c.notice},${c.status}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Candidates.csv";
  link.click();
}

render();
