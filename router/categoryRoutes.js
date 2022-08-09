const router = require('express').Router();
const { getCategory,getSinglecategory,postCategory,updateCategory } = require('../controller/categoryController')

router.get('/',getCategory)
router.get('/:id',getSinglecategory)
router.post('/',postCategory)
router.patch('/:id',updateCategory)

module.exports = router