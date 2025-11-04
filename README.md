# 📅 React Calendar App — Frontend Assessment (Survey Sparrow)

## 🚀 Overview
This project is a **React-based Calendar Application** built as part of the **Frontend Developer Assessment** for Survey Sparrow.  
It allows users to **add**, **view**, and **delete events** with a clean, responsive interface and persistent localStorage storage.

---

## ✨ Features

### 🗓 Calendar View
- Displays a full **monthly calendar grid**.
- Highlights **today’s date** automatically.
- Allows **date selection** (clicked date turns blue).
- Shows all events scheduled for each date.
- Navigate between months using previous/next arrows.

### 📝 Add Event
- Clicking **"Add Event"** opens a popup modal.
- User can enter:
  - Event Date
  - Event Title
- New events appear instantly in the calendar.
- Events persist in **localStorage** (stay even after refresh).

### ❌ Delete Event
- Clicking **"Delete Event"** navigates to the **Events tab**.
- Each event has a **delete (🗑️)** button.
- Events are removed dynamically from both the list and the calendar.
- Includes a **“Clear All”** button to delete all events at once.

### 💾 Local Storage Persistence
- All events are saved in browser localStorage.
- Data remains intact after page reload or browser restart.

---

## 🧩 Folder Structure

survey-calendar/
│
├── public/
│ ├── index.html
│
├── src/
│ ├── components/
│ │ ├── Calendar.jsx
│ │ ├── Sidebar.jsx
│ │ ├── AddEventModal.jsx
│ │ └── EventList.jsx
│ │
│ ├── events.json
│ ├── App.jsx
│ ├── index.js
│ └── styles.css
│
├── package.json
└── README.md

yaml
Copy code

---

## 🛠️ Tech Stack

- **React.js** — Component-based UI
- **date-fns** — Date utilities (formatting, month navigation)
- **CSS3** — Styling and layout
- **LocalStorage API** — Persistent data storage

---

## ⚙️ Installation & Setup

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd survey-calendar
Install dependencies

bash
Copy code
npm install
Start the development server

bash
Copy code
npm start
Open your browser at:

arduino
Copy code
http://localhost:3000
📸 Key Functionalities
Feature	Description
🗓 Calendar	Displays monthly calendar with event highlights
➕ Add Event	Add new events with date & title
❌ Delete Event	Remove single events or all events
💾 Persistence	Events stored in localStorage
🧭 Navigation	Switch between Calendar and Events sidebar

👨‍💻 Developer
Name: Satish Kumar
Role: Frontend Developer (Survey Sparrow Assessment)
Tech Stack Expertise: React.js, Node.js, MERN Stack, JavaScript, HTML, CSS

✅ Submission Note
This project was designed and implemented to demonstrate strong skills in:

React component structure

State management with hooks

UI/UX design consistency

Code readability and scalability

Thank you for reviewing my submission!
Made with ❤️ by Satish Kumar