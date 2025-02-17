import React from "react";

const CategorySelect = ({ category, setCategory }) => {
  return (
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
  );
};

export default CategorySelect;
