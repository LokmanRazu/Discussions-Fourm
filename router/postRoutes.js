const router = require('express').Router();
const { getPost,getSinglePost,postPost,patchPost,deletePost } = require('../controller/postController');

router.get('/',getPost);
router.get('/:id',getSinglePost);
router.post('/',postPost);
router.patch('/:id',patchPost);
router.delete('/:id',deletePost);

module.exports = router;