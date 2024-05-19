const db = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await db.Korisnik.findAll();
    res.render("users", { users });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { id, email } = req.body;
    const newUser = await db.Korisnik.create({ id, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
