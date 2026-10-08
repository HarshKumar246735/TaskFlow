
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import { getStats } from "../../services/dashboardService";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    productivity: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        setLoading(true);

        const response = await getStats();

        if (mounted) {
          setStats(
            response.data?.data || {
              totalTasks: 0,
              completedTasks: 0,
              productivity: 0,
            }
          );
        }
      } catch (error) {
        console.error(
          "Failed to load profile statistics:",
          error
        );

        if (mounted) {
          setStats({
            totalTasks: 0,
            completedTasks: 0,
            productivity: 0,
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <AppLayout>
      <div className="profile-hero">
        <div className="big-avatar">
          {initials}
        </div>

        <div>
          <p className="eyebrow">Account</p>

          <h1>{user?.name || "User"}</h1>

          <p>{user?.email || "No email available"}</p>

          <span className="role">
            {user?.role || "User"}
          </span>
        </div>

        <Link
          className="btn secondary"
          to="/profile/edit"
        >
          Edit profile
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <span>Tasks</span>

            <strong>
              {loading ? "..." : stats.totalTasks || 0}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span>Completed</span>

            <strong>
              {loading
                ? "..."
                : stats.completedTasks || 0}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span>Productivity</span>

            <strong>
              {loading
                ? "..."
                : `${stats.productivity || 0}%`}
            </strong>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

