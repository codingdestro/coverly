$("form").on("submit", (e) => {
  e.preventDefault();
  const elements = $("form").children("input");
  const user = {
    email: elements[0].value,
    password: elements[1].value,
  };

  if (!user.email && !user.password) {
    createAlert("please fill email and password!");
    return;
  }
  $.ajax({
    url: "http://localhost:3000/api/ext/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),
    success: function (res) {
      if (!res.token) {
        createAlert(res.error, "form");
        return
      }
      chrome.storage.local.set({ token: res.token });
      $("#form").addClass("hidden");
      $("#main").removeClass("hidden");
    },
    error: function (error) {
      createAlert("failed to login!", "form");
    },
  });
});

const auth = () => {
  chrome.storage.local.get(["token"]).then((token) => {
    if (token?.token) {
      console.log("auth token", token.token);
      $.ajax({
        url: "http://localhost:3000/api/ext/authenticate",
        type: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        success: function (res) {
          chrome.storage.local.set({ token: res.token });
          $("#form").addClass("hidden");
          $("#main").removeClass("hidden");
        },
        error: function (error) {
          $("#form").removeClass("hidden");
          $("#main").addClass("hidden");
        },
      });
    } else {
      $("#form").removeClass("hidden");
      $("#main").addClass("hidden");
    }
  });
};
