const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");

router.post("/create", recordController.createRecord);
router.post("/znj2/:id", recordController.editRecord);
router.get("/znj3/:id", recordController.getRecord);
router.get("/znj4/:idKviza", recordController.getRecords);
router.post("/znj5/:id", recordController.deleteRecord);

module.exports = router;
