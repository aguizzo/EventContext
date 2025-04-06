// src/EventList.tsx
import React from "react";
import { useEventContext } from "./EventContext";
import { Link } from "react-router-dom";

const EventList: React.FC = () => {
  const { events } = useEventContext();

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <Link to={`/edit/${event.id}`}>
            <h2>{event.title}</h2>
          </Link>
          {/* ... rest of event display */}
          <img src={event.image} alt={event.title} style={{ width: "200px" }} />
        </li>
      ))}
    </ul>
  );
};

export default EventList;
