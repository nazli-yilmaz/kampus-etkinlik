import mongoose from "mongoose";
import Event from "../models/Event.js";

// GET /events
export async function getEvents(req, res) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const events = await Event.find(filter);
    return res.json(events);
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Etkinlikler getirilirken bir hata oluştu",
        details: error.message,
      },
    });
  }
}

// GET /events/:id
export async function getEventById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: {
          message: "Event not found",
        },
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        error: {
          message: "Event not found",
        },
      });
    }

    return res.json(event);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        error: {
          message: "Event not found",
        },
      });
    }

    return res.status(500).json({
      error: {
        message: "Etkinlik getirilirken bir hata oluştu",
        details: error.message,
      },
    });
  }
}

// POST /events
export async function createEvent(req, res) {
  try {
    const {
      title,
      category,
      capacity,
      date,
      time,
      location,
      description,
      image,
    } = req.body ?? {};

    // Zorunlu alan kontrolü
    if (!title || !category || !date) {
      return res.status(400).json({
        error: {
          message: "title, category and date are required",
        },
      });
    }

    const newEvent = new Event({
      title,
      category,
      capacity: capacity !== undefined ? capacity : 1,
      date,
      time: time ?? "",
      location: location ?? "",
      description: description ?? "",
      image: image ?? "",
    });

    const savedEvent = await newEvent.save();
    return res.status(201).json(savedEvent);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: {
          message: error.message,
          errors: error.errors,
        },
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        error: {
          message: `Geçersiz veri formatı: ${error.path}`,
        },
      });
    }

    return res.status(500).json({
      error: {
        message: "Etkinlik oluşturulurken bir hata oluştu",
        details: error.message,
      },
    });
  }
}
