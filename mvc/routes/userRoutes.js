const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/znj/:email", userController.getUser);
router.get("/", userController.getUsers);

module.exports = router;
