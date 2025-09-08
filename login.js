const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

// Login Validation
document.getElementById("loginForm").addEventListener("submit", function(e) {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (username.length < 3) {
        alert("Username must be at least 3 characters long.");
        e.preventDefault();
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        e.preventDefault();
    }
});

// Register Validation
document.getElementById("registerForm").addEventListener("submit", function(e) {
    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (username.length < 3) {
        alert("Username must be at least 3 characters long.");
        e.preventDefault();
    }
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        e.preventDefault();
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        e.preventDefault();
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        e.preventDefault();
    }
});