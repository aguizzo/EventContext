// src/EventList.tsx
import React from "react";
import { useEventContext } from "./EventContext";

const EventList: React.FC = () => {
  const { events } = useEventContext();

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <h2>{event.title}</h2>
          <p>Date: {event.date}</p>
          <p>Guests: {event.guests}</p>
          <p>Status: {event.status}</p>
          <img src={event.image} alt={event.title} style={{ width: "200px" }} />
          <p>Type: {event.type}</p>
          <p>Location: {event.location}</p>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
