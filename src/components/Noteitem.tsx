import type { Note } from "../types/note";

interface NoteItemProps {
  note: Note;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function Noteitem({ note, selected, onSelect, onDelete }: NoteItemProps) {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();

    onDelete(note.id);
  };

  return (
    <div
      className={`note-item ${selected ? "active" : ""}`}
      onClick={() => onSelect(note.id)}
    >
      <div className="note-info">
        <h3>{note.title || "Untitled Note"}</h3>

        <p>{note.content ? note.content.substring(0, 50) : "Empty note"}</p>
      </div>

      <button className="delete-btn" onClick={handleDelete} title="Delete note">
        ×
      </button>
    </div>
  );
}

export default Noteitem;
