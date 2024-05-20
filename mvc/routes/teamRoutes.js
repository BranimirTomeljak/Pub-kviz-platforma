const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/znj", teamController.createTeam);
router.get("/znj2", teamController.editTeam);
router.post("/znj3", teamController.getTeam);
router.post("/znj4", teamController.getTeams);

module.exports = router;
