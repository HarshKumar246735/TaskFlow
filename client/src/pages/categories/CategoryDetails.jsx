import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import { getCategory } from "../../services/categoryService";

export default function CategoryDetails() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCategory(id);

      setCategory(response.data.data);
    } catch (err) {
      console.error("Failed to load category:", err);

      setCategory(null);

      setError(
        err.response?.data?.message ||
          "Failed to load category."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCategory(id);

        if (mounted) {
          setCategory(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load category:", err);

        if (mounted) {
          setCategory(null);

          setError(
            err.response?.data?.message ||
              "Failed to load category."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchCategory();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="empty">
          Loading category…
        </div>
      </AppLayout>
    );
  }

  if (!category) {
    return (
      <AppLayout>
        <div className="empty">
          {error || "Category not found."}
        </div>
      </AppLayout>
    );
  }

  const totalTasks = Number(
    category.totalTasks || 0
  );

  const completedTasks = Number(
    category.completedTasks || 0
  );

  const pendingTasks = Math.max(
    totalTasks - completedTasks,
    0
  );

  const progress =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="eyebrow">Category</p>

          <h1>{category.name}</h1>

          <p className="muted">
            {category.description ||
              "Tasks organized under this category."}
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <span>Total tasks</span>
            <strong>{totalTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="detail-card">
        <div className="page-head">
          <div>
            <h2>Category progress</h2>
            <p className="muted">
              {completedTasks} of {totalTasks} tasks
              completed.
            </p>
          </div>

          <strong>{progress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="detail-card">
        <div className="page-head">
          <div>
            <h2>Tasks</h2>
            <p className="muted">
              Tasks assigned to this category.
            </p>
          </div>
        </div>

        <div className="task-list">
          {(category.tasks || []).map((task) => (
            <div
              className="task-card"
              key={task._id}
            >
              <Link
                className="task-title"
                to={`/tasks/${task._id}`}
              >
                {task.title}
              </Link>

              <span>{task.status}</span>
            </div>
          ))}

          {!category.tasks?.length && (
            <div className="empty">
              No tasks in this category yet.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}