// Flag to track if an alert is currently displayed
let isExists = false;

/**
 * Creates and displays a temporary alert message
 * @param {string} message - The message to display
 * @param {string} target - The CSS selector where the alert should be appended
 */
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

// Handle logout button click - clears token and toggles form/page visibility
$(".logout-btn").on("click", () => {
  chrome.storage.local.set({ token: "" });
  $("#form").toggleClass("hidden");
  $("#page").toggleClass("hidden");
});

/**
 * Copies text to the clipboard
 * @param {string} text - The text to copy
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// Handle copy button click - copies pre element content and shows feedback
$(".copy-btn").on("click", () => {
  const content = $("pre").text();
  if (!content) return;
  copyToClipboard(content);
  $(".copy-btn").text("copied!");
  setTimeout(() => {
    $(".copy-btn").text("copy");
  }, 1000);
});
