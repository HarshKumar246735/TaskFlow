import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import { createNote } from "../../services/noteService";

export default function CreateNote() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Please enter a note title.");
      return;
    }

    if (!form.content.trim()) {
      setError("Please enter some content.");
      return;
    }

    try {
      setSaving(true);

      await createNote({
        title: form.title.trim(),
        content: form.content,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      navigate("/notes");
    } catch (err) {
      console.error("Failed to create note:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create note. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="eyebrow">Notes</p>
          <h1>Create note</h1>
          <p className="muted">
            Capture ideas, references and important information.
          </p>
        </div>
      </div>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <label>
          Title

          <input
            required
            value={form.title}
            onChange={(e) =>
              handleChange(
                "title",
                e.target.value
              )
            }
            placeholder="e.g. React interview notes"
          />
        </label>

        <label>
          Content

          <textarea
            required
            rows="16"
            value={form.content}
            onChange={(e) =>
              handleChange(
                "content",
                e.target.value
              )
            }
            placeholder="Write your note here..."
          />
        </label>

        <label>
          Tags

          <input
            value={form.tags}
            onChange={(e) =>
              handleChange(
                "tags",
                e.target.value
              )
            }
            placeholder="react, interview, javascript"
          />

          <span className="hint">
            Separate tags with commas.
          </span>
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="btn secondary"
            onClick={() => navigate("/notes")}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn primary"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save note"}
          </button>
        </div>
      </form>
    </AppLayout>
  );
}