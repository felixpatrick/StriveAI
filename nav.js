const timeNow = new Date();
const dateNow = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });
const time = timeNow.toLocaleTimeString();

// Update time display
document.querySelector(".current-time").textContent =
  " " + dateNow.format(timeNow);

function updateTime() {
  const greetingElement = document.querySelector(".greeting-message");
  const hour = timeNow.getHours();

  if (hour >= 5 && hour < 12) {
    greetingElement.textContent = "Good Morning,";
  } else if (hour >= 12 && hour < 17) {
    greetingElement.textContent = "Good Afternoon,";
  } else {
    greetingElement.textContent = "Good Evening,";
  }
}

// Display username from local storage
export function displayUserName() {
  const userName = localStorage.getItem("userName") || "Guest";
  document.querySelector(".username").textContent = userName;
}

updateTime();
