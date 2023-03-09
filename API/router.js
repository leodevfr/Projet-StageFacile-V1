const express= require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const adminController = require('./controllers/adminController')


router.route('/sign-up')
    .get(userController.get)
    .post(userController.post)

router.route('/sign-in')
    .get(userController.getSignIn)
    .post(userController.postSignIn)

//BackOffice / Admin
router.route('/back-office')
    .get(adminController.get)

module.exports = router