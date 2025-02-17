import React from "react";

const AppTypeSelect = ({ appType, setAppType }) => {
  return (
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
  );
};

export default AppTypeSelect;
