const users = require("./jokes-router");
const db = require("../database/dbConfig");

it("Gets the test endpoint", async done => {
  // Sends GET Request to /api/jokes endpoint
  const res = await request.get("/api/jokes");

  // ...
  done();
});
it("gets the test endpoint", async done => {
  const response = await request.get("/api/jokes");

  expect(response.status).toBe(400);
  expect(response.body.message).toBe("pass!");
  done();
});
