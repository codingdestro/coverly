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
    .then(([e]) => $("pre").text(e.result));
};

$("#coverletter-btn").on("click", async () => {
  if ($("#coverletter-btn").hasClass("state-loading")) {
    return;
  }
  const jobDescription = $("pre").text();
  const token = await chrome.storage.local.get(["token"]);
  if (!jobDescription || !token) return;

  try {
    $("#coverletter-btn").addClass("state-loading");
    const res = await $.ajax({
      url: "http://localhost:3000/api/deepseek/resume",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ jobDescription: jobDescription }),
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (!res.template) return;
    $("pre").text(res.template);
  } catch {
    createAlert("failed to generate coverletter!", "main");
  } finally {
    isloading = false;
    $("#coverletter-btn").removeClass("state-loading");
  }
});

// const url = "https://www.linkedin.com/jobs/collections/recommended/";
$("#getDescription").on("click", () => {
  if (!canGetJobDescription) return;
  getJobDescription();
});

//build resume

$("#resume-btn").on("click", async () => {
  if ($("#resume-btn").hasClass("state-loading")) return;
  const { token } = await chrome.storage.local.get(["token"]);
  if (!token) return;
  $("#resume-btn").addClass("state-loading");
  const res = await $.ajax({
    url: "http://localhost:3000/api/deepseek/resume",
    type: "POST",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  $("#resume-btn").removeClass("state-loading");
  console.log(res);
});

$("#resume-download-btn").on("click", async () => {
  if ($("#resume-download-btn").hasClass("state-loading")) return;
  const { token } = await chrome.storage.local.get(["token"]);
  const fileId = "1da147ea-15a2-452a-aa52-20ca13843a1c";
  if (!token || !fileId) return;
  $("#resume-download-btn").addClass("state-loading");
  const res = await $.ajax({
    url: "http://localhost:3000/api/documents/download",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      fileId,
    }),
    xhrFields: {
      responseType: "blob", // very important
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blob = new Blob([res], { type: "application/pdf" });

  const url = URL.createObjectURL(blob);

  const x = await chrome.downloads.download({
    url: url,
    filename: "your_file_name.pdf",
    saveAs: true,
  });
  $("#resume-download-btn").removeClass("state-loading");
});
