const db = require("../models");
const logger = require("../config/logger");

exports.createRecord = async (req, res) => {
  try {
    const newRecord = await db.Zapis.create(req.body);
    const newPripada = await db.Pripada.create({ idzapisa: newRecord.id, idkviza: req.body.idkviza });
    res.status(201).json({ newRecord, newPripada });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.editRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Zapis.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedRecord = await db.Zapis.findOne({ where: { id: id } });
      res.status(200).json({ record: updatedRecord });
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await db.Zapis.findOne({ where: { id: id } });
    if (record) {
      res.status(200).json({ record });
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.getRecords = async (req, res) => {
  try {
    const { idKviza } = req.params;
    const kviz = await db.Kviz.findOne({
      where: { id: idKviza },
      include: [{
        model: db.Pripada,
        include: [{
          model: db.Zapis,
        }]
      }]
    });
    if (kviz) {
      const records = kviz.Pripadas.map(pripada => ({
        idzapisa: pripada.idzapisa,
        idkviza: pripada.idkviza,
        Zapi: pripada.Zapi
      }));
      res.status(200).json(records);
    } else {
      res.status(404).send("Records not found");
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Zapis.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(204).send("Record deleted");
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};
