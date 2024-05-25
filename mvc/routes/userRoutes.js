const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/znj/:id", userController.getUser);
router.get("/", userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
