import React from "react";
import { EventProvider } from "./EventContext";
import EventList from "./EventList";
import AddEventForm from "./AddEventForm";
import './App.css'

const App: React.FC = () => {
  return (
    <EventProvider>
      <h1>Event Manager</h1>
      <AddEventForm />
      <EventList />
    </EventProvider>
  );
};

export default App
