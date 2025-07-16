import React, { useState } from "react";

const colors = ["#f28b82", "#d7aefb", "#fdd663", "#a7ffeb", "#c8e6c9"];

function NoteForm({ onAddNote }) {
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddNote(text, selectedColor);
    setText("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your note here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="color-picker">
        {colors.map((color) => (
          <span
            key={color}
            className={`color-circle ${
              selectedColor === color ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          >
            {selectedColor === color ? "✔" : ""}
          </span>
        ))}
      </div>

      <button type="submit">ADD</button>
    </form>
  );
}

export default NoteForm;
