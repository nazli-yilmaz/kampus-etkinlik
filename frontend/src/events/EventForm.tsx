
import { useState } from "react";
import type { FormEvent } from "react";
import type { CampusEvent, Category } from "../types/campus-event";

type EventFormData = Omit<CampusEvent, "id">;

interface EventFormProps {
  mode: "add" | "update";
  event?: CampusEvent;
  onCancel: () => void;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ mode, event, onCancel, onSubmit }: EventFormProps) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [category, setCategory] = useState<Category | "">(
    event?.category ?? ""
  );
  const [date, setDate] = useState(event?.date ?? "");
  const [time, setTime] = useState(event?.time ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [capacity, setCapacity] = useState(String(event?.capacity ?? ""));
  const [description, setDescription] = useState(event?.description ?? "");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!category) return;

    onSubmit({
      title: title.trim(),
      category,
      date,
      time,
      location: location.trim(),
      capacity: Number(capacity),
      description: description.trim(),
      ...(event?.image ? { image: event.image } : {}),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-alani">
        <label htmlFor="event-title">Etkinlik adı</label>
        <input
          id="event-title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Etkinliğin adını girin"
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-category">Kategori</label>
        <select
          id="event-category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "")}
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
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-time">Saat</label>
        <input
          id="event-time"
          type="time"
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-location">Konum</label>
        <input
          id="event-location"
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Etkinliğin yapılacağı yer"
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-capacity">Kontenjan</label>
        <input
          id="event-capacity"
          type="number"
          min="1"
          required
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Katılımcı sayısı"
        />
      </div>

      <div className="form-alani">
        <label htmlFor="event-description">Açıklama</label>
        <textarea
          id="event-description"
          rows={4}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Etkinliği kısaca açıklayın"
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
