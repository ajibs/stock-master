const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/', stockController.showHome);
router.get('/error', stockController.showError);

router.post('/add-stock', stockController.addStock);
router.get('/remove-stock/:company', stockController.removeStock);


module.exports = router;
