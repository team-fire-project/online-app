const menu = document.getElementById("#mobile-menu");
const menuLinks = document.getElementsByClassName(".nav-items");

menu.addEventListener("click", function () {
  document.getElementById("nav-menu").classList.toggle("is-active");
  document.getElementById("bars").classList.toggle("fa-times");
});

const getSearch = () => {
  const item = document.getElementById("search-input");
  window.location.assign(`/stockhome/inventories/search/${item.value}`);
  alert("searching...");
};
