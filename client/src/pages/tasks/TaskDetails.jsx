import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import AppLayout from "../../components/layout/AppLayout";
import {
  getTask,
  deleteTask,
  completeTask,
} from "../../services/taskService";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTask = async () => {
    try {
      const response = await getTask(id);

      setTask(response.data.data);
    } catch (error) {
      console.error(
        "Failed to load task:",
        error
      );
      setTask(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchTask = async () => {
      try {
        setLoading(true);

        const response = await getTask(id);

        if (mounted) {
          setTask(response.data.data);
        }
      } catch (error) {
        console.error(
          "Failed to load task:",
          error
        );

        if (mounted) {
          setTask(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchTask();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);
      navigate("/tasks");
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error
      );
    }
  };

  const handleComplete = async () => {
    try {
      await completeTask(id);
      await loadTask();
    } catch (error) {
      console.error(
        "Failed to update task:",
        error
      );
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

  if (!task) {
    return (
      <AppLayout>
        <div className="empty">
          Task not found.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link className="back" to="/tasks">
        <ArrowLeft size={16} />
        Back to tasks
      </Link>

      <article className="detail-card">
        <div className="detail-head">
          <div>
            <span
              className={`priority ${(
                task.priority || "Medium"
              ).toLowerCase()}`}
            >
              {task.priority}
            </span>

            <h1>{task.title}</h1>

            <p>
              {task.description ||
                "No description provided."}
            </p>
          </div>

          <div className="detail-actions">
            <Link
              className="btn secondary"
              to={`/tasks/${id}/edit`}
            >
              Edit
            </Link>

            <button
              type="button"
              className="btn danger"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="detail-grid">
          <div>
            <b>Status</b>
            <span>{task.status}</span>
          </div>

          <div>
            <b>Category</b>
            <span>
              {task.category?.name ||
                "Uncategorized"}
            </span>
          </div>

          <div>
            <b>Due</b>
            <span>
              {task.dueDate
                ? new Date(
                    task.dueDate
                  ).toLocaleDateString()
                : "No due date"}{" "}
              {task.dueTime || ""}
            </span>
          </div>

          <div>
            <b>Tags</b>
            <span>
              {(task.tags || []).join(", ") ||
                "None"}
            </span>
          </div>
        </div>

        <div className="subtasks">
          <h3>Subtasks</h3>

          {(task.subtasks || []).map(
            (subtask, index) => (
              <div
                key={subtask._id || index}
                className="sub-row"
              >
                <span>
                  {subtask.completed
                    ? "✓"
                    : "○"}
                </span>

                {subtask.title}
              </div>
            )
          )}

          {task.subtasks?.length > 0 && (
            <small>
              {
                task.subtasks.filter(
                  (item) => item.completed
                ).length
              }{" "}
              / {task.subtasks.length} completed
            </small>
          )}

          {!task.subtasks?.length && (
            <small>
              No subtasks added.
            </small>
          )}
        </div>

        <button
          type="button"
          className="btn primary"
          onClick={handleComplete}
        >
          <CheckCircle2 size={17} />

          {task.status === "Completed"
            ? "Mark pending"
            : "Mark complete"}
        </button>
      </article>
    </AppLayout>
  );
}