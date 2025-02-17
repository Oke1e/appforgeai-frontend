import React from "react";

const ChatUI = ({ messages, input, setInput, sendMessage, loading, appType, setAppType, category, setCategory }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">AI App Generator</h2>
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold">Choose App Category:</label>
        <select
          className="w-full p-3 border rounded-lg mt-2 bg-white shadow-md"
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
        <label className="block text-gray-800 font-semibold">Choose App Type:</label>
        <select
          className="w-full p-3 border rounded-lg mt-2 bg-white shadow-md"
          onChange={(e) => setAppType(e.target.value)}
          value={appType}
        >
          <option value="">Select an app type</option>
          <option value="html-css-js">Basic HTML/CSS/JS</option>
          <option value="react-fastapi">React + FastAPI</option>
        </select>
      </div>
      <div className="h-96 overflow-y-auto border p-4 bg-white shadow-md rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-3 p-3 rounded-lg text-sm ${msg.sender === "user" ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-left"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your app idea..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !appType}
          className="ml-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
