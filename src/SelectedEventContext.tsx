// src/EventContext.tsx
import React, { createContext, useContext, useReducer } from "react";
import { useEventContext, Event } from "./EventContext";

interface CurrentEventContextType {
  currentEvent: Event;
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: "UPDATE_FIELD"; payload: { field: string; value: string | number } }
  | { type: "SET_EVENT"; payload: Event }
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
  function eventReducer(state: Event, action: Action): Event {
    switch (action.type) {
      case "UPDATE_FIELD": {
        const { field, value } = action.payload;
        return { ...state, [field]: value };
      }
      case "SET_EVENT": {
        return { ...action.payload };
      }
      case "DELETE_EVENT": {
        return {} as Event;
      }
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
