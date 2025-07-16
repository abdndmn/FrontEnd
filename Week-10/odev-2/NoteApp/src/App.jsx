import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addNote = (text, color) => {
    const newNote = {
      id: Date.now(),
      text,
      color,
    };
    setNotes([newNote, ...notes]);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>NotesApp</h1>
      <input
        type="text"
        placeholder="Search..."
        className="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <NoteForm onAddNote={addNote} />
      <NoteList notes={filteredNotes} />
    </div>
  );
}

export default App;
