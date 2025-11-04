import React, { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay
} from "date-fns";

function DayCell({ day, events, isToday, inCurrentMonth, onSelect, selected }) {
  return (
    <div
      className={`day-cell ${inCurrentMonth ? "" : "muted"} ${
        selected ? "selected" : ""
      }`}
      onClick={() => onSelect(day)}
    >
      <div className={`date-top ${isToday ? "today" : ""}`}>
        {format(day, "d")} 
      </div>
      <div className="events-list">
        {events.map((ev) => (
          <div key={ev.id} className="event-pill">
            <span
              className="dot"
              style={{ background: ev.color || "#7c4dff" }}
            />
            <span className="ev-title">{ev.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Calendar({ events = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const mappedEvents = useMemo(() => {
    const map = {};
    events.forEach((ev) => {
      const dateStr = ev.date;
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push(ev);
    });
    return map;
  }, [events]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let day = startDate;
  while (day <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    rows.push(week);
  }

  function prevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  function nextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  const today = new Date();

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="month-controls">
          <button className="icon-btn" onClick={prevMonth}>
            ◀
          </button>
          <div className="month-title">
            <div className="big">{format(monthStart, "MMMM yyyy")}</div>
            <div className="sub">Full Event Schedule</div>
          </div>
          <button className="icon-btn" onClick={nextMonth}>
            ▶
          </button>
        </div>
      </div>

      <div className="weekdays">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="weekday">
            {d}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {rows.map((week, wi) => (
          <div className="week-row" key={wi}>
            {week.map((d) => {
              const dateKey = format(d, "yyyy-MM-dd");
              const evs = mappedEvents[dateKey] || [];
              return (
                <DayCell
                  key={dateKey}
                  day={d}
                  events={evs}
                  inCurrentMonth={isSameMonth(d, monthStart)}
                  isToday={isSameDay(d, today)}
                  selected={selectedDate && isSameDay(d, selectedDate)}
                  onSelect={setSelectedDate}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}