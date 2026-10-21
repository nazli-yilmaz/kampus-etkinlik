
import EventList from "./events/EventList";
import EventForm from "./events/EventForm";
import EventDetail from "./events/EventDetail";
import EventFilter from "./events/EventFilter";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { useState, useEffect } from "react";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import "./App.css";

const menuItems: { label: string; page: PageName }[] = [
  { label: "Ana Sayfa", page: "home" },
  { label: "Etkinlikler", page: "events" },
  { label: "Etkinlik Ekle", page: "add" },
];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedEventId, setSelectedEventId] = useState("event-1");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const selectedEvent = findEventById(events, selectedEventId);

  useEffect(() => {
    const titles: Record<PageName, string> = {
      home: "Ana Sayfa",
      events: "Etkinlikler",
      detail: "Etkinlik Detayı",
      add: "Etkinlik Ekle",
      update: "Etkinlik Güncelle",
    };

    const title =
      page === "detail" && selectedEvent
        ? selectedEvent.title
        : titles[page];

    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [page, selectedEvent]);

  function go(nextPage: PageName, eventId?: string) {
    if (eventId) {
      setSelectedEventId(eventId);
    }

    setPage(nextPage);
  }

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const featuredEvents = events
    .filter((event) => event.date >= todayString)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((event) => event.category))];

  const searchedEvents = searchEvents(events, searchText);
  const filteredEvents = filterByCategory(searchedEvents, category);

  return (
    <>
      <header>
        <Header title="Kampüs Etkinlikleri" />

        <nav aria-label="Ana menü">
          {menuItems.map((item) => (
            <a
              key={item.page}
              href={`#${item.page}`}
              aria-current={page === item.page ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan Etkinlikler</h2>
            <p>Kampüsteki etkinlikleri keşfet!</p>

            <EventList
              events={featuredEvents}
              onDetails={(eventId) => go("detail", eventId)}
            />

            {featuredEvents.length === 0 && (
              <p>Yaklaşan etkinlik bulunamadı.</p>
            )}

            <button type="button" onClick={() => go("events")}>
              Tüm Etkinlikleri Gör
            </button>
          </section>
        )}

        {page === "events" && (
          <section>
            <h2>Etkinlikler</h2>

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
              onDetails={(eventId) => go("detail", eventId)}
            />

            {filteredEvents.length === 0 && (
              <p>Aramanızla eşleşen etkinlik bulunamadı.</p>
            )}
          </section>
        )}

        {page === "detail" && (
  <section>
    {!selectedEvent ? (
      <>
        <div className="form-hata-mesaji" role="alert">
          Etkinlik bulunamadı.
        </div>

        <button type="button" onClick={() => go("events")}>
          Etkinlik listesine dön
        </button>
      </>
    ) : (
      <EventDetail
        event={selectedEvent}
        onBack={() => go("events")}
        onEdit={(eventId) => go("update", eventId)}
      />
    )}
  </section>
)}
                  

        {(page === "add" || page === "update") && (
  <section key={page === "update" ? selectedEventId : "add-form"}>
    <h2>
      {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
    </h2>

    {page === "update" && !selectedEvent ? (
      <div className="form-hata-mesaji" role="alert">
        Güncellenecek etkinlik bulunamadı.
      </div>
    ) : (
      <EventForm
        mode={page}
        event={selectedEvent ?? undefined}
        onSubmit={() => {
          // Şimdilik form gönderimini engellemek dışında işlem yapılmıyor.
        }}
        onCancel={() =>
          page === "update"
            ? go("detail", selectedEventId)
            : go("events")
        }
      />
    )}
  </section>
)}
              
          
      </main>

      <Footer />
    </>
  );
}

export default App;
