const db = require("../models");
const logger = require("../config/logger");

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await db.Korisnik.create({ email });
    logger.info(`User created: ${newUser.email}`);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await db.Korisnik.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await db.Korisnik.findAll();
    res.render("users", { users });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
