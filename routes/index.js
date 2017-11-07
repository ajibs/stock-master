const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/', stockController.showHome);
router.get('/error', stockController.test);

module.exports = router;
