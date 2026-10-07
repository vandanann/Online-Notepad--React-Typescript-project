import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import type { Note } from "./types/note";
import "./App.css";

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const savedNotes = localStorage.getItem("react-notes");

      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error("Unable to load notes:", error);
      return [];
    }
  });

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  /*
   * Save notes whenever notes change
   */
  useEffect(() => {
    localStorage.setItem("react-notes", JSON.stringify(notes));
  }, [notes]);

  /*
   * Create a new note
   */
  const addNote = (): void => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((previousNotes) => [...previousNotes, newNote]);

    setSelectedNoteId(newNote.id);
  };

  /*
   * Update existing note
   */
  const updateNote = (id: string, updatedData: Partial<Note>): void => {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updatedData,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  };

  /*
   * Delete note
   */
  const deleteNote = (id: string): void => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);

    if (selectedNoteId === id) {
      if (updatedNotes.length > 0) {
        setSelectedNoteId(updatedNotes[0].id);
      } else {
        setSelectedNoteId(null);
      }
    }
  };

  /*
   * Find selected note
   */
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <div className="app">
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onAddNote={addNote}
        onSelectNote={setSelectedNoteId}
        onDeleteNote={deleteNote}
      />

      <main className="editor-area">
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        ) : (
          <div className="empty-editor">
            <h2>React Notepad</h2>

            <p>Create a new note to get started.</p>

            <button onClick={addNote}>+ Create Note</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
