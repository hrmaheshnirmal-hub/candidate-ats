// LOGIN
function login() {
  if (user.value === "admin" && pass.value === "admin") {
    localStorage.setItem("login", "true");
    location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

function logout() {
  localStorage.removeItem("login");
  location.href = "index.html";
}

if (location.pathname.includes("dashboard") && !localStorage.getItem("login")) {
  location.href = "index.html";
}

// ATS DATA
let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

function addCandidate() {
  const reader = new FileReader();
  const file = resume.files[0];

  reader.onload = () => {
    candidates.push({
      name: name.value,
      skills: skills.value,
      status: status.value,
      resume: reader.result
    });

    localStorage.setItem("candidates", JSON.stringify(candidates));
    render();
  };

  if (file) reader.readAsDataURL(file);
}

function render() {
  list.innerHTML = "";
  const searchText = search.value.toLowerCase();

  candidates
    .filter(c => c.name.toLowerCase().includes(searchText))
    .forEach(c => {
      list.innerHTML += `
        <tr>
          <td>${c.name}</td>
          <td>${c.skills}</td>
          <td>${c.status}</td>
          <td><a href="${c.resume}" target="_blank">View</a></td>
        </tr>`;
    });

  total.innerText = candidates.length;
}

function exportExcel() {
  let csv = "Name,Skills,Status\n";
  candidates.forEach(c => {
    csv += `${c.name},${c.skills},${c.status}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ATS-Candidates.csv";
  a.click();
}

render();
