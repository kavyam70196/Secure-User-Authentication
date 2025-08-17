// Switch page
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  clearMessages();
}

// Clear messages
function clearMessages() {
  document.getElementById("registerMsg").innerText = "";
  document.getElementById("loginMsg").innerText = "";
}

// Register
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if username already exists
  if (users.find(u => u.username === username)) {
    document.getElementById("registerMsg").innerText = "❌ Username already exists!";
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("registerMsg").innerText = "✅ Successfully Registered!";
  document.getElementById("registerForm").reset(); // clear fields
});

// Login
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", username);
    document.getElementById("user").innerText = username;
    document.getElementById("loginForm").reset(); // clear fields
    showPage("homePage");
  } else {
    document.getElementById("loginMsg").innerText = "❌ Invalid username or password!";
  }
});

// Forgot Password
function forgotPassword() {
  const username = prompt("Enter your registered username:");
  if (!username) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username);

  if (user) {
    alert(`✅ Your password is: ${user.password}`);
  } else {
    alert("❌ Username not found!");
  }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  showPage("loginPage");
});

// Auto-login if session exists
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
  document.getElementById("user").innerText = loggedInUser;
  showPage("homePage");
}
