// import { displayUserName } from "./nav";

const displayName = () => {
  const userNameContainer = document.querySelector(".username-contain");

  const userName = localStorage.getItem("userName") || "Guest";

  userNameContainer.textContent = userName[0].toUpperCase() + userName.slice(1);
};

displayName();

const chatBoxes = document.querySelectorAll(".chat-content");

const limitChatText = () => {
  chatBoxes.forEach((box) => {
    const text = box.innerText;
    if (text.length > 100) {
      box.innerText = text.slice(0, 99) + "...";
    }
  });
};

limitChatText();
