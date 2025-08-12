/* ========================================= */
/* Gemini Chat Integration                   */
/* ========================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAI, getGenerativeModel, GoogleAIBackend } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-ai.js";

document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAYp61nOu9s1zhEUwpt9LUrP11XznTlrVg",
    authDomain: "fir-8f104.firebaseapp.com",
    projectId: "fir-8f104",
    storageBucket: "fir-8f104.firebasestorage.app",
    messagingSenderId: "961741261147",
    appId: "1:961741261147:web:9674981ac519ab5a17b27e",
    measurementId: "G-F1WJF82VXZ",
  };

  const app = initializeApp(firebaseConfig);
  const ai = getAI(app, { backend: new GoogleAIBackend() });
  const model = getGenerativeModel(ai, { model: "gemini-1.5-flash" });

  // Khởi tạo cuộc trò chuyện với Gemini
  const chat = model.startChat({
    history: [],
  });

  // --- Lấy các phần tử từ DOM ---
  const chatToggleBtn = document.getElementById("chat-toggle-btn");
  const geminiChatContainer = document.getElementById("gemini-chat-container");
  const closeChatBtn = document.getElementById("close-chat-btn");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  // --- Xử lý sự kiện mở/đóng chat box ---
  chatToggleBtn.addEventListener("click", () => {
    geminiChatContainer.classList.toggle("hidden");
  });

  closeChatBtn.addEventListener("click", () => {
    geminiChatContainer.classList.add("hidden");
  });

  // --- Hàm hiển thị tin nhắn trong giao diện chat ---
  function displayMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.classList.add(
      sender === "user" ? "user-message" : "bot-message"
    );

    const avatarElement = document.createElement("span");
    avatarElement.classList.add("avatar");
    avatarElement.textContent = sender === "user" ? "👤" : "🤖";

    const contentElement = document.createElement("p");
    contentElement.textContent = text;

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(contentElement);
    chatMessages.appendChild(messageElement);

    // Tự động cuộn xuống tin nhắn mới nhất
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // --- Hàm gửi tin nhắn và nhận phản hồi từ Gemini ---
  async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    // Hiển thị tin nhắn của người dùng
    displayMessage("user", userMessage);
    chatInput.value = "";

    try {
      // Hiển thị trạng thái đang gõ của bot
      displayMessage("bot", "Đang nghĩ...");
      const botThinkingMessage = chatMessages.lastElementChild;

      // Gửi tin nhắn đến Gemini
      const result = await chat.sendMessage(userMessage);
      const botResponse = result.response.text();

      // Xóa trạng thái đang gõ và hiển thị câu trả lời
      chatMessages.removeChild(botThinkingMessage);
      displayMessage("bot", botResponse);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      displayMessage("bot", "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  }

  // --- Xử lý sự kiện gửi tin nhắn ---
  sendBtn.addEventListener("click", sendMessage);

  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});
