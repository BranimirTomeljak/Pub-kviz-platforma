const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

router.post("/create", placeController.createPlace);
router.get("/znj", placeController.getPlaces);

module.exports = router;
