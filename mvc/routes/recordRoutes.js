const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");

router.get("/znj", recordController.createRecord);
router.get("/znj2", recordController.editRecord);
router.post("/znj3", recordController.getRecord);
router.post("/znj4", recordController.getRecords);
router.post("/znj5", recordController.deleteRecord);

module.exports = router;
