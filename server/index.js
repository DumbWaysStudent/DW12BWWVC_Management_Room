require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(bodyParser.json());

// controllers
const AuthController = require("./controllers/Auth");
const RebahansController = require("./controllers/Rebahans");

// midlewares authentication
const { authenticated } = require("./middlewares");

// group routes here
app.group("/api/v1", router => {
  // Home page route
  router.get("/", (req, res) => {
    res.send("Hello this is RebahanYuk server");
  });
  // Login API
  router.post("/login", AuthController.login);

  // Privates API
  router.get("/rooms", authenticated, RebahansController.showRooms);
  router.post("/room", authenticated, RebahansController.addRoom);
  router.put("/room/:room_id", authenticated, RebahansController.editRoom);
  router.get("/customers", authenticated, RebahansController.showCustomers);
  router.post("/customer", authenticated, RebahansController.addCustomer);
  router.put(
    "/customer/:cust_id",
    authenticated,
    RebahansController.editCustomer
  );
  router.get("/checkin", authenticated, RebahansController.showCheckIn);
  router.post("/checkin", authenticated, RebahansController.addCheckIn);
});

app.listen(port, () => console.log(`Listening on port ${port} !`));
