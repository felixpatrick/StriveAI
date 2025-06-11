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
function openChat() {
  const workspace = document.querySelector(".workspace-container");
  const chatThread = document.querySelector(".chat-thread");

  workspace.classList.add("hidden");
  chatThread.classList.remove("hidden");
}

// // Optional: Add a back button or logic to go back to history
// function showChatHistory() {
//   const workspace = document.querySelector(".workspace-container");
//   const chatThread = document.querySelector(".chat-thread");

//   chatThread.classList.add("hidden");
//   workspace.classList.remove("hidden");
// }

// openChat();
