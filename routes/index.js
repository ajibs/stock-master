const express = require('express');
const stockController = require('../controllers/stockController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/', catchErrors(stockController.showHome));

router.get('/add-stock/:company', catchErrors(stockController.addStock));
router.get('/remove-stock/:company', catchErrors(stockController.removeStock));


module.exports = router;
