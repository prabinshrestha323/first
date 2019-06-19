const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

//load router
app.get("/", (req, res) => {
  res.render("home");
});

//load router form
app.get("/form", (req, res) => {
  res.render("form");
});
app.post("/form", (req, res) => {
  const User = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  User.save();
  res.redirect("/about");
});
app.get("/about", (req, res) => {
  User.find().then(users => {
    res.render("about", {
      user: users
    });
  });
});

//load models
require("./models/User");
const User = mongoose.model("users");
//middleware of mongodb
mongoose.connect("mongodb://localhost/prabinDon", { useNewUrlParser: true });
console.log("mongo is conneted");

//load middleware handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.listen(4445, (req, res) => {
  console.log("port no 4445");
});
