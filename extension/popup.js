//handling login form
$("form").on("submit", (e) => {
  e.preventDefault();
  const elements = $("form").children("input");
  console.log({
    email: elements[0],
    password: elements[1],
  });
});

$(".switch-btn").on("click", () => {
  $("#form").toggleClass("hidden");
  $("#main").toggleClass("hidden");
});

// const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
// chrome.scripting.executeScript(
//   {
//     target: { tabId: tab.id },
//     func: (tagName) => {
//       const elements = document.querySelectorAll(tagName);
//       return Array.from(elements).map((el) => el.outerHTML);
//     },
//     args: [tag],
//   },
//   (results) => {
//     const output = results[0].result.join("\n\n");
//     document.getElementById("output").textContent = output;
//   }
// );
