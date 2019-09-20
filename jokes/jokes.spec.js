const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("jokes router ", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("get request should get 401 as not logged in", async () => {
    const res = await request(server)
      .get("/api/jokes")
      .set("Accept", "application/json");

    expect(res.status).toBe(401);
  });
});
