
import { Link } from "react-router-dom";

function RegisterPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Kayıt formu gönderildi.");
  }

  return (
    <main>
      <h1>Kayıt Ol</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Ad Soyad</label>
        <input
          type="text"
          id="name"
          placeholder="Adın ve soyadın"
          required
        />

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
          minLength={6}
          required
        />

        <button type="submit">Kayıt Ol</button>
      </form>

      <p>
        Zaten hesabın var mı? <Link to="/giris">Giriş Yap</Link>
      </p>
    </main>
  );
}

export default RegisterPage;
