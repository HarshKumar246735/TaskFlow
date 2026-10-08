import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  CalendarDays,
  FolderKanban,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import "../../css/layout/Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: FileText,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: CalendarDays,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: FolderKanban,
    },
  ];

  const accountItems = [
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <NavLink to="/dashboard" className="sidebar-logo" onClick={onClose}>
            <div className="logo-icon">
              ✓
            </div>

            <div className="logo-content">
              <span className="logo-title">TaskFlow</span>
              <span className="logo-subtitle">Productivity Manager</span>
            </div>
          </NavLink>

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="nav-section-title">MAIN MENU</p>

            <div className="nav-items">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? "active" : ""}`
                    }
                  >
                    <Icon size={20} strokeWidth={2} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Account */}
          <div className="nav-section account-section">
            <p className="nav-section-title">ACCOUNT</p>

            <div className="nav-items">
              {accountItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? "active" : ""}`
                    }
                  >
                    <Icon size={20} strokeWidth={2} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Bottom User Card */}
        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="user-avatar">H</div>

            <div className="user-info">
              <span className="user-name">Harsh Kumar</span>
              <span className="user-role">Developer</span>
            </div>
          </div>

          <button className="logout-button">
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;