
import type { PageName } from "../types/page";

interface NavigationProps {
  page: PageName;
  onNavigate: (page: PageName) => void;
}

const menuItems: { label: string; page: PageName }[] = [
  { label: "Ana Sayfa", page: "home" },
  { label: "Etkinlikler", page: "events" },
  { label: "Etkinlik Ekle", page: "add" },
];

function Navigation({ page, onNavigate }: NavigationProps) {
  return (
    <nav aria-label="Ana menü">
      {menuItems.map((item) => (
        <a
          key={item.page}
          href={`#${item.page}`}
          aria-current={page === item.page ? "page" : undefined}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(item.page);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;
