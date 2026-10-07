import Noteitem from "../components/Noteitem";
import type { Note } from "../types/note";

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onAddNote: () => void;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

function Sidebar({
  notes,
  selectedNoteId,
  onAddNote,
  onSelectNote,
  onDeleteNote,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h1 className="w3-text-deep-purple">My Notes</h1>

        <button className="add-note-btn" onClick={onAddNote}>
          + New Note
        </button>
      </div>

      {/* Notes */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="no-notes">No notes yet</div>
        ) : (
          notes.map((note) => (
            <Noteitem
              key={note.id}
              note={note}
              selected={note.id === selectedNoteId}
              onSelect={onSelectNote}
              onDelete={onDeleteNote}
            />
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
