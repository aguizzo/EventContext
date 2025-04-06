import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCurrentEventContext } from "./SelectedEventContext";
import { useEventContext } from "./EventContext";

const EditEventContextReducer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentEvent, dispatch } = useCurrentEventContext();
  const { getEventById, updateEvent, removeEvent } = useEventContext();

  const navigate = useNavigate();

  useEffect(() => {
    const event = getEventById(id || "");
    if (event) {
      dispatch({ type: "SET_EVENT", payload: event });
    }
  }, [id, getEventById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_EVENT", payload: currentEvent });
    updateEvent(currentEvent);
    navigate("/");
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_EVENT" });
    removeEvent(currentEvent.id);
    navigate("/");
  };

  if (!currentEvent) return <div>Event not found</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={currentEvent.title || ""}
        onChange={handleChange}
      />
      <input
        name="date"
        value={currentEvent.date || ""}
        onChange={handleChange}
      />
      <input
        name="guests"
        type="number"
        value={currentEvent.guests || 0}
        onChange={handleChange}
      />
      <input
        name="status"
        value={currentEvent.status || ""}
        onChange={handleChange}
      />
      <input
        name="image"
        value={currentEvent.image || ""}
        onChange={handleChange}
      />
      <input
        name="type"
        value={currentEvent.type || ""}
        onChange={handleChange}
      />
      <input
        name="location"
        value={currentEvent.location || ""}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </form>
  );
};

export default EditEventContextReducer;
