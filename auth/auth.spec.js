const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("auth router ", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should get 201", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "Test2", password: "password" })
      .set("Accept", "application/json");

    expect(res.status).toBe(201);
  });

  it("should hash the password", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "Test2", password: "password" });

    expect(res.body.password).not.toBe("123");
  });

  it("logging in will return stats 200", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "Test2", password: "password" });
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "Test2", password: "password" })
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
  });

  it("logging in should create a token", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "Test2", password: "password" });
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "Test2", password: "password" })
      .set("Accept", "application/json");

    expect(res.body.token).toBeTruthy();
  });
});
