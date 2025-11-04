import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
import AddEventModal from "./components/AddEventModal";
import EventList from "./components/EventList";
import initialEvents from "./events.json";

const clientId = "727957346983-li8k7o12dv4ot3svoa01sgdd8acd22cg.apps.googleusercontent.com";

export default function App() {
  
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState("calendar");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // ✅ Initialize Google One-Tap Sign-In
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: true, // ✅ Automatically sign in if already authorized
      });


      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt(); // optional auto-popup
    } else {
      console.error("Google script not loaded");
    }
  }, []);

  // ✅ Handle the login callback
  function handleCredentialResponse(response) {
    try {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(window.atob(base64));

      setUser(decoded.name);
      setUserId(decoded.sub);

      // ✅ Save user info locally
      localStorage.setItem("googleUser", JSON.stringify({ name: decoded.name, sub: decoded.sub }));

      console.log("Signed in as:", decoded.name);

      // Load that user's events
      const storedEvents = localStorage.getItem(`calendarEvents_${decoded.sub}`);
      if (storedEvents) setEvents(JSON.parse(storedEvents));
      else setEvents(initialEvents);
    } catch (err) {
      console.error("Login decode error:", err);
    }
  }


  // ✅ Logout
  function handleLogout() {
    setUser(null);
    setUserId(null);
    setEvents(initialEvents);
    localStorage.removeItem("googleUser"); // ✅ Remove saved user info
    window.google.accounts.id.disableAutoSelect();
  }


  // ✅ Save user-specific events
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`calendarEvents_${userId}`, JSON.stringify(events));
    }
  }, [events, userId]);

  useEffect(() => {
    const savedUser = localStorage.getItem("googleUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed.name);
      setUserId(parsed.sub);

      const storedEvents = localStorage.getItem(`calendarEvents_${parsed.sub}`);
      if (storedEvents) setEvents(JSON.parse(storedEvents));
      else setEvents(initialEvents);
    }
  }, []);


  // ✅ Add & delete events
  function addEvent(newEvent) {
    setEvents((prev) => [...prev, newEvent]);
  }

  function deleteEvent(id) {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }

  function goToDeleteMode() {
    setCurrentView("events");
  }

  return (
    <div className="app-root">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <header className="topbar">
          <h1 className="app-title">
            {currentView === "calendar" ? "Calendar" : "Events"}
          </h1>

          {user && currentView === "calendar" && (
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

        {/* ✅ Require login before showing calendar */}
        {!user ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Sign in to access your calendar</h2>
            <div
              id="googleSignInDiv"
              style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
            ></div>
          </div>
        ) : (
          <section className="calendar-wrap">
            {currentView === "calendar" ? (
              <Calendar events={events} />
            ) : (
              <EventList events={events} deleteEvent={deleteEvent} />
            )}
          </section>
        )}

        {showModal && (
          <AddEventModal onClose={() => setShowModal(false)} onAdd={addEvent} />
        )}
      </main>
    </div>
  );
}
