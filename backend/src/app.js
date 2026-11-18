import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// GET /health
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012070",
  });
});

// Etkinlik rotaları
app.use("/events", eventRoutes);

// Tanımlı olmayan endpoint'ler için 404 fallback
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
    },
  });
});

// Merkezi hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error("Sunucu hatası:", err.message);

  const statusCode =
    err.status ||
    err.statusCode ||
    (err.name === "ValidationError" || err.name === "CastError" ? 400 : 500);

  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
      ...(err.errors && { errors: err.errors }),
    },
  });
});

export default app;
