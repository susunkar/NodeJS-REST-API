const express = require('express')
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');

router.get('/', productController.product_get_all);
router.post('/', checkAuth, productController.product_create);
router.get('/:productId', checkAuth, productController.product_get_byId);
router.patch('/:productId', checkAuth, productController.product_patch_byId);
router.delete('/:productId', checkAuth, productController.product_delete_byId);


module.exports = router;