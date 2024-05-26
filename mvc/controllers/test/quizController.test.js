const request = require("supertest");
const express = require("express");
const quizController = require("../quizController");
const db = require("../../models");

const app = express();
app.use(express.json());
app.post("/create", quizController.createQuiz);
app.put("/edit/:id", quizController.editQuiz);
app.get("/znj3/:id", quizController.getQuiz);
app.get("/znj4", quizController.getQuizes);

describe("quizController", () => {
  beforeAll(async () => {
    db.Kviz.create = jest.fn().mockResolvedValue({ id: 1, naziv: "Test Quiz" });
    db.OdrzavanjeKviza.create = jest.fn().mockResolvedValue({ idkviza: 1, idorganizatora: 1, idlokala: 1 });
    db.Kviz.update = jest.fn().mockResolvedValue([1]);
    db.Kviz.findOne = jest.fn().mockResolvedValue({ id: 1, naziv: "Test Quiz" });
    db.Kviz.findAll = jest.fn().mockResolvedValue([{ id: 1, naziv: "Test Quiz" }]);
  });

  test("createQuiz creates a new quiz and responds with 201 status", async () => {
    const res = await request(app).post("/create").send({ naziv: "Test Quiz", userId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("newQuiz");
    expect(res.body).toHaveProperty("newOdrzavanjeKviza");
  });

  test("editQuiz updates a quiz and responds with 200 status", async () => {
    const res = await request(app).put("/edit/1").send({ naziv: "Updated Quiz" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("quiz");
  });

  test("getQuiz responds with 200 status and returns a quiz", async () => {
    const res = await request(app).get("/znj3/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("quiz");
  });

  test("getQuizes responds with 200 status and returns all quizes", async () => {
    const res = await request(app).get("/znj4");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("quizes");
  });
});