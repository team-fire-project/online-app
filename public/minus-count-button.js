const minusButton = document.getElementById("minus-count-button");

minusButton.addEventListener("click", async () => {
  let currentCounts = parseInt(inventoryCounter.innerHTML);
  currentCounts--;
  inventoryCounter.innerHTML = currentCounts;

  if (!currentCounts) return;

  await fetch(`/stockhome/inventories/${inventoryID}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ counts: currentCounts }),
  });
});
