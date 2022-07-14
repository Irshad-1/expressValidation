const express = require("express");
const app = express();

let users = [];

app.use(express.json());
function validation(req, res, next) {
  let { first_name, last_name, email, pincode, age, gender } = req.body;

  if (
    first_name != undefined &&
    last_name != undefined &&
    email != undefined &&
    pincode != undefined &&
    age != undefined &&
    gender != undefined
  ) {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      pincode.length == 6 &&
      age >= 1 &&
      age <= 100 &&
      (gender == "male" || gender == "female" || gender == "others")
    ) {
      next();
    } else {
      return res.status(400).send("Invalid Input");
    }
  } else {
    return res.status(400).send("Provide all input");
  }
}
function addUsers(req, res) {
  users.push(req.body);
  res.status(201).send("User created successfully");
}
function getUsers(req, res) {
  res.send(users);
}
app.post("/register", validation, addUsers);
app.get("/users", getUsers);

app.listen("3001");
