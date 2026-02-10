const express = require('express');
const router = express.Router();


const { addProduct } = require('../controllers/ProductController')
const authMiddleware = require('../middleware/validateTokenHandler')

router.route('/add-product').post(authMiddleware, addProduct)

module.exports = router