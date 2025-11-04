import React from "react";

export default function Sidebar({ currentView, setCurrentView, user, onLogin, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="brand">CRMHUB</div>

      <nav className="menu">
        <button
          className={`menu-item ${currentView === "calendar" ? "active" : ""}`}
          onClick={() => setCurrentView("calendar")}
        >
          Calendar
        </button>
        <button
          className={`menu-item ${currentView === "events" ? "active" : ""}`}
          onClick={() => setCurrentView("events")}
        >
          Events
        </button>
      </nav>

      <div className="sidebar-footer">
        {user ? (
          <>
            <p>Hello, <strong>{user}</strong></p>
            <button className="btn small" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn primary small" onClick={onLogin}>
            Sign in with Google
          </button>
        )}
      </div>
    </aside>
  );
}
