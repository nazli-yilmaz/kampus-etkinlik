
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { CampusEvent } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextType {
  events: CampusEvent[];
  addEvent: (event: Omit<CampusEvent, "id">) => void;
  updateEvent: (id: string, updatedEvent: Omit<CampusEvent, "id">) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => CampusEvent | undefined;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  const addEvent = (event: Omit<CampusEvent, "id">) => {
    const newEvent: CampusEvent = {
      ...event,
      id: crypto.randomUUID(),
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);
  };

  const updateEvent = (
    id: string,
    updatedEvent: Omit<CampusEvent, "id">
  ) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id ? { ...updatedEvent, id } : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );
  };

  const getEventById = (id: string) => {
    return events.find((event) => event.id === id);
  };

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent, getEventById }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error("useEvents, EventsProvider içinde kullanılmalıdır.");
  }

  return context;
}
