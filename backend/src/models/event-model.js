import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title alanı zorunludur"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category alanı zorunludur"],
      enum: {
        values: ["Seminer", "Atölye", "Söyleşi", "Yarışma"],
        message: "{VALUE} geçerli bir kategori değil",
      },
      trim: true,
    },
    capacity: {
      type: Number,
      min: [1, "Kapasite en az 1 olmalıdır"],
      default: 1,
    },
    date: {
      type: Date,
      required: [true, "date alanı zorunludur"],
      set: parseDate,
      get: formatDate,
    },
    time: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
    id: false,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
