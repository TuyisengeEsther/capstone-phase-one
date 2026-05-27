const toggle = document.getElementById("themeToggle");

toggle?.addEventListener("click", () => {
  document.body.classList.toggle("bg-white");
  document.body.classList.toggle("text-black");
});