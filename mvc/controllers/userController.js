const db = require('../models');
const logger = require('../config/logger');

exports.getUsers = async (req, res) => {
  try {
    const users = await db.Korisnik.findAll();
    res.render('users', { users });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { id, email } = req.body;
    const newUser = await db.Korisnik.create({ id, email });
    logger.info(`User created: ${newUser.email}`);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
