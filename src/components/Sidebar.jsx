import React from "react";

export default function Sidebar({ currentView, setCurrentView }) {
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
      <div className="sidebar-footer">Satish</div>
    </aside>
  );
}