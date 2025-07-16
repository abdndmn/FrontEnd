import React from "react";
import Note from "./Note";

function NoteList({ notes }) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Note key={note.id} text={note.text} color={note.color} />
      ))}
    </div>
  );
}

export default NoteList;
