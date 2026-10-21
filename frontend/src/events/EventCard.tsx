
import type { CampusEvent } from "../types/campus-event";
import { formatDate } from "../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onDetails: (eventId: string) => void;
}

function EventCard({ event, onDetails }: EventCardProps) {
  return (
    <article className="event-card">
      {event.image && (
        <div className="event-image">
          <img src={event.image} alt={`${event.title} afişi`} />
        </div>
      )}

      <h3>{event.title}</h3>
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Saat:</strong> {event.time}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p>{event.description}</p>

      <button
        type="button"
        onClick={() => onDetails(event.id)}
      >
        Detayları Gör
      </button>
    </article>
  );
}

export default EventCard;
