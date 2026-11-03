
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="main-navigation">
      <NavLink to="/">Ana Sayfa</NavLink>
      <NavLink to="/etkinlikler">Etkinlikler</NavLink>
      <NavLink to="/etkinlik-ekle">Etkinlik Ekle</NavLink>
      <NavLink to="/admin">Yönetim Paneli</NavLink>
      <NavLink to="/giris">Giriş Yap</NavLink>
      <NavLink to="/kayit">Kayıt Ol</NavLink>
    </nav>
  );
}

export default Navigation;
