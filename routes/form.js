const express = require("express");
const router = express.Router();
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Thibault T",
  key: process.env.MAILGUN_API_KEY,
});

router.post("/form", async (req, res) => {
  try {
    // console.log(req.body);
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.message
    ) {
      res.json({ message: "Please fill all the informations" });
    } else {
      //   console.log(req.body);
      const messageData = {
        from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
        to: process.env.MAIL,
        subject: `Test formulaire`,
        text: req.body.message,
      };

      const response = await client.messages.create(
        process.env.MAILGUN_DOMAIN,
        messageData
      );
      console.log(response);
      res.status(200).json({ message: "Email has been send" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
