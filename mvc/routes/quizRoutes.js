const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/znj", quizController.createQuiz);
router.get("/znj2", quizController.editQuiz);
router.post("/znj3", quizController.getQuiz);
router.post("/znj4", quizController.getQuizes);

module.exports = router;
