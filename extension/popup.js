const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
const currentUrl = URL.parse(tab.url);
const linkedinUrl = URL.parse(
  "https://www.linkedin.com/jobs/collections/recommended/"
);
const canGetJobDescription =
  currentUrl.pathname == linkedinUrl.pathname &&
  currentUrl.host == linkedinUrl.host;

auth();

$(".switch-btn").on("click", () => {
  $("#form").toggleClass("hidden");
  $("#main").toggleClass("hidden");
});

const getJobDescription = () => {
  chrome.scripting
    .executeScript({
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
        return arr.join("");
      },
    })
    .then((e) => {
      $("pre").text(e[0].result);
    });
};
// const url = "https://www.linkedin.com/jobs/collections/recommended/";
$("#getDescription").on("click", () => {
  if (!canGetJobDescription) return;
  getJobDescription();
});

let isloading = false;

$("#coverletter-btn").on("click", async () => {
  if (isloading) {
    return;
  }
  const jobDescription = $("pre").text();
  const token = await chrome.storage.local.get(["token"]);
  if (!jobDescription || !token) return;

  try {
    isloading = true;
    $("#coverletter-btn").addClass("state-loading")
    const res = await $.ajax({
      url: "http://localhost:3000/api/deepseek/coverletter",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ jobDescription: jobDescription }),
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (!res.coverLetter) return;
    $("pre").text(res.coverLetter);
  } catch {
    createAlert("failed to generate coverletter!", "main");
  } finally {
    isloading = false;
  }
});
