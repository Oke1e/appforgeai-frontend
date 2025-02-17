import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// Function to send messages to backend
export const sendMessageToBackend = async (message, appType, category) => {
  try {
    const response = await axios.post(`${backendUrl}/api/chat`, {
      message,
      appType,
      category,
    });
    return response.data.reply;
  } catch (error) {
    console.error("Error sending message:", error);
    return "There was an error connecting to the backend.";
  }
};
