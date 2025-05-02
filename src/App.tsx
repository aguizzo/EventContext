import React from "react";
import { EventProvider } from "./EventStorageContext";
import AddEventForm from "./AddEventForm";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./EventList";
import EditEvent from "./EditEvent";
import { Page } from "./Page";

const App: React.FC = () => {
  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Event Manager</h1>
                <AddEventForm />
                <EventList />
              </>
            }
          />
          <Route path="/edit/:id" element={<EditEvent />} />
          <Route path="/page" element={<Page />} />
        </Routes>
      </Router>
    </EventProvider>
  );
};

export default App;
