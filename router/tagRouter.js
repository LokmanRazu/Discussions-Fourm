const router = require('express').Router();

const { getSingleTag,getTag,postTag,updateTag,deteleTag } = require('../controller/tagController')

router.get('/:id',getSingleTag);
router.get('/',getTag);
router.post('/',postTag);
router.patch('/:id',updateTag);
router.delete('/:id',deteleTag);

module.exports = router;