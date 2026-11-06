
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(
      `"${title}" etkinliğini silmek istediğine emin misin?`
    );

    if (confirmed) {
      deleteEvent(id);
    }
  }

  return (
    <main>
      <h1>Yönetim Paneli</h1>

      <Link to="/etkinlik-ekle">Yeni Etkinlik Ekle</Link>

      <h2>Etkinlik Listesi</h2>

      {events.length === 0 ? (
        <p>Henüz etkinlik bulunmuyor.</p>
      ) : (
        <>
          {/* Masaüstü görünümü */}
          <div className="admin-table-container">
            <table>
              <thead>
                <tr>
                  <th>Etkinlik Adı</th>
                  <th>Kategori</th>
                  <th>Tarih</th>
                  <th>Konum</th>
                  <th>İşlemler</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.category}</td>
                    <td>{event.date}</td>
                    <td>{event.location}</td>
                    <td>
                      <Link to={`/etkinlik-duzenle/${event.id}`}>
                        Düzenle
                      </Link>
                      {" | "}
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(event.id, event.title)
                        }
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil kart görünümü */}
          <div className="admin-mobile-list">
            {events.map((event) => (
              <article className="admin-mobile-card" key={event.id}>
                <h3>{event.title}</h3>

                <p>
                  <strong>Kategori:</strong> {event.category}
                </p>

                <p>
                  <strong>Tarih:</strong> {event.date}
                </p>

                <p>
                  <strong>Konum:</strong> {event.location}
                </p>

                <div className="admin-mobile-actions">
                  <Link to={`/etkinlik-duzenle/${event.id}`}>
                    Düzenle
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(event.id, event.title)
                    }
                  >
                    Sil
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default AdminPage;
