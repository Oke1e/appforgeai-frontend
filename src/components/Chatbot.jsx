import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatUI from "./ChatUI"; // Import the UI component

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [appType, setAppType] = useState(null);
  const [category, setCategory] = useState("");

  // 🔥 Hardcoded backend URL to ensure Vercel uses the correct one
  const backendUrl = "https://appforgeai-backend.onrender.com";
  console.log("🚀 Using Backend API URL:", backendUrl);

  // ✅ Load chat history from local storage
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // ✅ Save chat history to local storage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // ✅ Clear chat history when the user starts a new session
  useEffect(() => {
    const clearChatOnReload = () => {
      localStorage.removeItem("chatMessages");
    };
    window.addEventListener("beforeunload", clearChatOnReload);
    return () => window.removeEventListener("beforeunload", clearChatOnReload);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      console.log("📡 Sending request to:", `${backendUrl}/api/chat`);
      const response = await axios.post(
        `${backendUrl}/api/chat`,
        {
          message: input,
          appType: appType,
          category: category,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("✅ Response from backend:", response.data);
      setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("❌ Axios error:", error);
    }

    setLoading(false);
  };

  return (
    <ChatUI
      messages={messages}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
      loading={loading}
      appType={appType}
      setAppType={setAppType}
      category={category}
      setCategory={setCategory}
    />
  );
};

export default Chatbot;
