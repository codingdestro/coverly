// Handle form submission for user login
$("form").on("submit", (e) => {
  e.preventDefault();
  // Get form input elements
  const elements = $("form").children("input");
  const user = {
    email: elements[0].value,
    password: elements[1].value,
  };

  // Validate form inputs
  if (!user.email || !user.password) {
    createAlert("please fill email and password!","form");
    return;
  }

  // Send login request to the server
  $.ajax({
    url: "http://localhost:3000/api/ext/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: function (res) {
      if (!res.token) {
        createAlert(res.error, "form");
        return;
      }
      // Store authentication token in chrome storage
      chrome.storage.local.set({ token: res.token });
      // Show main page and hide login form
      $("#form").addClass("hidden");
      $("#page").removeClass("hidden");
    },
    error: function (error) {
      createAlert("failed to login!", "form");
    },
  });
});

// Function to check authentication status and validate token
const auth = () => {
  // Retrieve stored token from chrome storage
  chrome.storage.local.get(["token"]).then((token) => {
    if (token?.token) {
      console.log("auth token", token.token);
      // Validate token with the server
      $.ajax({
        url: "http://localhost:3000/api/ext/authenticate",
        type: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        success: function (res) {
          // Update token and show main page if authentication is successful
          chrome.storage.local.set({ token: res.token });
          $("#form").addClass("hidden");
          $("#page").removeClass("hidden");
        },
        error: function (error) {
          // Show login form if authentication fails
          $("#form").removeClass("hidden");
          $("#page").addClass("hidden");
        },
      });
    } else {
      // Show login form if no token exists
      $("#form").removeClass("hidden");
      $("#page").addClass("hidden");
    }
  });
};
