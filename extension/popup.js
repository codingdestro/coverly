const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
const currentUrl = URL.parse(tab.url);
const linkedinUrl = URL.parse(
  "https://www.linkedin.com/jobs/collections/recommended/"
);
if (
  currentUrl.pathname == linkedinUrl.pathname &&
  currentUrl.host == linkedinUrl.host
)
  console.log("we can get job description...");
else console.log("we can not get job description...");

auth()

//handling login form


$(".switch-btn").on("click", () => {
  $("#form").toggleClass("hidden");
  $("#main").toggleClass("hidden");
});

// jobs-description__content jobs-description-content

const items = [];

const url = "https://www.linkedin.com/jobs/collections/recommended/";
chrome.scripting.executeScript({
  target: { tabId: tab.id },
  func: () => {
    const elements = document.querySelector(".jobs-description-content");
    const arr = [""];
    function traverseDOM(element, callback) {
      if (!element) return;

      // Run the callback on the current element
      function stripHTMLTagsFromArray(str) {
        return str.replace(/<[^>]*>/g, "").trim();
      }
      let x = stripHTMLTagsFromArray(element.innerHTML);
      if (x) if (arr.length > 0 && arr[arr.length - 1] != x) arr.push(x);

      // Traverse child nodes (recursive)
      for (let i = 0; i < element.children.length; i++) {
        traverseDOM(element.children[i], callback);
      }
    }
    traverseDOM(elements);
  },
});
