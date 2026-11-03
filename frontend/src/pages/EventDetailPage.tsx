
import { Link, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventDetail from "../components/events/EventDetail";

function EventDetailPage() {
  const { id } = useParams();
  const { getEventById } = useEvents();

  const event = id ? getEventById(id) : undefined;

  if (!event) {
    return (
      <main>
        <h1>Etkinlik Bulunamadı</h1>
        <Link to="/etkinlikler">Etkinliklere Geri Dön</Link>
      </main>
    );
  }

  return (
    <main>
      <EventDetail
        event={event}
        onBack={() => {
          window.location.href = "/etkinlikler";
        }}
        onEdit={() => {
          window.location.href = `/etkinlik-duzenle/${event.id}`;
        }}
      />
    </main>
  );
}

export default EventDetailPage;
