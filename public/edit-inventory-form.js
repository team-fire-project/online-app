const editItem = async (id) => {
  // Getting the input elements by ID
  const itemName = document.getElementById("edit-form-inventory-name");
  const category = document.getElementById("edit-form-inventory-category");
  const itemPrice = document.getElementById("edit-form-inventory-price");
  const inventoryCount = document.getElementById("edit-form-inventory-count");
  const imageURL = document.getElementById("edit-form-inventory-image");
  const itemDescription = document.getElementById(
    "edit-form-inventory-description"
  );

  // Getting the input values
  const newName = itemName.value;
  const newCategory = category.value;
  const newPrice = itemPrice.value;
  const newCount = inventoryCount.value;
  const newImage = imageURL.value;
  const newDescription = itemDescription.value;

  let res = await fetch(`/stockhome/edit-inventory/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newName,
      price: newPrice,
      description: newDescription,
      category: newCategory,
      image: newImage,
      counts: newCount,
    }),
  });
};
