const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

router.get("/znj", placeController.createPlace);
router.post("/znj4", placeController.getPlaces);

module.exports = router;
