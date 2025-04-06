// src/EventContext.tsx
import React, { createContext, useContext, useReducer } from "react";
import { useEventContext, Event } from "./EventContext";

interface CurrentEventContextType {
  currentEvent: Event;
  dispatch: React.Dispatch<Action>;
}

type Action = 
  | { type: 'UPDATE_FIELD'; field: string; value: string | number }
  | { type: 'SET_EVENT'; id: string };


const CurrentEventContext = createContext<CurrentEventContextType | undefined>(undefined);

export const useCurrentEventContext = () => {
  const context = useContext(CurrentEventContext);
  if (!context) {
    throw new Error("useCurrentEventContext must be used within a CurrentEventProvider");
  }
  return context;
}

export const SelectedEventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getEventById } = useEventContext();

  function eventReducer(state: Event, action: Action): Event {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return { ...state, [action.field]: action.value };
      case 'SET_EVENT':{
        const event = getEventById(action.id);
        if (event) {
          return { ...event };
        }
        return state;
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