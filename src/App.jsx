import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
import AddEventModal from "./components/AddEventModal";
import EventList from "./components/EventList";
import initialEvents from "./events.json";

export default function App() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState("calendar");

  // Load events from localStorage on first render
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(initialEvents); // load initial data if nothing in storage
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Add new event
  function addEvent(newEvent) {
    setEvents((prev) => [...prev, newEvent]);
  }

  // Delete event
  function deleteEvent(id) {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }

  // Navigate to Events view for deletion
  function goToDeleteMode() {
    setCurrentView("events");
  }

  return (
    <div className="app-root">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        <header className="topbar">
          <h1 className="app-title">
            {currentView === "calendar" ? "Calendar" : "Events"}
          </h1>

          {currentView === "calendar" && (
            <div className="top-actions">
              <button className="btn primary" onClick={() => setShowModal(true)}>
                Add Event
              </button>
              <button className="btn danger" onClick={goToDeleteMode}>
                Delete Event
              </button>
            </div>
          )}
        </header>

        <section className="calendar-wrap">
          {currentView === "calendar" ? (
            <Calendar events={events} />
          ) : (
            <EventList events={events} deleteEvent={deleteEvent} />
          )}
        </section>

        {showModal && (
          <AddEventModal onClose={() => setShowModal(false)} onAdd={addEvent} />
        )}
      </main>
    </div>
  );
}