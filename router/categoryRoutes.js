const router = require('express').Router();
const { getCategory,postCategory } = require('../controller/categoryController')

router.get('/',getCategory)
router.post('/',postCategory)

module.exports = router