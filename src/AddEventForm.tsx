import React, { useState } from "react";
import { useEventContext } from "./EventContext";

const AddEventForm: React.FC = () => {
  const { addEvent } = useEventContext();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    date: "",
    guests: 0,
    status: "",
    image: "",
    type: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(formData);
    alert("Event added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="id" placeholder="ID" onChange={handleChange} required />
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <input name="date" placeholder="Date" onChange={handleChange} required />
      <input
        name="guests"
        placeholder="Guests"
        type="number"
        onChange={handleChange}
        required
      />
      <input
        name="status"
        placeholder="Status"
        onChange={handleChange}
        required
      />
      <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        required
      />
      <input name="type" placeholder="Type" onChange={handleChange} required />
      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;
