const request = require("supertest");
const express = require("express");
const teamController = require("../teamController");
const db = require("../../models");

const app = express();
app.use(express.json());
app.post("/znj", teamController.createTeam);
app.post("/znj2/:id", teamController.editTeam);
app.get("/znj3/:id", teamController.getTeam);
app.get("/znj4", teamController.getTeams);

describe("teamController", () => {
  beforeAll(async () => {
    db.Tim.create = jest.fn().mockResolvedValue({ id: 1, name: "Test Team" });
    db.Tim.update = jest.fn().mockResolvedValue([1]);
    db.Tim.findOne = jest.fn().mockResolvedValue({ id: 1, name: "Test Team" });
    db.Tim.findAll = jest.fn().mockResolvedValue([{ id: 1, name: "Test Team" }]);
  });

  test("createTeam creates a new team and responds with 201 status", async () => {
    const res = await request(app).post("/znj").send({ name: "Test Team" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
  });

  test("editTeam updates a team and responds with 200 status", async () => {
    const res = await request(app).post("/znj2/1").send({ name: "Updated Team" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("team");
  });

  test("getTeam responds with 200 status and returns a team", async () => {
    const res = await request(app).get("/znj3/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("team");
  });

  test("getTeams responds with 200 status and returns all teams", async () => {
    const res = await request(app).get("/znj4");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("teams");
  });
});