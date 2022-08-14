const router = require('express').Router();
const { getUser,postUser,LoggedInUser } = require('../controller/userController')

router.get('/',getUser);
router.post('/',postUser);
router.post('/logged',LoggedInUser);

module.exports = router;