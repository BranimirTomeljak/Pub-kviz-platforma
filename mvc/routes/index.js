const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const nekiDrugiRouter = require('./nekiDrugiRouter');

router.use('/users', userRoutes);
router.use('/nekiDrugi', nekiDrugiRouter);

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
