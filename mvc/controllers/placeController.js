const db = require("../models");
const logger = require("../config/logger");

exports.createPlace = async (req, res) => {
  try {
    const newPlace = await db.Lokal.create(req.body);
    res.status(201).json(newPlace);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await db.Lokal.findAll();
    res.status(200).json({ places });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};
