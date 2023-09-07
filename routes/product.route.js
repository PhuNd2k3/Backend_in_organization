const express = require('express');
const ProductApiControllers = require('../controllers/api/product.controller')
const router = express.Router();
const {uploadImage} = require('../helpers/uploads'); 
const productController = require('../controllers/api/product.controller');

router.get('/', ProductApiControllers.getListProduct)

router.get('/sale/', ProductApiControllers.getSaleProducts)

router.get('/info/:id', ProductApiControllers.getProductInfo)

router.get('/:id', ProductApiControllers.getProductById)

router.get('/category/:id', ProductApiControllers.getProductByCategoryId)

router.get('/findProductDetailId/:productId',ProductApiControllers.getProductDetailIdByInfo)

var imageNames = [];

router.post('/',ProductApiControllers.createNewProduct)

router.post('/addPictures', uploadImage("product_images", imageNames).array("images", 20), (req,res) => {
    req.body.images = imageNames
    ProductApiControllers.createNewProductPictures(req,res)
    imageNames.splice(0, imageNames.length);
})

router.patch('/:id', ProductApiControllers.updateById)

router.delete('/:id', ProductApiControllers.softDeleteById)

module.exports = router