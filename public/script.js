const menu = document.getElementById("#mobile-menu");
const menuLinks = document.getElementsByClassName(".nav-items");

menu.addEventListener("click", function () {
  document.getElementById("nav-menu").classList.toggle("is-active");
  document.getElementById("bars").classList.toggle("fa-times");
});

const getSearch = () => {
  let searchitem = document.getElementById("search-input").value;
  searchitem = searchitem.toLowerCase();
  let items = document.getElementsByClassName("inventory");
  let item = document.getElementsByClassName("item-name");

  console.log(searchitem)

  for(i=0; i<item.length; i++) {
      if (!item[i].innerHTML.toLowerCase().includes(searchitem)) {
          items[i].style.display="none";
      } else {
          items[i].style.display = "unset";
      }
  }
};
