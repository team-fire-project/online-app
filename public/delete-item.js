const deleteButton = document.getElementById("delete-item");
const itemID = window.location.pathname.split("/inventories/")[1];

deleteButton.addEventListener("click", async () => {
  const res = await fetch(`/stockhome/inventories/${itemID}`, {
    method: "delete",
  });
  // console.log(res)
  window.location.assign("/stockhome/inventories");

// alert(itemID)
});
