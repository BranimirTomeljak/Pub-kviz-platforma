const db = require("../models");
const logger = require("../config/logger");

exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = await db.Kviz.create(req.body);
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.editQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Kviz.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedQuiz = await db.Kviz.findOne({ where: { id: id } });
      res.status(200).json({ quiz: updatedQuiz });
    } else {
      res.status(404).send("Quiz not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await db.Kviz.findOne({
      where: { id: id },
      include: [{
        model: db.Pripada,
        include: [{
          model: db.Zapis,
        }]
      }]
    });
    if (quiz) {
      res.status(200).json({ quiz });
    } else {
      res.status(404).send("Quiz not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getQuizes = async (req, res) => {
  try {
    const quizes = await db.Kviz.findAll({
      include: [{
        model: db.Pripada,
        include: [{
          model: db.Zapis,
          include: [{
            model: db.Tim,
          }]
        }]
      }]
    });
    res.status(200).json({ quizes });
  } catch (error) {
    res.status(500).send(error.message);
  }
};