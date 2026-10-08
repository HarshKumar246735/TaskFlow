import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pin, Archive } from "lucide-react";

import AppLayout from "../../components/layout/AppLayout";
import {
  getNotes,
  pinNote,
  archiveNote,
} from "../../services/noteService";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const response = await getNotes();

      setNotes(response.data.data || []);
    } catch (error) {
      console.error("Failed to load notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchNotes = async () => {
      try {
        const response = await getNotes();

        if (mounted) {
          setNotes(response.data.data || []);
        }
      } catch (error) {
        console.error("Failed to load notes:", error);

        if (mounted) {
          setNotes([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchNotes();

    return () => {
      mounted = false;
    };
  }, []);

  const handlePin = async (id) => {
    try {
      await pinNote(id);
      await load();
    } catch (error) {
      console.error("Failed to pin note:", error);
    }
  };

  const handleArchive = async (id) => {
    try {
      await archiveNote(id);
      await load();
    } catch (error) {
      console.error("Failed to archive note:", error);
    }
  };

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="eyebrow">Knowledge</p>

          <h1>Notes</h1>

          <p className="muted">
            Keep ideas, references and learning in one place.
          </p>
        </div>

        <Link
          className="btn primary"
          to="/notes/create"
        >
          <Plus size={17} />
          New note
        </Link>
      </div>

      {loading ? (
        <div className="empty">
          Loading notes...
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <article
              className="note-card"
              key={note._id}
            >
              <div className="note-actions">
                <button
                  type="button"
                  onClick={() =>
                    handlePin(note._id)
                  }
                  title="Pin note"
                >
                  <Pin size={16} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleArchive(note._id)
                  }
                  title="Archive note"
                >
                  <Archive size={16} />
                </button>
              </div>

              <Link to={`/notes/${note._id}`}>
                <h3>{note.title}</h3>

                <p>
                  {note.content?.slice(0, 150)}
                </p>
              </Link>

              <div className="chips">
                {(note.tags || []).map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <small>
                Updated{" "}
                {new Date(
                  note.updatedAt
                ).toLocaleDateString()}
              </small>
            </article>
          ))}

          {!notes.length && (
            <div className="empty">
              No notes yet.
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}