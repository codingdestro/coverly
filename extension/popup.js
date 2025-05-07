// Get the currently active tab
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
const currentUrl = URL.parse(tab.url);
const linkedinUrl = URL.parse(
  "https://www.linkedin.com/jobs/collections/recommended/"
);

// Check if we're on the LinkedIn jobs page
const canGetJobDescription =
  currentUrl.pathname == linkedinUrl.pathname &&
  currentUrl.host == linkedinUrl.host;
if (!canGetJobDescription) {
  $("html").addClass("hidden");
}

// Initialize authentication
auth();

// Store the current file ID for resume downloads
let currentFileId = "";

// Toggle between documents and main view
$(".switch-btn").on("click", () => {
  $("#documents").toggleClass("hidden");
  $("#main").toggleClass("hidden");
});

// Function to extract job description from LinkedIn page
const getJobDescription = () => {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: () => {
        const elements = document.querySelector(".jobs-description-content");
        const arr = [""];
        
        // Helper function to traverse DOM and extract text content
        function traverseDOM(element, callback) {
          if (!element) return;

          // Strip HTML tags and clean text
          function stripHTMLTagsFromArray(str) {
            return str.replace(/<[^>]*>/g, "").trim();
          }
          let x = stripHTMLTagsFromArray(element.innerHTML);
          if (x) if (arr.length > 0 && arr[arr.length - 1] != x) arr.push(x);

          // Recursively process child elements
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

// Generate cover letter based on job description
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
      url: "http://localhost:3000/api/deepseek/coverletter",
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
    $("#coverletter-btn").removeClass("state-loading");
  } finally {
    $("#coverletter-btn").removeClass("state-loading");
  }
});

// Get job description from LinkedIn page
$("#getDescription").on("click", () => {
  if (!canGetJobDescription) return;
  getJobDescription();
});

// Generate resume using AI
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
  if (res.fileId) {
    currentFileId = res.fileId;
  }
  $("#resume-btn").removeClass("state-loading");
});

// Download generated resume
$("#resume-download-btn").on("click", async () => {
  if (!currentFileId) return;
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
      fileId: currentFileId,
    }),
    xhrFields: {
      responseType: "blob", // Set response type to blob for file download
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blob = new Blob([res], { type: "application/pdf" });

  const url = URL.createObjectURL(blob);

  // Trigger file download using Chrome's download API
  await chrome.downloads.download({
    url: url,
    filename: "your_file_name.pdf",
    saveAs: true,
  });
  $("#resume-download-btn").removeClass("state-loading");
});
