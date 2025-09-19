// public/js/login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect based on role
      switch (data.user.role_id) {
        case 1:
          window.location.href = "../a-dashboard.html";
          break;
        case 2:
          window.location.href = "../m-dashboard.html";
          break;
        default:
          console.warn("Unknown role ID:", data.user.role_id);
          window.location.href = "../dashboard.html";
          break;
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  });
});

