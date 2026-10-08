
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import { updateMe } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function EditProfile() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await updateMe({
        name: name.trim(),
      });

      setUser(response.data.data);

      navigate("/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Edit profile</h1>
          <p className="muted">
            Update your personal information.
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
          Full name

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter your full name"
            required
          />
        </label>

        <label>
          Email

          <input
            type="email"
            value={user?.email || ""}
            disabled
          />
        </label>

        <button
          type="submit"
          className="btn primary"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </AppLayout>
  );
}

