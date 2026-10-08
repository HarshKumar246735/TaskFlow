import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import {
  getNote,
  updateNote,
} from "../../services/noteService";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchNote = async () => {
      try {
        setLoading(true);

        const response = await getNote(id);

        if (mounted) {
          setForm(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load note:", error);

        if (mounted) {
          setForm(null);
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

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form) {
      return;
    }

    try {
      setSaving(true);

      await updateNote(id, {
        ...form,
        tags: Array.isArray(form.tags)
          ? form.tags
          : form.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
      });

      navigate(`/notes/${id}`);
    } catch (error) {
      console.error("Failed to update note:", error);
    } finally {
      setSaving(false);
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

  if (!form) {
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
      <div className="page-head">
        <div>
          <p className="eyebrow">Knowledge</p>
          <h1>Edit note</h1>
        </div>
      </div>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        <label>
          Title

          <input
            required
            value={form.title || ""}
            onChange={(e) =>
              handleChange(
                "title",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Content

          <textarea
            required
            rows="16"
            value={form.content || ""}
            onChange={(e) =>
              handleChange(
                "content",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Tags

          <input
            value={
              Array.isArray(form.tags)
                ? form.tags.join(", ")
                : form.tags || ""
            }
            onChange={(e) =>
              handleChange(
                "tags",
                e.target.value
              )
            }
            placeholder="react, javascript, learning"
          />
        </label>

        <button
          type="submit"
          className="btn primary"
          disabled={saving}
        >
          {saving ? "Updating..." : "Update note"}
        </button>
      </form>
    </AppLayout>
  );
}