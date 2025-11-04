import React from "react";

export default function EventList({ events, deleteEvent }) {
  // clear all events from localStorage and UI
  function clearAllEvents() {
    if (window.confirm("Are you sure you want to delete all events?")) {
      localStorage.removeItem("calendarEvents");
      window.location.reload(); // refresh to reset app state
    }
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h2>All Events</h2>
        {events.length > 0 && (
          <button className="btn danger small" onClick={clearAllEvents}>
            Clear All
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <p>No events yet. Add one from the calendar!</p>
      ) : (
        <ul className="event-list">
          {events.map((ev) => (
            <li key={ev.id} className="event-item">
              <div className="event-info">
                <strong>{ev.title}</strong>
                <span className="event-date">{ev.date}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteEvent(ev.id)}
                title="Delete this event"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
