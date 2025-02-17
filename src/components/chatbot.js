import React, { useState } from "react";
import { sendMessageToBackend } from "../api";
import CategorySelect from "./CategorySelect";
import AppTypeSelect from "./AppTypeSelect";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [appType, setAppType] = useState("");
  const [category, setCategory] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const reply = await sendMessageToBackend(input, appType, category);
    setMessages([...newMessages, { text: reply, sender: "bot" }]);

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-2 text-center">AI App Generator</h2>
      
      <CategorySelect category={category} setCategory={setCategory} />
      <AppTypeSelect appType={appType} setAppType={setAppType} />

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
