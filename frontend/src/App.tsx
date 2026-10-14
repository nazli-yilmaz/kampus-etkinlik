
import { useState, useEffect } from "react";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import "./App.css";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { label: string; page: PageName }[] = [
  { label: "Ana Sayfa", page: "home" },
  { label: "Etkinlikler", page: "events" },
  { label: "Etkinlik Ekle", page: "add" },
];

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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

  const renderCard = (event: CampusEvent) => (
    <article className="event-card" key={event.id}>
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

      <button type="button" onClick={() => go("detail", event.id)}>
        Detayları Gör
      </button>
    </article>
  );

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>

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

            <div className="event-grid">
              {featuredEvents.map(renderCard)}
            </div>

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

            <div className="filtre">
              <div className="filtre-alani">
                <label htmlFor="etkinlik-arama">Etkinlik ara</label>
                <input
                  id="etkinlik-arama"
                  type="search"
                  placeholder="Etkinlik adı veya açıklama..."
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </div>

              <div className="filtre-alani">
                <label htmlFor="kategori-sec">Kategori seç</label>
                <select
                  id="kategori-sec"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as Category | "")
                  }
                >
                  <option value="">Tüm kategoriler</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p>Bulunan etkinlik sayısı: {filteredEvents.length}</p>

            <div className="event-grid">
              {filteredEvents.map(renderCard)}
            </div>

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
              <>
                <h2>{selectedEvent.title}</h2>

                <div className="event-detail">
                  {selectedEvent.image && (
                    <div className="event-image">
                      <img
                        src={selectedEvent.image}
                        alt={`${selectedEvent.title} afişi`}
                      />
                    </div>
                  )}

                  <div className="event-info">
                    <dl>
                      <dt>Kategori</dt>
                      <dd>{selectedEvent.category}</dd>

                      <dt>Tarih</dt>
                      <dd>{formatDate(selectedEvent.date)}</dd>

                      <dt>Saat</dt>
                      <dd>{selectedEvent.time}</dd>

                      <dt>Yer</dt>
                      <dd>{selectedEvent.location}</dd>

                      <dt>Kontenjan</dt>
                      <dd>{selectedEvent.capacity} kişi</dd>
                    </dl>

                    <p>{selectedEvent.description}</p>

                    <button
                      type="button"
                      onClick={() => go("update", selectedEvent.id)}
                    >
                      Bu etkinliği güncelle
                    </button>

                    <button type="button" onClick={() => go("events")}>
                      Etkinlik listesine dön
                    </button>
                  </div>
                </div>
              </>
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
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="form-alani">
                  <label htmlFor="event-title">Etkinlik adı</label>
                  <input
                    id="event-title"
                    type="text"
                    placeholder="Etkinliğin adını girin"
                    defaultValue={
                      page === "update" ? selectedEvent?.title ?? "" : ""
                    }
                  />
                </div>

                <div className="form-alani">
                  <label htmlFor="event-category">Kategori</label>
                  <select
                    id="event-category"
                    defaultValue={
                      page === "update"
                        ? selectedEvent?.category ?? ""
                        : ""
                    }
                  >
                    <option value="">Kategori seçin</option>
                    <option value="Seminer">Seminer</option>
                    <option value="Atölye">Atölye</option>
                    <option value="Söyleşi">Söyleşi</option>
                    <option value="Yarışma">Yarışma</option>
                  </select>
                </div>

                <div className="form-alani">
                  <label htmlFor="event-date">Tarih</label>
                  <input
                    id="event-date"
                    type="date"
                    defaultValue={
                      page === "update" ? selectedEvent?.date ?? "" : ""
                    }
                  />
                </div>

                <div className="form-alani">
                  <label htmlFor="event-time">Saat</label>
                  <input
                    id="event-time"
                    type="time"
                    defaultValue={
                      page === "update" ? selectedEvent?.time ?? "" : ""
                    }
                  />
                </div>

                <div className="form-alani">
                  <label htmlFor="event-location">Konum</label>
                  <input
                    id="event-location"
                    type="text"
                    placeholder="Etkinliğin yapılacağı yer"
                    defaultValue={
                      page === "update" ? selectedEvent?.location ?? "" : ""
                    }
                  />
                </div>

                <div className="form-alani">
                  <label htmlFor="event-capacity">Kontenjan</label>
                  <input
                    id="event-capacity"
                    type="number"
                    min="1"
                    placeholder="Katılımcı sayısı"
                    defaultValue={
                      page === "update" ? selectedEvent?.capacity ?? "" : ""
                    }
                  />
                </div>

                <div className="form-alani">
                  <label htmlFor="event-description">Açıklama</label>
                  <textarea
                    id="event-description"
                    rows={4}
                    placeholder="Etkinliği kısaca açıklayın"
                    defaultValue={
                      page === "update"
                        ? selectedEvent?.description ?? ""
                        : ""
                    }
                  />
                </div>

                <button type="submit">
                  {page === "add"
                    ? "Etkinliği Kaydet"
                    : "Değişiklikleri Güncelle"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    page === "update"
                      ? go("detail", selectedEventId)
                      : go("events")
                  }
                >
                  İptal
                </button>
              </form>
            )}
          </section>
        )}
      </main>

      <footer>
        <p>Kampüs Etkinlikleri © 2026</p>
      </footer>
    </>
  );
}

export default App;
