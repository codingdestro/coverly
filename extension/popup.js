// Configure axios defaults
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common["Content-Type"] = "application/json";
const userLogin = document.getElementById("user-login");
const userSignup = document.getElementById("user-signup");

const signupButton = document.getElementById("signup");
const signupToggle = document.getElementById("signup-toggle");
const loginToggle = document.getElementById("login-toggle");

userLogin.style.display = "none";
userSignup.style.display = "none";

//authen the user on first load
(async () => {
  try {
    const { token } = await chrome.storage.local.get("token");
    const response = await axios.post(
      "/api/authenticate",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.user) {
      chrome.storage.local.set({
        user: response.data.user,
      });
      userLogin.style.display = "none";
    } else {
      chrome.storage.local.remove("user");
      userLogin.style.display = "flex";
    }
  } catch (error) {
    console.log("Failed to authenticate user:", error);
    chrome.storage.local.remove("user");
    userLogin.style.display = "flex";
  }
})();

//login button
const loginButton = document.getElementById("login");

loginButton.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await axios.post("/api/login", { email, password });

    if (response.data) {
      chrome.storage.local.set({
        token: response.data.token,
      });
      chrome.storage.local.set({
        token: response.data.token,
        user: response.data.user,
      });
      userLogin.style.display = "none";
    } else {
      console.log("Login failed:", response.data.message);
    }
  } catch (error) {
    console.log("Login error:", error);
  }
});

//login toggle

loginToggle.addEventListener("click", () => {
  userLogin.style.display = "none";
  userSignup.style.display = "flex";
});

//signup toggle

signupToggle.addEventListener("click", () => {
  userLogin.style.display = "flex";
  userSignup.style.display = "none";
});

//signup button

signupButton.addEventListener("click", async () => {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) {
    alert("Please fill all the fields");
    return;
  }

  try {
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
    });

    if (response.data.user) {
      console.log("Registration successful:", response.data.user);
      chrome.storage.local.set({
        user: response.data.user,
        token: response.data.token,
      });
      // Switch back to login view
      userSignup.style.display = "none";
      userLogin.style.display = "none";
      // You can add success message display here
    } else {
      console.log("Registration failed:", response.data.message);
      // You can add error message display here
    }
  } catch (error) {
    console.log("Registration error:", error);
  }
});
