import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../css/layout/Topbar.css";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] =
    useState(false);

  const displayName = user?.name || "Harsh Kumar";
  const displayRole = user?.role || "Developer";

  const initials =
    displayName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleProfile = () => {
    setShowProfile(false);
    navigate("/profile");
  };

  const handleSettings = () => {
    setShowProfile(false);
    navigate("/settings");
  };

  const handleNotifications = () => {
    setShowNotifications(false);
    navigate("/notifications");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="topbar">
      {/* Mobile Menu */}
      <button
        type="button"
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className="topbar-search">
        <Search size={19} />

        <input
          type="text"
          placeholder="Search tasks, notes..."
          aria-label="Search tasks and notes"
        />

        <span className="search-shortcut">
          Ctrl + K
        </span>
      </div>

      {/* Right Side */}
      <div className="topbar-actions">
        {/* New Task */}
        <button
          type="button"
          className="topbar-new-task"
          onClick={() => navigate("/tasks/create")}
        >
          <span>+</span>
          <strong>New task</strong>
        </button>

        {/* Notifications */}
        <div className="notification-wrapper">
          <button
            type="button"
            className="topbar-icon-button"
            onClick={() => {
              setShowNotifications(
                !showNotifications
              );
              setShowProfile(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="notification-dot"></span>
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <div>
                  <h3>Notifications</h3>
                  <span>2 new notifications</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon task">
                  ✓
                </div>

                <div>
                  <strong>Task completed</strong>

                  <p>
                    Project documentation was completed.
                  </p>

                  <small>10 min ago</small>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon reminder">
                  !
                </div>

                <div>
                  <strong>Task reminder</strong>

                  <p>
                    Your React practice task is due
                    today.
                  </p>

                  <small>1 hour ago</small>
                </div>
              </div>

              <button
                type="button"
                className="view-all-notifications"
                onClick={handleNotifications}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="topbar-divider"></div>

        {/* Profile */}
        <div className="profile-wrapper">
          <button
            type="button"
            className="profile-button"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            aria-label="Open profile menu"
          >
            <div className="profile-avatar">
              {initials}
            </div>

            <div className="profile-info">
              <span className="profile-name">
                {displayName}
              </span>

              <span className="profile-role">
                {displayRole}
              </span>
            </div>

            <ChevronDown
              size={16}
              className={`profile-chevron ${
                showProfile ? "rotate" : ""
              }`}
            />
          </button>

          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-avatar large">
                  {initials}
                </div>

                <div>
                  <strong>{displayName}</strong>

                  <span>{displayRole}</span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button
                type="button"
                className="profile-menu-item"
                onClick={handleProfile}
              >
                <User size={17} />
                <span>Profile</span>
              </button>

              <button
                type="button"
                className="profile-menu-item"
                onClick={handleSettings}
              >
                <Settings size={17} />
                <span>Settings</span>
              </button>

              <div className="dropdown-divider"></div>

              <button
                type="button"
                className="profile-menu-item logout"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;