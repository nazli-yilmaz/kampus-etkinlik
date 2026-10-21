
import type { CampusEvent, Category } from "../types/campus-event";

interface EventFormProps {
  mode: "add" | "update";
  event?: CampusEvent;
  onCancel: () => void;
  onSubmit: () => void;
}

function EventForm({ mode, event, onCancel, onSubmit }: EventFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-alani">
        <label htmlFor="event-title">Etkinlik adı</label>
        <input
          id="event-title"
          type="text"
          placeholder="Etkinliğin adını girin"
          defaultValue={mode === "update" ? event?.title ?? "" : ""}
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-category">Kategori</label>
        <select
          id="event-category"
          defaultValue={
            mode === "update" ? event?.category ?? "" : ""
          }
        >
          <option value="">Kategori seçin</option>
          <option value={"Seminer" satisfies Category}>Seminer</option>
          <option value={"Atölye" satisfies Category}>Atölye</option>
          <option value={"Söyleşi" satisfies Category}>Söyleşi</option>
          <option value={"Yarışma" satisfies Category}>Yarışma</option>
        </select>
      </div>

      <div className="form-alani">
        <label htmlFor="event-date">Tarih</label>
        <input
          id="event-date"
          type="date"
          defaultValue={mode === "update" ? event?.date ?? "" : ""}
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-time">Saat</label>
        <input
          id="event-time"
          type="time"
          defaultValue={mode === "update" ? event?.time ?? "" : ""}
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-location">Konum</label>
        <input
          id="event-location"
          type="text"
          placeholder="Etkinliğin yapılacağı yer"
          defaultValue={mode === "update" ? event?.location ?? "" : ""}
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-capacity">Kontenjan</label>
        <input
          id="event-capacity"
          type="number"
          min="1"
          placeholder="Katılımcı sayısı"
          defaultValue={mode === "update" ? event?.capacity ?? "" : ""}
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-description">Açıklama</label>
        <textarea
          id="event-description"
          rows={4}
          placeholder="Etkinliği kısaca açıklayın"
          defaultValue={
            mode === "update" ? event?.description ?? "" : ""
          }
        />
      </div>

      <button type="submit">
        {mode === "add" ? "Etkinliği Kaydet" : "Değişiklikleri Güncelle"}
      </button>

      <button type="button" onClick={onCancel}>
        İptal
      </button>
    </form>
  );
}

export default EventForm;
