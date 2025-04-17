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

//Auth the user
const auth = () => {
  chrome.storage.local.get(["authToken"]).then((token) => {
    if (token?.key) console.log("auth toekn", token.key);
    else console.log("no auth token found!");
  });
};

//POST -> create cover letter according to job description
const login = async () => {};
