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
