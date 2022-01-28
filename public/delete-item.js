const deleteButton = document.getElementById("delete-item");
const itemID = window.location.pathname.split("/inventories/")[1];
const confirmation = document.getElementById("delete-confirmation");
const confirmButton = document.getElementById("confirm");

const onDelete = () => {
  if (!confirmation.classList.contains("modal-open")) {
    confirmation.classList.add("modal-open");
    console.log("modal-open");
  }
};

const onCancel = () => {
  confirmation.classList.remove("modal-open");
};

const onConfirm = () => {
  onCancel();
};

deleteButton.addEventListener("click", function () {
  onDelete();
});

confirmButton.addEventListener("click", async () => {
  const res = await fetch(`/stockhome/inventories/${itemID}`, {
    method: "delete",
  });
  console.log(res);
  alert("Deleted!");
  setTimeout(() => {
    window.location.assign("/stockhome/inventories");
  }, 200);
});
