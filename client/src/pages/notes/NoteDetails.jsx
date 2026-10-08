import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import {
  getNote,
  deleteNote,
  pinNote,
  archiveNote,
} from "../../services/noteService";

export default function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const response = await getNote(id);
      setNote(response.data.data);
    } catch (error) {
      console.error("Failed to load note:", error);
      setNote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchNote = async () => {
      try {
        setLoading(true);

        const response = await getNote(id);

        if (mounted) {
          setNote(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load note:", error);

        if (mounted) {
          setNote(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchNote();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  const handlePin = async () => {
    try {
      await pinNote(id);
      await load();
    } catch (error) {
      console.error("Failed to pin note:", error);
    }
  };

  const handleArchive = async () => {
    try {
      await archiveNote(id);
      navigate("/notes");
    } catch (error) {
      console.error("Failed to archive note:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this note?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteNote(id);
      navigate("/notes");
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="empty">
          Loading…
        </div>
      </AppLayout>
    );
  }

  if (!note) {
    return (
      <AppLayout>
        <div className="empty">
          Note not found.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <article className="detail-card note-detail">
        <div className="detail-actions">
          <Link
            className="btn secondary"
            to={`/notes/${id}/edit`}
          >
            Edit
          </Link>

          <button
            type="button"
            className="btn secondary"
            onClick={handlePin}
          >
            Pin
          </button>

          <button
            type="button"
            className="btn secondary"
            onClick={handleArchive}
          >
            Archive
          </button>

          <button
            type="button"
            className="btn danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>

        <h1>{note.title}</h1>

        <div className="note-content">
          {note.content}
        </div>

        <div className="chips">
          {(note.tags || []).map((tag) => (
            <span key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </article>
    </AppLayout>
  );
}