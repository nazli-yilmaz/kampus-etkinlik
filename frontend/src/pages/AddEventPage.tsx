
import { useNavigate } from "react-router-dom";

import { useEvents } from "../context/EventsContext";
import EventForm from "../components/events/EventForm";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(data: Parameters<typeof addEvent>[0]) {
    addEvent(data);
    navigate("/etkinlikler");
  }

  return (
    <main>
      <h1>Yeni Etkinlik Ekle</h1>

      <EventForm
        mode="add"
        onSubmit={handleSubmit}
        onCancel={() => navigate("/etkinlikler")}
      />
    </main>
  );
}

export default AddEventPage;
