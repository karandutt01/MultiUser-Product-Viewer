const express = require('express');
const router = express.Router();


const { addProduct, productList } = require('../controllers/ProductController')
const authMiddleware = require('../middleware/validateTokenHandler')
const uploadFile = require('../middleware/uploadFile')

router.route('/add-product').post(authMiddleware, uploadFile.single('image'),  addProduct)
router.route('/product-list').get(authMiddleware, productList)

module.exports = router