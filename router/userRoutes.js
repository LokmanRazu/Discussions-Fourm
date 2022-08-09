const router = require('express').Router();
const { getUser,postUser } = require('../controller/userController')

router.get('/',getUser);
router.post('/',postUser);

module.exports = router;