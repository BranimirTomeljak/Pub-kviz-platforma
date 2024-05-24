const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/znj", quizController.createQuiz);
router.post("/znj2/:id", quizController.editQuiz);
router.get("/znj3/:id", quizController.getQuiz);
router.get("/znj4", quizController.getQuizes);

module.exports = router;
