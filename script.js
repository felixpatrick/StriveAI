const chatThreadContainer = document.querySelector(".chat-thread__container");
const messageBoxEl = document.querySelector(".chat-message");
const messageInputEl = document.querySelector("#messageInput");
const messageFormEl = document.querySelector(".messageBox");

const skeletonLoaderHTML = `
  <div class="chat-message__row chat-skeleton" id="skeletonLoader">
    <div class="chat-message__avatar skeleton-avatar"></div>
    <div class="skeleton-message">
      <div class="skeleton-line short"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
  </div>
`;
const handleUserInput = (event) => {
  event.preventDefault();

  const userInput = messageInputEl.value.trim();
  if (!userInput) return;

  //   hide chat history block
  if (messageBoxEl) {
    document.querySelectorAll(".chat-box").forEach((item) => {
      item.style.display = "none";
    });
  }

  const messageHTML = `
      <div class="chat-message__row chat-message__row--reversed">
        <div class="chat-message__content chat-message__content--alt">
          <h2 class="chat-message__sender">You</h2>
          <p class="chat-message__text">${userInput}</p>
        </div>
        <img src="./images/favour.png" alt="User avatar" class="chat-message__avatar" />
      </div>
    `;

  messageBoxEl.insertAdjacentHTML("beforeend", messageHTML);
  messageInputEl.value = "";

  // Scroll to bottom
  chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;

  // Add skeleton
  messageBoxEl.insertAdjacentHTML("beforeend", skeletonLoaderHTML);
  chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;

  setTimeout(() => {
    const skeletonEl = document.querySelector("#skeletonLoader");
    if (skeletonEl) skeletonEl.remove();

    const aiMessageHTML = `
        <div class="chat-message__row ai-chat-message-row">
          <div class="chat-message__content">
            <p class="chat-message__text">Just a moment....</p>
          </div>
        </div>
      `;
    messageBoxEl.insertAdjacentHTML("beforeend", aiMessageHTML);

    // Scroll to bottom again after AI response
    chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;
  }, 1200);

  if (messageBoxEl) {
    document.querySelectorAll(".chat-box").forEach((item) => {
      item.style.display = none;
    });
  }
};

messageFormEl.addEventListener("submit", handleUserInput);
