require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(bodyParser.json());

// controllers
const AuthController = require("./controllers/Auth");

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
});

app.listen(port, () => console.log(`Listening on port ${port} !`));
