
import type { CampusEvent } from "../types/campus-event";
import { formatDate } from "../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (eventId: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <>
      <h2>{event.title}</h2>

      <div className="event-detail">
        {event.image && (
          <div className="event-image">
            <img
              src={event.image}
              alt={`${event.title} afişi`}
            />
          </div>
        )}

        <div className="event-info">
          <dl>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>

            <dt>Tarih</dt>
            <dd>{formatDate(event.date)}</dd>

            <dt>Saat</dt>
            <dd>{event.time}</dd>

            <dt>Yer</dt>
            <dd>{event.location}</dd>

            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>

          <p>{event.description}</p>

          <button
            type="button"
            onClick={() => onEdit(event.id)}
          >
            Bu etkinliği güncelle
          </button>

          <button type="button" onClick={onBack}>
            Etkinlik listesine dön
          </button>
        </div>
      </div>
    </>
  );
}

export default EventDetail;
