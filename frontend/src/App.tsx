
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AdminPage from "./pages/AdminPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri";
  }, [location]);

  return (
    <>
      <header>
        <Header title="Kampüs Etkinlikleri" />
        <Navigation />
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/etkinlikler" element={<EventsPage />} />
        <Route path="/etkinlik/:id" element={<EventDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/etkinlik-ekle" element={<AddEventPage />} />
        <Route path="/etkinlik-duzenle/:id" element={<EditEventPage />} />
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/kayit" element={<RegisterPage />} />
        <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
