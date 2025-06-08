// import { displayUserName } from "./nav";

const displayName = () => {
  const userNameContainer = document.querySelector(".username-contain");

  const userName = localStorage.getItem("userName") || "Guest";

  userNameContainer.textContent = userName[0].toUpperCase() + userName.slice(1);
};

displayName();
