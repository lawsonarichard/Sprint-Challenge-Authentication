const express = require("express");

const router = express.Router();
const users = require("./users-model");
const restricted = require("../auth/authenticate-middleware.js");
router.get("/", restricted, (req, res) => {
  users
    .find()
    .then(users => {
      res.json({ users, loggedInUser: req.user.username });
    })
    .catch(err => res.send(err));
});

module.exports = router;
