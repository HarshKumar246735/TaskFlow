
import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import { updateMe } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { user, setUser } = useAuth();

  const [dark, setDark] = useState(
    user?.preferences?.theme === "dark"
  );

  const [reminders, setReminders] = useState(
    user?.preferences?.reminders !== false
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = dark
      ? "dark"
      : "light";
  }, [dark]);

  useEffect(() => {
    if (!user?.preferences) {
      return;
    }

    setDark(user.preferences.theme === "dark");

    setReminders(
      user.preferences.reminders !== false
    );
  }, [user]);

  const savePreferences = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await updateMe({
        preferences: {
          ...(user?.preferences || {}),
          theme: dark ? "dark" : "light",
          reminders,
        },
      });

      setUser(response.data.data);

      setMessage("Preferences saved successfully.");
    } catch (err) {
      console.error(
        "Failed to save preferences:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to save preferences."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="eyebrow">Preferences</p>

          <h1>Settings</h1>

          <p className="muted">
            Customize your TaskFlow experience.
          </p>
        </div>
      </div>

      <div className="settings-card">
        {message && (
          <div className="form-success">
            {message}
          </div>
        )}

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <h3>Appearance</h3>

        <label className="toggle-row">
          <span>
            <strong>Dark mode</strong>

            <small>
              Use the dark TaskFlow interface.
            </small>
          </span>

          <input
            type="checkbox"
            checked={dark}
            onChange={(event) =>
              setDark(event.target.checked)
            }
          />
        </label>

        <h3>Notifications</h3>

        <label className="toggle-row">
          <span>
            <strong>Task reminders</strong>

            <small>
              Receive reminders for upcoming tasks.
            </small>
          </span>

          <input
            type="checkbox"
            checked={reminders}
            onChange={(event) =>
              setReminders(event.target.checked)
            }
          />
        </label>

        <button
          type="button"
          className="btn primary"
          onClick={savePreferences}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save preferences"}
        </button>
      </div>
    </AppLayout>
  );
}

