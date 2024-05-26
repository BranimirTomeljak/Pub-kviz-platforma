const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

router.post("/znj", placeController.createPlace);
router.get("/znj4", placeController.getPlaces);

module.exports = router;
