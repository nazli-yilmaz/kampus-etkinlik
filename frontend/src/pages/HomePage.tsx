
import { Link, useNavigate } from "react-router-dom";

import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();
  const navigate = useNavigate();

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const featuredEvents = events
    .filter((event) => event.date >= todayString)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <main>
      <section>
        <h1>Kampüs Etkinliklerine Hoş Geldin!</h1>
        <p>Üniversitendeki etkinlikleri keşfet.</p>

        <h2>Yaklaşan Etkinlikler</h2>

        {featuredEvents.length > 0 ? (
          <EventList
            events={featuredEvents}
            onDetails={(id) => navigate(`/etkinlik/${id}`)}
          />
        ) : (
          <p>Şu anda yaklaşan etkinlik bulunmuyor.</p>
        )}

        <Link to="/etkinlikler" className="all-events-link">
  Tüm Etkinlikleri Gör
</Link>
      </section>
    </main>
  );
}

export default HomePage;
