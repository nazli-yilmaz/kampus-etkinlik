import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/database.js";
import Event from "../models/Event.js";
import { events } from "../data/events.js";

async function seed() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await connectDB();

    console.log("Mevcut etkinlik koleksiyonu yenileniyor (eski kayıtlar temizleniyor)...");
    const deleteResult = await Event.deleteMany({});
    console.log(`Eski kayıtlar silindi (${deleteResult.deletedCount} adet).`);

    const seedData = events.map(({ id, ...rest }) => rest);
    const createdEvents = await Event.insertMany(seedData);

    console.log(`Seed işlemi başarılı: Koleksiyona tam olarak ${createdEvents.length} adet etkinlik eklendi.`);
  } catch (error) {
    console.error("Seed işlemi sırasında hata oluştu:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB bağlantısı kapatıldı.");
  }
}

seed();
