import type { Note } from "../types/note";

interface NoteEditorProps {
  note: Note;
  onUpdate: (id: string, updatedData: Partial<Note>) => void;
  onDelete: (id: string) => void;
}

function Noteeditor({ note, onUpdate }: NoteEditorProps) {
  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    onUpdate(note.id, {
      title: event.target.value,
    });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    onUpdate(note.id, {
      content: event.target.value,
    });
  };

  return (
    <div className="note-editor">
      {/* Editor Header */}
      <div className="editor-header">
        <input
          className="title-input"
          type="text"
          value={note.title}
          onChange={handleTitleChange}
          placeholder="Note title"
        />
      </div>

      {/* Note Content */}
      <textarea
        className="content-input"
        value={note.content}
        onChange={handleContentChange}
        placeholder="Start writing..."
      />
    </div>
  );
}

export default Noteeditor;
