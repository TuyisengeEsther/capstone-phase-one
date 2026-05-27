const KEY = "favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function addFavorite(book) {
  const favs = getFavorites();

  const id = book.key || book.cover_edition_key || book.title;

  const exists = favs.some(b =>
    (b.key || b.cover_edition_key || b.title) === id
  );

  if (!exists) {
    favs.push(book);
    localStorage.setItem(KEY, JSON.stringify(favs));
  }
}

export function removeFavorite(id) {
  const favs = getFavorites().filter(b =>
    (b.key || b.cover_edition_key || b.title) !== id
  );

  localStorage.setItem(KEY, JSON.stringify(favs));
}