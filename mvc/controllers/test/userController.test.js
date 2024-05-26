const request = require("supertest");
const express = require("express");
const userController = require("../userController");
const db = require("../../models");

const app = express();
app.use(express.json());
app.post("/create", userController.createUser);
app.get("/znj/:email", userController.getUser);
app.get("/", userController.getUsers);

describe("userController", () => {
  beforeAll(async () => {
    db.Korisnik.create = jest.fn().mockResolvedValue({ id: 1, email: "test@test.com" });
    db.Organizator.create = jest.fn().mockResolvedValue({ id: 1 });
    db.Korisnik.findOne = jest.fn().mockResolvedValue({ id: 1, email: "test@test.com" });
    db.Korisnik.findAll = jest.fn().mockResolvedValue([{ id: 1, email: "test@test.com" }]);
  });

  test("createUser creates a new user and responds with 201 status", async () => {
    const res = await request(app).post("/create").send({ email: "test@test.com" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
  });

  test("getUser responds with 200 status and returns a user", async () => {
    const res = await request(app).get("/znj/test@test.com");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
  });

  test("getUsers responds with 200 status and returns all users", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("users");
  });
});