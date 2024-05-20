const db = require("../models");
const logger = require("../config/logger");

exports.createTeam = async (req, res) => {
  try {
    const newTeam = await db.Tim.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.editTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Tim.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedTeam = await db.Tim.findOne({ where: { id: id } });
      res.status(200).json({ team: updatedTeam });
    } else {
      res.status(404).send("Team not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await db.Tim.findOne({ where: { id: id } });
    if (team) {
      res.status(200).json({ team });
    } else {
      res.status(404).send("Team not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await db.Tim.findAll();
    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
