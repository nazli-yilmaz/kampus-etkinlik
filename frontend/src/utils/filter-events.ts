
import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(
  list: CampusEvent[],
  text: string
): CampusEvent[] {
  const searchText = text.trim().toLocaleLowerCase("tr-TR");

  if (!searchText) {
    return list;
  }

  return list.filter((event) => {
    const title = event.title.toLocaleLowerCase("tr-TR");
    const description = event.description.toLocaleLowerCase("tr-TR");

    return (
      title.includes(searchText) ||
      description.includes(searchText)
    );
  });
}

export function filterByCategory(
  list: CampusEvent[],
  category: Category | ""
): CampusEvent[] {
  if (category === "") {
    return list;
  }

  return list.filter((event) => event.category === category);
}

export function findEventById(
  list: CampusEvent[],
  id: string
): CampusEvent | undefined {
  return list.find((event) => event.id === id);
}
