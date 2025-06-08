const buttonEl = document.querySelector("button");
const userInputEl = document.querySelector(".username-input");

buttonEl.addEventListener("click", (event) => {
  event.preventDefault();

  const userName = userInputEl.value.trim();
  if (userName) {
    localStorage.setItem("userName", userName);
    window.location.href = "./welcome.html";
  } else {
    alert("Please enter your name.");
  }
});
