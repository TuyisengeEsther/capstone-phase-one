import { getFavorites, removeFavorite } from "./favorites.js";

const container = document.getElementById("favoritesContainer");

function render() {
  container.innerHTML = "";

  const favs = getFavorites();

  if (favs.length === 0) {
    container.innerHTML = `
      <p class="text-center text-gray-400 col-span-full">
        No favorite books yet 💔
      </p>
    `;
    return;
  }

  favs.forEach(book => {
    const div = document.createElement("div");

    const image = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : "https://via.placeholder.com/300x400";

    const id = book.key || book.cover_edition_key || book.title;

    div.className = "bg-zinc-900 rounded overflow-hidden";

    div.innerHTML = `
      <img src="${image}" class="w-full h-72 object-cover"/>

      <div class="p-4">
        <h3 class="font-bold">${book.title}</h3>

        <button class="rm w-full bg-red-500 py-2 mt-2 rounded">
          Remove
        </button>
      </div>
    `;

    div.querySelector(".rm").onclick = () => {
      removeFavorite(id);
      render();
    };

    container.appendChild(div);
  });
}

render();