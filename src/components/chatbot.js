import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [appType, setAppType] = useState(null);
  const [category, setCategory] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "https://appforgeai-backend.onrender.com";
console.log("Backend API URL being used:", backendUrl);


  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(`${backendUrl}/api/chat`, {
        message: input,
        appType: appType,
        category: category,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
    
      setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Axios error:", error);
    }
    
      

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-2 text-center">AI App Generator</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Choose App Category:</label>
        <select
          className="w-full p-2 border rounded mt-2"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="">Select a category</option>
          <option value="finance">Finance</option>
          <option value="cooking">Cooking</option>
          <option value="technology">Technology</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Choose App Type:</label>
        <select
          className="w-full p-2 border rounded mt-2"
          onChange={(e) => setAppType(e.target.value)}
          value={appType}
        >
          <option value="">Select an app type</option>
          <option value="html-css-js">Basic HTML/CSS/JS</option>
          <option value="react-fastapi">React + FastAPI</option>
        </select>
      </div>
      <div className="h-96 overflow-y-auto border p-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your app idea..."
        />
        <button
          onClick={sendMessage}
          disabled={loading || !appType}
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};


export default Chatbot;
