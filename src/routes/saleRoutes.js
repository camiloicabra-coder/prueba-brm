
const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.post('/', saleController.createSale);
router.get('/', saleController.getAllSales);
router.get('/user/:userId', saleController.getSalesByUser);

module.exports = router;
