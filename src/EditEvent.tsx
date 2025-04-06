import React, { useReducer, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventContext, Event } from "./EventContext";

type Action = 
  | { type: 'UPDATE_FIELD'; field: string; value: string | number }
  | { type: 'SET_EVENT'; payload: Event };

function eventReducer(state: Event, action: Action): Event {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_EVENT':
      return { ...action.payload };
    default:
      return state;
  }
}

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, updateEvent, removeEvent } = useEventContext();
  const [state, dispatch] = useReducer(eventReducer, {} as Event);
  const navigate = useNavigate();

  useEffect(() => {
    const event = getEventById(id!);
    if (event) {
      dispatch({ type: 'SET_EVENT', payload: event });
    }
  }, [id, getEventById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ 
      type: 'UPDATE_FIELD',
      field: e.target.name,
      value: e.target.value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(state);
    navigate('/');
  };

  const handleDelete = () => {
    removeEvent(state.id);
    navigate('/');
  };

  if (!state) return <div>Event not found</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={state.title || ""} onChange={handleChange} />
      <input name="date" value={state.date || ""} onChange={handleChange} />
      <input name="guests" type="number" value={state.guests || 0} onChange={handleChange} />
      <input name="status" value={state.status || ""} onChange={handleChange} />
      <input name="image" value={state.image || ""} onChange={handleChange} />
      <input name="type" value={state.type || ""} onChange={handleChange} />
      <input name="location" value={state.location || ""} onChange={handleChange} />
      <button type="submit">Update</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </form>
  );
};

export default EditEvent;