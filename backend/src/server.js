
import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
    });
  } catch (error) {
    console.error("Sunucu başlatılamadı, MongoDB bağlantısı başarısız:", error.message);
    process.exit(1);
  }
}

startServer();
