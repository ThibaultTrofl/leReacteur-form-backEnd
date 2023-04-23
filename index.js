const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const formRoutes = require("./routes/form");
app.use(formRoutes);

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Thibault TROFLEAU",
  key: process.env.MAILGUN_API_KEY,
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen("3000", () => {
  console.log("Server has started");
});
