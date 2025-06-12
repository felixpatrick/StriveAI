const chatThreadContainer = document.querySelector(".chat-thread__container");
const messageBoxEl = document.querySelector(".chat-message");
const messageInputEl = document.querySelector("#messageInput");
const messageFormEl = document.querySelector(".messageBox");
const chatHistory = [];

const API_KEY = "AIzaSyDtUV61WATKU7nOQ3ONDrkHjPvAz9DCjG4";
const myAPI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Templates
const createUserMessage = (text) => `
  <div class="chat-message__row chat-message__row--reversed">
    <div class="chat-message__content chat-message__content--alt">
      <h2 class="chat-message__sender">You</h2>
      <p class="chat-message__text">${text}</p>
    </div>
    <img src="./images/favour.png" alt="User avatar" class="chat-message__avatar" />
  </div>
`;

const createAIMessageContainer = () => `
  <div class="chat-message__row ai-chat-message-row">
    <img src="./images/favour.png" alt="AI avatar" class="chat-message__avatar" />
    <div class="chat-message__content">
      <h2 class="chat-message__sender">Favour</h2>
      <p class="chat-message__text"></p>
    </div>
  </div>
`;

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

// Typing animation
const typeText = (el, text, delay = 30) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;
      index++;
    } else {
      clearInterval(interval);
    }
  }, delay);
};

// Helper to scroll to the bottom
const scrollToBottom = () => {
  chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;
};

// AI response function
const fetchAIResponse = async (userInput) => {
  chatHistory.push({
    role: "user",
    parts: [{ text: userInput }],
  });

  try {
    const response = await fetch(myAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatHistory }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    const aiText =
      data.candidates[0].content.parts[0].text ||
      "I'm not sure how to respond to that.";
    return aiText.replace(/\*\*(.*?)\*\*/g, "$1").trim();
  } catch (error) {
    console.error("API Error:", error);
    return "Sorry, something went wrong.";
  }
};

// Main handler
const handleUserInput = async (e) => {
  e.preventDefault();

  const userInput = messageInputEl.value.trim();
  if (!userInput) return;

  // Hide chat-box elements (if needed)
  document.querySelectorAll(".chat-box").forEach((item) => {
    item.style.display = "none";
  });

  // Show user's message
  messageBoxEl.insertAdjacentHTML("beforeend", createUserMessage(userInput));
  scrollToBottom();
  messageInputEl.value = "";

  // Show skeleton loader
  messageBoxEl.insertAdjacentHTML("beforeend", skeletonLoaderHTML);
  scrollToBottom();

  // Get AI response
  const aiReply = await fetchAIResponse(userInput);

  // Remove loader
  const skeleton = document.querySelector("#skeletonLoader");
  if (skeleton) skeleton.remove();

  // Add empty AI message container
  messageBoxEl.insertAdjacentHTML("beforeend", createAIMessageContainer());
  const lastAITextEl = messageBoxEl.querySelector(
    ".chat-message__row.ai-chat-message-row:last-child .chat-message__text"
  );

  // Animate typing
  typeText(lastAITextEl, aiReply);
  scrollToBottom();
};

messageFormEl.addEventListener("submit", handleUserInput);
