const request = require("supertest");
const express = require("express");
const recordController = require("../recordController");
const db = require("../../models");

const app = express();
app.use(express.json());
app.post("/create", recordController.createRecord);
app.post("/znj2/:id", recordController.editRecord);
app.get("/znj3/:id", recordController.getRecord);
app.get("/znj4/:idKviza", recordController.getRecords);
app.post("/znj5/:id", recordController.deleteRecord);

describe("recordController", () => {
  beforeAll(async () => {
    db.Zapis.create = jest.fn().mockResolvedValue({ id: 1 });
    db.Pripada.create = jest.fn().mockResolvedValue({ idzapisa: 1, idkviza: 1 });
    db.Zapis.update = jest.fn().mockResolvedValue([1]);
    db.Zapis.findOne = jest.fn().mockResolvedValue({ id: 1 });
    db.Zapis.destroy = jest.fn().mockResolvedValue(1);
    db.Kviz.findOne = jest.fn().mockResolvedValue({
      Pripadas: [{ idzapisa: 1, idkviza: 1, Zapi: { id: 1 } }]
    });
  });

  test("createRecord creates a new record and responds with 201 status", async () => {
    const res = await request(app).post("/create").send({ idkviza: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("newRecord");
    expect(res.body).toHaveProperty("newPripada");
  });

  test("editRecord updates a record and responds with 200 status", async () => {
    const res = await request(app).post("/znj2/1").send({ idkviza: 1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("record");
  });

  test("getRecord responds with 200 status and returns a record", async () => {
    const res = await request(app).get("/znj3/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("record");
  });

  test("getRecords responds with 200 status and returns all records", async () => {
    const res = await request(app).get("/znj4/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  test("deleteRecord deletes a record and responds with 204 status", async () => {
    const res = await request(app).post("/znj5/1");
    expect(res.statusCode).toEqual(204);
  });
});