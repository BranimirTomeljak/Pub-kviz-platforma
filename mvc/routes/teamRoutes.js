const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.post("/znj", teamController.createTeam);
router.post("/znj2/:id", teamController.editTeam);
router.get("/znj3/:id", teamController.getTeam);
router.get("/znj4", teamController.getTeams);

module.exports = router;
