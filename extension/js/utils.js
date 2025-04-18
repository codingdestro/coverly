let isExists = false;
const createAlert = (message, target) => {
  if (isExists) return;

  const element = document.createElement("p");
  element.classList.add("alert");
  element.innerText = message;
  $(target).append(element);
  isExists = true;
  setTimeout(() => {
    $(".alert").remove();
    isExists = false;
  }, 2000);
};

$(".logout-btn").on("click", () => {
  chrome.storage.local.set({ token: "" });
  $("#form").toggleClass("hidden");
  $("#main").toggleClass("hidden");
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

$(".copy-btn").on("click", () => {
  const content = $("pre").text();
  if (!content) return;
  copyToClipboard(content);
  $(".copy-btn").text("copied!");
  setTimeout(() => {
    $(".copy-btn").text("copy");
  }, 1000);
});
