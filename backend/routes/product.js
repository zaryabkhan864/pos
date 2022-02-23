const express = require('express')
const router = express.Router();

const {getProducts,newProduct, getSingleProduct,updateProduct,deleteProduct } = require('../controllers/productController')
const{ isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')
router.route('/products').get(isAuthenticatedUser,authorizeRoles('admin'),getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isAuthenticatedUser,newProduct);

router.route('/admin/product/:id')
                                .put(updateProduct)
                                .delete(deleteProduct);
module.exports = router;