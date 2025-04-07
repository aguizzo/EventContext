// src/EventStorageContext.tsx
import React, { createContext, useContext, useState } from "react";
import { SelectedEventProvider } from "./SelectedEventContext";

// Define the shape of the event data
export interface Event {
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
interface EventStorageContextType {
  events: Event[];
  eventStorageApi: {
    addEvent: (event: Event) => void;
    getEventById: (id: string) => Event | undefined;
    updateEvent: (event: Event) => void;
    removeEvent: (id: string) => void;
  };
}

// Create the context
const EventStorageContext = createContext<EventStorageContextType | undefined>(
  undefined
);

// Custom hook to access the context
export const useEventStorageContext = () => {
  const context = useContext(EventStorageContext);
  if (!context) {
    throw new Error(
      "useEventStorageContext must be used within an EventProvider"
    );
  }
  return context;
};

// Initialize events from local storage
const initializeEvents = () => {
  const storedIds = JSON.parse(
    localStorage.getItem("eventIds") || "[]"
  ) as string[];
  return storedIds
    .map((id) => {
      const eventData = localStorage.getItem(`event-${id}`);
      return eventData ? JSON.parse(eventData) : null;
    })
    .filter(Boolean) as Event[];
};

// Provider component
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>(initializeEvents);

  const eventStorageApi = {
    addEvent: (event: Event) => {
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, event];
        localStorage.setItem(
          "eventIds",
          JSON.stringify(updatedEvents.map((e) => e.id))
        );
        localStorage.setItem(`event-${event.id}`, JSON.stringify(event));
        return updatedEvents;
      });
    },
    getEventById: (id: string): Event | undefined => events.find((event) => event.id === id),
    updateEvent: (updatedEvent: Event) => {
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
        localStorage.setItem(
          `event-${updatedEvent.id}`,
          JSON.stringify(updatedEvent)
        );
        return updatedEvents;
      });
    },
    removeEvent: (id: string) => {
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.filter((event) => event.id !== id);
        const updatedIds = updatedEvents.map((e) => e.id);
        localStorage.setItem("eventIds", JSON.stringify(updatedIds));
        localStorage.removeItem(`event-${id}`);
        return updatedEvents;
      });
    }
  }

  return (
    <EventStorageContext.Provider
      value={{ events, eventStorageApi }}
    >
      <SelectedEventProvider>{children}</SelectedEventProvider>
    </EventStorageContext.Provider>
  );
};
