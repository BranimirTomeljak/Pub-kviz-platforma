const express = require('express');
const router = express.Router();

const placeRoutes = require('./placeRoutes');
const quizRoutes = require('./quizRoutes');
const recordRoutes = require('./recordRoutes');
const teamRoutes = require('./teamRoutes');
const userRoutes = require('./userRoutes');

router.use('/place', placeRoutes);
router.use('/quiz', quizRoutes);
router.use('/record', recordRoutes);
router.use('/team', teamRoutes);
router.use('/user', userRoutes);

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
