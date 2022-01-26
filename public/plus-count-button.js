const plusButton = document.getElementById("plus-count-button");
const inventoryCounter = document.getElementById("inventory-counts");
const inventoryID = window.location.pathname.split(
  "/stockhome/inventories/"
)[1];

plusButton.addEventListener("click", async () => {
  let currentCounts = parseInt(inventoryCounter.innerHTML);
  currentCounts++;
  inventoryCounter.innerHTML = currentCounts;

  if (!currentCounts) return;

  await fetch(`/stockhome/inventories/${inventoryID}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ counts: currentCounts }),
  });
});
