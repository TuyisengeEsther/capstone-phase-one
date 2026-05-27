import "./menu.js";
import { addFavorite } from "./favorites.js";

const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const container = document.getElementById("booksContainer");
const loading = document.getElementById("loading");
const noResults = document.getElementById("noResults");

/* ================= DARK MODE (FIXED CLEAN) ================= */
const body = document.getElementById("appBody");
const header = document.getElementById("appHeader");
const themeToggle = document.getElementById("themeToggle");

let dark = true;

themeToggle.addEventListener("click", () => {
  dark = !dark;

  if (dark) {
    // BODY
    body.classList.add("bg-black", "text-white");
    body.classList.remove("bg-white", "text-black");

    // HEADER
    header.classList.add("bg-zinc-900", "text-white", "border-zinc-800");
    header.classList.remove("bg-white", "text-black", "border-gray-300");
  } 
  else {
    // BODY
    body.classList.add("bg-white", "text-black");
    body.classList.remove("bg-black", "text-white");

    // HEADER
    header.classList.add("bg-white", "text-black", "border-gray-300");
    header.classList.remove("bg-zinc-900", "text-white", "border-zinc-800");
  }
});

/* ================= FETCH BOOKS ================= */
async function fetchBooks(query) {
  const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const data = await res.json();
  return data.docs.slice(0, 12);
}

/* ================= DISPLAY BOOKS ================= */
function displayBooks(books) {
  container.innerHTML = "";

  books.forEach(book => {
    const div = document.createElement("div");

    const image = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : "https://via.placeholder.com/300x400";

    div.className = "bg-zinc-900 rounded-xl overflow-hidden";

    div.innerHTML = `
      <img src="${image}" class="w-full h-72 object-cover"/>

      <div class="p-4">
        <h3 class="font-bold">${book.title}</h3>

        <p class="text-gray-400 text-sm mb-3">
          ${book.author_name ? book.author_name[0] : "Unknown"}
        </p>

        <button class="favBtn w-full bg-white text-black py-2 rounded font-bold">
          ❤️ Add to Favorite
        </button>
      </div>
    `;

    const btnFav = div.querySelector(".favBtn");

    btnFav.onclick = () => {
      addFavorite(book);
      btnFav.textContent = "Added ✓";
      btnFav.disabled = true;
    };

    container.appendChild(div);
  });
}

/* ================= LOAD ================= */
async function load(query = "javascript") {
  loading.classList.remove("hidden");

  const books = await fetchBooks(query);

  loading.classList.add("hidden");

  if (!books.length) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");
  displayBooks(books);
}

/* ================= SEARCH ================= */
btn.onclick = () => load(input.value);

input.addEventListener("keypress", e => {
  if (e.key === "Enter") load(input.value);
});

/* ================= INIT ================= */
load();