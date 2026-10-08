import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import {
  getNotifications,
  readNotification,
  readAll,
} from "../../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const response = await getNotifications();

      setNotifications(response.data.data || []);
    } catch (error) {
      console.error(
        "Failed to load notifications:",
        error
      );
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = async () => {
      try {
        setLoading(true);

        const response = await getNotifications();

        if (mounted) {
          setNotifications(response.data.data || []);
        }
      } catch (error) {
        console.error(
          "Failed to load notifications:",
          error
        );

        if (mounted) {
          setNotifications([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  const handleRead = async (id) => {
    try {
      await readNotification(id);
      await loadNotifications();
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  const handleReadAll = async () => {
    try {
      await readAll();
      await loadNotifications();
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );
    }
  };

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="eyebrow">Inbox</p>
          <h1>Notifications</h1>
        </div>

        <button
          type="button"
          className="btn secondary"
          onClick={handleReadAll}
          disabled={!notifications.length}
        >
          Mark all read
        </button>
      </div>

      {loading ? (
        <div className="empty">
          Loading notifications...
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              className={
                notification.read
                  ? "notification"
                  : "notification unread"
              }
              key={notification._id}
            >
              <div>
                <b>{notification.title}</b>

                <p>{notification.message}</p>

                <small>
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </small>
              </div>

              {!notification.read && (
                <button
                  type="button"
                  className="link-btn"
                  onClick={() =>
                    handleRead(notification._id)
                  }
                >
                  Mark read
                </button>
              )}
            </div>
          ))}

          {!notifications.length && (
            <div className="empty">
              No notifications yet.
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}