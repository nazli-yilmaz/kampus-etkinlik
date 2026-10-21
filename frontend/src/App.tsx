
import { useState, useEffect } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import EventList from "./events/EventList";
import EventForm from "./events/EventForm";
import EventDetail from "./events/EventDetail";
import EventFilter from "./events/EventFilter";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";
import type { PageName } from "./types/page";
import { events as initialEvents } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import "./App.css";

type EventFormData = Omit<CampusEvent, "id">;

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedEventId, setSelectedEventId] = useState("event-1");
  const [eventList, setEventList] = useState<CampusEvent[]>(initialEvents);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const selectedEvent = findEventById(eventList, selectedEventId);

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

  function handleEventSubmit(data: EventFormData) {
    if (page === "add") {
      const newEvent: CampusEvent = {
        ...data,
        id: `event-${Date.now()}`,
      };

      setEventList((current) => [...current, newEvent]);
      setSelectedEventId(newEvent.id);
      go("detail", newEvent.id);
      return;
    }

    if (page === "update" && selectedEvent) {
      const updatedEvent: CampusEvent = {
        ...data,
        id: selectedEvent.id,
      };

      setEventList((current) =>
        current.map((item) =>
          item.id === selectedEvent.id ? updatedEvent : item
        )
      );

      go("detail", selectedEvent.id);
    }
  }

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const featuredEvents = eventList
    .filter((event) => event.date >= todayString)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(eventList.map((event) => event.category))];
  const searchedEvents = searchEvents(eventList, searchText);
  const filteredEvents = filterByCategory(searchedEvents, category);

  return (
    <>
      <header>
        <Header
          title={
            page === "detail" && selectedEvent
              ? selectedEvent.title
              : "Kampüs Etkinlikleri"
          }
        />
        <Navigation page={page} onNavigate={go} />
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan Etkinlikler</h2>
            <p>Kampüsteki etkinlikleri keşfet!</p>

            <EventList
              events={featuredEvents}
              onDetails={(id) => go("detail", id)}
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
              onDetails={(id) => go("detail", id)}
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
                onEdit={(id) => go("update", id)}
              />
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section key={`${page}-${selectedEventId}`}>
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
                onSubmit={handleEventSubmit}
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
