//////////////////Instantiate all the dependencies needed ///////////////////
const express = require("express");
const app = express();
const Op = require("sequelize").Op;

const session = require("express-session");
const cookieParser = require("cookie-parser");

// bcrypt saves users info!!!!
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const PORT = 5000;
const { seed } = require("./seed.js");
const { Inventory, User } = require("./Models/index.js");

// Configurating hanlebars library to work well w/ express + sequelize model
const handlebars = engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

// Tell this express app that we're using handlebars
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

// support the parsing of incoming requests with urlencoded payloads (e.g. form POST)
app.use(express.urlencoded({ extended: false }));
// support the parsing of incoming requests with json payloads
app.use(express.json());
// Server static assets from the public folder instead of JSON file
app.use(express.static("public"));
// Configure app to use session and cookie parser
app.use(cookieParser());
app.use(
  session({
    secret: "secretkeyfornow",
    resave: false,
    saveUninitialized: true,
  })
);

/////////////////////////////// Helper function ///////////////////////////////
const findRole = (req) => {
  const userRole = req.session.role;
  let user = "Guest";
  let admin = false;
  let shopper = false;
  let guest = false;

  if (req.session.emailaddress) {
    user = req.session.emailaddress.split("@")[0];
    shopper = true;
  } else {
    guest = true;
  }

  if (userRole == "Admin") {
    shopper = false;
    admin = true;
  }

  const users = [admin, shopper, guest, user];

  return users;
};

////////////////////////////////// Middleware /////////////////////////////////
app.get("/stockhome/", (req, res) => {
  res.redirect("/stockhome/signin");
});

// A route that users can view all items
app.get("/stockhome/inventories", async (req, res) => {
  const inventories = await Inventory.findAll();

  // Get different UI depends on different roles
  const getUser = await findRole(req);
  let user = getUser[3];
  let admin = getUser[0];
  let shopper = getUser[1];
  let guest = getUser[2];

  res.render("inventories", { inventories, user, admin, shopper, guest });
});

// A route that users can get a specific category of items
app.get("/stockhome/inventories/categories/:category", async (req, res) => {
  const categories = req.params.category;
  const inventories = await Inventory.findAll({
    where: { category: categories },
  });

  // Get different UI depends on different roles
  const getUser = await findRole(req);
  let admin = getUser[0];
  let shopper = getUser[1];
  let guest = getUser[2];

  res.render("categories", { inventories, categories, admin, shopper, guest });
});

// A route that users can view one item
app.get("/stockhome/inventories/:id", async (req, res) => {
  const inventoryID = req.params.id;
  const inventory = await Inventory.findByPk(inventoryID);

  // Get different UI depends on different roles
  const getUser = await findRole(req);
  let admin = getUser[0];
  let shopper = getUser[1];
  let guest = getUser[2];

  res.render("inventory", { inventory, admin, shopper, guest });
});

// A route for Help center page
app.get("/stockhome/helpcenter", async (req, res) => {
  res.send(
    "Please contact us through our email if you have any questions: stockhome@gmail.com"
  );
});

// Creating new inventory item using handlebars form
app.get("/stockhome/add-inventory-form", (req, res) => {
  res.render("addInventoryForm");
});
app.post("/stockhome/add-inventory", async (req, res) => {
  const newInventory = await Inventory.create(req.body);
  const foundInventory = await Inventory.findByPk(newInventory.id);
  foundInventory.counts = newInventory.counts;

  if (foundInventory && res.status(200)) {
    res.redirect(`/stockhome/inventories`);
  } else {
    res.send("Something went wrong, please try again...");
  }
});

// A route to delete an item
app.delete("/stockhome/inventories/:id", async (req, res) => {
  const deleteditem = await Inventory.destroy({
    where: { id: req.params.id },
  });
  res.send({ deleteditem });
});

//Updating the inventory counts for the specific inventory by clicking the plus or minus button
app.put("/stockhome/inventories/:id", async (req, res) => {
  const inventoryID = req.params.id;
  const updatedInventory = Inventory.update(req.body, {
    where: { id: inventoryID },
  });
  res.send({ updatedInventory });
});

// Updating the inventory by clicking the edit button
app.get("/stockhome/edit-inventory-form/:id", async (req, res) => {
  const inventoryID = req.params.id;
  const inventory = await Inventory.findByPk(inventoryID);
  res.render("editInventory", { inventory });
});
app.put("/stockhome/edit-inventory/:id", async (req, res) => {
  const inventoryID = req.params.id;
  const newInventory = await Inventory.update(req.body, {
    where: { id: inventoryID },
  });
  res.redirect(`/stockhome/inventories/${inventoryID}`);
});

// A route for user to sign up
app.get("/stockhome/signup", (req, res) => {
  let alert = "";
  res.render("signupForm");
});
app.post("/stockhome/signup", async (req, res) => {
  // Access emailaddress, password, and password confirmation from handlebars
  const emailaddress = req.body.emailaddress;
  const password = req.body.password;
  const confirm = req.body.confirm;
  const userRole = req.body.role;

  // Search for duplicate
  const findDuplicate = await User.findOne({
    where: { emailaddress: emailaddress },
  });

  // Check if the passwords match.
  // If not, sign up fails.
  if (password !== confirm) {
    let alert = "⛔ Password does not match! ⛔";
    res.render("signupForm", { alert });
    // Emailaddress must be unique. if not, sign up fails.
  } else if (findDuplicate) {
    let alert = "⛔ Email address has already been registered! ⛔";
    res.render("signupForm", { alert });
    // If match, add user to database
  } else {
    // Using bcrypt to make sure the user password is secure
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const newUser = await User.create({
        role: userRole,
        emailaddress: emailaddress,
        password: hash,
      });

      // Sorting user id and emailaddress in session data
      req.session.userID = newUser.id;
      req.session.emailaddress = newUser.emailaddress;
      req.session.role = userRole;

      // Render signin form directly
      res.redirect("/stockhome/signin");
    });
  }
});

// A route for user to sign in
app.get("/stockhome/signin", (req, res) => {
  let alert = "";
  res.render("signinForm", { alert });
});
app.post("/stockhome/signin", async (req, res) => {
  // Check if user exist by comapring emailaddress in req.body and db
  const thisUser = await User.findOne({
    where: { emailaddress: req.body.emailaddress },
  });
  const password = req.body.password;

  // If that user doesn't exist, sign in fails
  if (!thisUser) {
    let alert = "⛔ User not found! ⛔";
    res.render("signinForm", { alert });
    // Use bycrypt compare to check if password matches
  } else {
    bcrypt.compare(password, thisUser.password, async (err, result) => {
      // If passwords dont match, sign in fails
      if (!result) {
        let alert = "⛔ Wrong password! ⛔";
        res.render("signinForm", { alert });
        // Else sign in succeeds
      } else {
        // Sorting user id and emailaddress in session data
        req.session.userID = thisUser.id;
        req.session.emailaddress = thisUser.emailaddress;
        req.session.role = thisUser.role;

        res.redirect("/stockhome/inventories");
      }
    });
  }
});

//user search //

app.get("/stockhome/inventories/search/:searchitem", async (req, res) => {
  const searchvalue = req.params.searchitem;
  const inventories = await Inventory.findAll({
    where: {
      name: { [Op.like]: `%${searchvalue}%` },
    },
  });
  res.render("inventories", { inventories});
});

// User logging out
app.get("/stockhome/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/stockhome");
  });
});

app.listen(PORT, async () => {
  await seed();
  console.log(`Server started on port ${PORT}`);
});
