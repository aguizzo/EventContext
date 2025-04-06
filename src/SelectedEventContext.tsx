// src/EventContext.tsx
import React, { createContext, useContext, useReducer } from "react";
import { useEventContext, Event } from "./EventContext";

interface CurrentEventContextType {
  currentEvent: Event;
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: "UPDATE_FIELD"; field: string; value: string | number }
  | { type: "SET_EVENT"; id: string }
  | { type: "UPDATE_EVENT" }
  | { type: "DELETE_EVENT" };
// | { type: "ADD_EVENT"; event: Event };

const CurrentEventContext = createContext<CurrentEventContextType | undefined>(
  undefined
);

export const useCurrentEventContext = () => {
  const context = useContext(CurrentEventContext);
  if (!context) {
    throw new Error(
      "useCurrentEventContext must be used within a CurrentEventProvider"
    );
  }
  return context;
};

export const SelectedEventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getEventById, updateEvent, removeEvent, addEvent } =
    useEventContext();

  function eventReducer(state: Event, action: Action): Event {
    switch (action.type) {
      // Event Actions
      case "UPDATE_FIELD": {
        return { ...state, [action.field]: action.value };
      }
      case "SET_EVENT": {
        const event = getEventById(action.id);
        if (event) {
          return { ...event };
        }
        return state;
      }
      // Flush Actions to sync with EventContext
      case "UPDATE_EVENT": {
        updateEvent(state);
        return state;
      }
      case "DELETE_EVENT": {
        removeEvent(state.id);
        return {} as Event;
      }
      // case "ADD_EVENT": {
      //   addEvent(action.event);
      //   return action.event;
      // }
      default:
        return state;
    }
  }

  const [currentEvent, dispatch] = useReducer(eventReducer, {} as Event);

  return (
    <CurrentEventContext.Provider value={{ currentEvent, dispatch }}>
      {children}
    </CurrentEventContext.Provider>
  );
};
