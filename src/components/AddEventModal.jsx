import React, { useState } from "react";

export default function AddEventModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !date) return alert("Please fill all fields");
    onAdd({
      id: Date.now(),
      title,
      date,
      time: "00:00",
      color: "#A5D6A7"
    });
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label>Event Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Meeting / Task"
          />
          <div className="modal-buttons">
            <button type="submit" className="btn primary">Save</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}