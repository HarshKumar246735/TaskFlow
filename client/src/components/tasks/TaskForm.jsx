import { useEffect, useState } from "react";

const DEFAULT_FORM = {
  title: "",
  description: "",
  category: "",
  priority: "Medium",
  status: "To Do",
  dueDate: "",
  dueTime: "",
  repeat: "No repeat",
  tags: "",
  subtasks: [],
};

export default function TaskForm({
  initial = {},
  categories = [],
  onSubmit,
  submitText = "Save Task",
}) {
  const [f, setF] = useState(() => ({
    ...DEFAULT_FORM,
    ...initial,
  }));

  const [sub, setSub] = useState("");

  const initialId = initial?._id || initial?.id || null;

  useEffect(() => {
    if (!initialId) return;

    setF({
      ...DEFAULT_FORM,
      ...initial,
    });
  }, [initialId]);

  const set = (key, value) => {
    setF((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const addSub = () => {
    const value = sub.trim();

    if (!value) return;

    setF((current) => ({
      ...current,
      subtasks: [
        ...(current.subtasks || []),
        {
          title: value,
          completed: false,
        },
      ],
    }));

    setSub("");
  };

  const removeSub = (index) => {
    setF((current) => ({
      ...current,
      subtasks: (current.subtasks || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...f,
      tags:
        typeof f.tags === "string"
          ? f.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : f.tags,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <label>
        Title

        <input
          required
          value={f.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Complete React project"
        />
      </label>

      <label>
        Description

        <textarea
          rows="5"
          value={f.description}
          onChange={(e) =>
            set("description", e.target.value)
          }
        />
      </label>

      <div className="form-grid">
        <label>
          Category

          <select
            value={f.category?._id || f.category || ""}
            onChange={(e) =>
              set("category", e.target.value)
            }
          >
            <option value="">Select category</option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Priority

          <select
            value={f.priority}
            onChange={(e) =>
              set("priority", e.target.value)
            }
          >
            {["Low", "Medium", "High", "Urgent"].map(
              (priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          Status

          <select
            value={f.status}
            onChange={(e) =>
              set("status", e.target.value)
            }
          >
            {["To Do", "In Progress", "Completed"].map(
              (status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          Due date

          <input
            type="date"
            value={
              f.dueDate
                ? String(f.dueDate).slice(0, 10)
                : ""
            }
            onChange={(e) =>
              set("dueDate", e.target.value)
            }
          />
        </label>

        <label>
          Due time

          <input
            type="time"
            value={f.dueTime || ""}
            onChange={(e) =>
              set("dueTime", e.target.value)
            }
          />
        </label>

        <label>
          Repeat

          <select
            value={f.repeat}
            onChange={(e) =>
              set("repeat", e.target.value)
            }
          >
            {[
              "No repeat",
              "Daily",
              "Weekly",
              "Monthly",
              "Custom",
            ].map((repeat) => (
              <option key={repeat} value={repeat}>
                {repeat}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Tags{" "}
        <span className="hint">
          comma separated
        </span>

        <input
          value={
            Array.isArray(f.tags)
              ? f.tags.join(", ")
              : f.tags
          }
          onChange={(e) =>
            set("tags", e.target.value)
          }
          placeholder="react, interview, urgent"
        />
      </label>

      <div>
        <div className="section-label">Subtasks</div>

        <div className="inline">
          <input
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            placeholder="Add a subtask"
          />

          <button
            type="button"
            className="btn secondary"
            onClick={addSub}
          >
            Add
          </button>
        </div>

        <div className="subtask-list">
          {(f.subtasks || []).map((item, index) => (
            <div key={index}>
              {item.title}

              <button
                type="button"
                onClick={() => removeSub(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn primary"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}