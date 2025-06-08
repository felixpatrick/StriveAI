function updateTime() {
  const timeNow = new Date();
  const dateNow = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });
  const time = timeNow.toLocaleTimeString();
  const userName = localStorage.getItem("userName") || "Guest";
  document.querySelector(".username").textContent = userName;

  document.querySelector(".current-time").textContent =
    " " + dateNow.format(timeNow);

  // Set greeting based on time of day
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
updateTime();
