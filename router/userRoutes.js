const router = require('express').Router();
const { getUser,postUser,LoggedInUser,forgetPassword,resetPassword } = require('../controller/userController')

router.get('/',getUser);
router.post('/',postUser);
router.post('/logged',LoggedInUser);
router.post('/forget',forgetPassword)
router.patch('/reset',resetPassword)

module.exports = router;