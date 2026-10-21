
import type { CampusEvent } from "../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onDetails: (eventId: string) => void;
}

function EventList({ events, onDetails }: EventListProps) {
  if (events.length === 0) {
    return <p>Aradığın kriterlere uygun etkinlik bulunamadı.</p>;
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDetails={onDetails}
        />
      ))}
    </div>
  );
}

export default EventList;
