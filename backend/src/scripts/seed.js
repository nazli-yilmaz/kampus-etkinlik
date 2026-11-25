import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/database.js";
import Event from "../models/event-model.js";
import { events } from "../data/seed-events.js";

export async function runSeed() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await connectDB();

    console.log("Mevcut etkinlik koleksiyonu yenileniyor (eski kayıtlar temizleniyor)...");
    const deleteResult = await Event.deleteMany({});
    console.log(`Eski kayıtlar silindi (${deleteResult.deletedCount} adet).`);

    const createdEvents = await Event.insertMany(events);
    console.log(`Seed işlemi başarılı: Koleksiyona tam olarak ${createdEvents.length} adet etkinlik eklendi.`);
  } catch (error) {
    console.error("Seed işlemi sırasında hata oluştu:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB bağlantısı kapatıldı.");
  }
}

runSeed();
