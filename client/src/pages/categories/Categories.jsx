
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, Plus, ArrowRight } from "lucide-react";

import AppLayout from "../../components/layout/AppLayout";
import { getCategories } from "../../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCategories();

        if (mounted) {
          setCategories(response.data?.data || []);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);

        if (mounted) {
          setError(
            err.response?.data?.message ||
              "Failed to load categories."
          );

          setCategories([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const totalTasks = categories.reduce(
    (total, category) =>
      total +
      (category.totalTasks || category.taskCount || 0),
    0
  );

  const totalCompleted = categories.reduce(
    (total, category) =>
      total + (category.completedTasks || 0),
    0
  );

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="eyebrow">Organization</p>

          <h1>Categories</h1>

          <p className="muted">
            Organize your tasks into meaningful categories.
          </p>
        </div>

        <Link
          to="/categories/create"
          className="btn primary"
        >
          <Plus size={17} />
          New category
        </Link>
      </div>

      {loading && (
        <div className="empty">
          Loading categories...
        </div>
      )}

      {!loading && error && (
        <div className="empty">
          <p>{error}</p>

          <button
            type="button"
            className="btn secondary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <FolderKanban size={20} />

              <div>
                <span>Total categories</span>
                <strong>{categories.length}</strong>
              </div>
            </div>

            <div className="stat-card">
              <FolderKanban size={20} />

              <div>
                <span>Total tasks</span>
                <strong>{totalTasks}</strong>
              </div>
            </div>

            <div className="stat-card">
              <FolderKanban size={20} />

              <div>
                <span>Completed tasks</span>
                <strong>{totalCompleted}</strong>
              </div>
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="empty">
              <FolderKanban size={32} />

              <h3>No categories yet</h3>

              <p>
                Create your first category to organize
                your tasks.
              </p>

              <Link
                to="/categories/create"
                className="btn primary"
              >
                <Plus size={17} />
                Create category
              </Link>
            </div>
          ) : (
            <div className="category-grid">
              {categories.map((category) => {
                const total =
                  category.totalTasks ||
                  category.taskCount ||
                  0;

                const completed =
                  category.completedTasks || 0;

                const progress =
                  category.progress ??
                  (total > 0
                    ? Math.round(
                        (completed / total) * 100
                      )
                    : 0);

                return (
                  <article
                    className="category-card"
                    key={category._id}
                  >
                    <div className="category-card-head">
                      <div className="category-icon">
                        <FolderKanban size={20} />
                      </div>

                      <span>
                        {total}{" "}
                        {total === 1
                          ? "task"
                          : "tasks"}
                      </span>
                    </div>

                    <h3>{category.name}</h3>

                    <p>
                      {category.description ||
                        "No description available."}
                    </p>

                    <div className="category-progress">
                      <div className="progress-head">
                        <span>Progress</span>

                        <strong>
                          {progress}%
                        </strong>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.min(
                              Math.max(progress, 0),
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="category-footer">
                      <span>
                        {completed} completed
                      </span>

                      <Link
                        to={`/categories/${category._id}`}
                        className="link-btn"
                      >
                        View
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </AppLayout>
  );
}

