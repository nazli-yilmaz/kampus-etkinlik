
import { useNavigate, useParams, Link } from "react-router-dom";

import { useEvents } from "../context/EventsContext";
import EventForm from "../components/events/EventForm";

function EditEventPage() {
  const { id } = useParams();
  const { getEventById, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = id ? getEventById(id) : undefined;

  if (!event) {
    return (
      <main>
        <h1>Etkinlik Bulunamadı</h1>
        <Link to="/etkinlikler">Etkinliklere Geri Dön</Link>
      </main>
    );
  }

 function handleSubmit(data: Parameters<typeof updateEvent>[1]) {
  if (!event) return;

  updateEvent(event.id, data);
  navigate(`/etkinlik/${event.id}`);
}

  return (
    <main>
      <h1>Etkinliği Düzenle</h1>

      <EventForm
        mode="update"
        event={event}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/etkinlik/${event.id}`)}
      />
    </main>
  );
}

export default EditEventPage;
