
import { Link } from "react-router-dom";

function LoginPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Giriş formu gönderildi.");
  }

  return (
    <main>
      <h1>Giriş Yap</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          placeholder="E-posta adresin"
          required
        />

        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          placeholder="Şifren"
          required
        />

        <button type="submit">Giriş Yap</button>
      </form>

      <p>
        <Link to="/sifremi-unuttum">Şifremi Unuttum</Link>
      </p>

      <p>
        Hesabın yok mu? <Link to="/kayit">Kayıt Ol</Link>
      </p>
    </main>
  );
}

export default LoginPage;
