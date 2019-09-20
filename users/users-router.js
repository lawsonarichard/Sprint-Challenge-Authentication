const users = require("./users-model");
const router = express.Router();
const authenticate = require("../auth/authenticate-middleware");

router.get("/", authenticate, (req, res) => {
  users
    .find()
    .then(users => {
      res.json({ users, loggedInUser: req.user.username });
    })
    .catch(err => res.send(err));
});

module.exports = router;
