// src/EventContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the event data
interface Event {
  id: string;
  title: string;
  date: string;
  guests: number;
  status: string;
  image: string;
  type: string;
  location: string;
}

// Define the shape of the context
interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  getEventById: (id: string) => Event | undefined;
}

// Create the context
const EventContext = createContext<EventContextType | undefined>(undefined);

// Custom hook to access the context
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

// Provider component
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from local storage on mount
  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem("eventIds") || "[]") as string[];
    const loadedEvents = storedIds.map((id) => {
      const eventData = localStorage.getItem(`event-${id}`);
      return eventData ? JSON.parse(eventData) : null;
    }).filter(Boolean) as Event[];

    setEvents(loadedEvents);
  }, []);

  // Add a new event and save it to local storage
  const addEvent = (event: Event) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, event];
      localStorage.setItem("eventIds", JSON.stringify(updatedEvents.map((e) => e.id)));
      localStorage.setItem(`event-${event.id}`, JSON.stringify(event));
      return updatedEvents;
    });
  };

  // Retrieve an event by its ID
  const getEventById = (id: string): Event | undefined => {
    return events.find((event) => event.id === id);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, getEventById }}>
      {children}
    </EventContext.Provider>
  );
};
