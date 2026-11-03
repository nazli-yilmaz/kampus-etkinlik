
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradığın sayfa mevcut değil veya kaldırılmış olabilir.</p>

      <Link to="/">Ana Sayfaya Dön</Link>
    </main>
  );
}

export default NotFoundPage;
