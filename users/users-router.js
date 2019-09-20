const express = require("express");

const router = express.Router();
const users = require("./users-model");

router.get("/", (req, res) => {
  users
    .find()
    .then(users => {
      res.json({ users, loggedInUser: req.user.username });
    })
    .catch(err => res.send(err));
});

module.exports = router;
