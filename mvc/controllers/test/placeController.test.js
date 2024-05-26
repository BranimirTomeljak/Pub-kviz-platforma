const request = require("supertest");
const express = require("express");
const placeController = require("../placeController");
const db = require("../../models");

const app = express();
app.use(express.json());
app.post("/znj", placeController.createPlace);
app.get("/znj4", placeController.getPlaces);

describe("placeController", () => {
  beforeAll(async () => {
    db.Lokal.create = jest.fn().mockResolvedValue({ id: 1, naziv: "Test Lokal" });
    db.Lokal.findAll = jest.fn().mockResolvedValue([{ id: 1, naziv: "Test Lokal" }]);
  });

  test("createPlace creates a new place and responds with 201 status", async () => {
    const res = await request(app).post("/znj").send({ naziv: "Test Lokal" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("naziv");
  });

  test("getPlaces responds with 200 status and returns all places", async () => {
    const res = await request(app).get("/znj4");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("places");
    expect(res.body.places).toHaveLength(1);
  });
});