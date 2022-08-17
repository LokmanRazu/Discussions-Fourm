const router = require('express').Router();
const { getUser,postUser,LoggedInUser,forgetPassword } = require('../controller/userController')

router.get('/',getUser);
router.post('/',postUser);
router.post('/logged',LoggedInUser);
router.post('/forget',forgetPassword)

module.exports = router;