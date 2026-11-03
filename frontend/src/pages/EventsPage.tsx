
import { useState } from "react";
import { Link } from "react-router-dom";

import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";
import EventFilter from "../components/events/EventFilter";
import type { Category } from "../types/campus-event";

function EventsPage() {
  const { events } = useEvents();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchText.toLowerCase()) ||
      event.location.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      category === "" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <h1>Tüm Etkinlikler</h1>

      <Link to="/etkinlik-ekle">Yeni Etkinlik Ekle</Link>

      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />

      <p>Bulunan etkinlik sayısı: {filteredEvents.length}</p>

      <EventList
        events={filteredEvents}
        onDetails={(id) => {
          window.location.href = `/etkinlik/${id}`;
        }}
      />

      {filteredEvents.length === 0 && (
        <p>Aramanızla eşleşen etkinlik bulunamadı.</p>
      )}
    </main>
  );
}

export default EventsPage;
