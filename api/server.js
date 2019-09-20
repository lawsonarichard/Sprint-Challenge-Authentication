const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");
const usersRouter = require("../users/users-model");

const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("../database/dbConfig");

const server = express();

const sessionConfig = {
  name: "joke", // would name the cookid sid by default
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 60, // in milliseconds
    secure: false, // true means only send cookie over https
    httpOnly: true // true means JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: true, // GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    createTable: true,
    tablename: "knexsessions",
    sidfieldname: "sessionid",
    clearInterval: 1000 * 60 * 30
  })
};

server.use(helmet());
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3300"
  })
);
server.use(express.json());
server.use(session(sessionConfig));
server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

module.exports = server;
