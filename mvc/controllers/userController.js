const { User } = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("users", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.create({ name, email });
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
