
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Şifre sıfırlama bağlantısı e-posta adresine gönderildi."
    );
  }

  return (
    <main>
      <h1>Şifremi Unuttum</h1>
      <p>Şifreni sıfırlamak için e-posta adresini gir.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          placeholder="E-posta adresin"
          required
        />

        <button type="submit">Gönder</button>
      </form>

      {message && <p role="status">{message}</p>}

      <p>
        <Link to="/giris">Giriş sayfasına dön</Link>
      </p>
    </main>
  );
}

export default ForgotPasswordPage;
