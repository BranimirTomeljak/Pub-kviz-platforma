const db = require("../models");
const logger = require("../config/logger");
const { Op } = require("sequelize");

exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = await db.Kviz.create(req.body);

    const newOdrzavanjeKviza = await db.OdrzavanjeKviza.create({
      idkviza: newQuiz.id,
      idorganizatora: req.body.userId,
      idlokala: 1
    });

    res.status(201).json({ newQuiz, newOdrzavanjeKviza });
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
          include: [{
            model: db.Tim,
          }]
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
    const { naziv } = req.query;

    const whereClause = naziv ? { naziv: { [Op.iLike]: `%${naziv}%` } } : {};

    const quizes = await db.Kviz.findAll({
      where: whereClause,
      include: [{
        model: db.Pripada,
        include: [{
          model: db.Zapis,
          include: [{
            model: db.Tim,
          }]
        }]
      },
      {
        model: db.OdrzavanjeKviza,
        include: [{
          model: db.Organizator,
          include: [{
            model: db.Korisnik
          }]
        }]
      }
    ]
    });
    res.status(200).json({ quizes });
  } catch (error) {
    res.status(500).send(error.message);
  }
};