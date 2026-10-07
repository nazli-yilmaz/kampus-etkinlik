import { events } from "./data.js";

function createCard(event) {
    const tarih = new Date(
        event.date.split("-").reverse().join("-")
    ).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return `
        <article class="event-card">
            <h2>${event.title}</h2>

            <p>
                ${event.category} · ${tarih} · ${event.location}
            </p>

            <p>${event.description}</p>

            <p>Kontenjan: ${event.capacity}</p>

            <a href="etkinlik-detay.html?id=${event.id}">
                Detayları gör
            </a>
        </article>
    `;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
    list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {

    const yaklasan = [...events]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, Number(list.dataset.limit));

    render(yaklasan);

} else {

    const arama = document.querySelector("#arama");
    const kategoriFiltre = document.querySelector("#kategori-filtre");
    const sonucSatiri = document.querySelector("#sonuc");

    // Kategorileri data.js içindeki verilerden oluştur
    const kategoriler = [...new Set(events.map(event => event.category))];

    kategoriler.forEach(kategori => {
        const option = document.createElement("option");

        option.value = kategori;
        option.textContent = kategori;

        kategoriFiltre.appendChild(option);
    });

    function filtrele() {
        const aranan = arama.value
            .trim()
            .toLocaleLowerCase("tr-TR");

        const secilenKategori = kategoriFiltre.value;

        const sonuc = events.filter(event => {

            const metin = `
                ${event.title}
                ${event.description}
                ${event.location}
                ${event.category}
            `.toLocaleLowerCase("tr-TR");

            const metinUyuyor = metin.includes(aranan);

            const kategoriUyuyor =
                secilenKategori === "" ||
                event.category === secilenKategori;

            return metinUyuyor && kategoriUyuyor;
        });

        render(sonuc);

        if (sonuc.length === 0) {
            sonucSatiri.textContent = "Etkinlik bulunamadı.";
        } else {
            sonucSatiri.textContent =
                `${sonuc.length} etkinlik listeleniyor.`;
        }
    }

    arama.addEventListener("input", filtrele);
    kategoriFiltre.addEventListener("change", filtrele);

    filtrele();
}