const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

router.get("/znj4", placeController.getPlaces);
router.post("/znj", placeController.createPlace);

module.exports = router;
