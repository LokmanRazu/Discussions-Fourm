const router = require('express').Router();
const { getCategory,getSinglecategory,postCategory,updateCategory,deleteCategory } = require('../controller/categoryController');
const { authentication } = require('../middleware/authMiddleware')

router.get('/',authentication,getCategory);
router.get('/:id',getSinglecategory);
router.post('/',postCategory);
router.patch('/:id',updateCategory);
router.delete('/:id',deleteCategory);

module.exports = router;