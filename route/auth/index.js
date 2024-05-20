const express = require('express')
const { loginto, emailverfication, resetpassword, optverfication } = require('../../controller/loginController')
const { singupto } = require('../../controller/singupController')
const authority = require('../../utils')
const { validate } = require('../../utils/validate')
const router = express.Router()




router.post('/login', validate("Loginschema"),loginto)
// router.post('/singup',validate("Singupschema"), singupto)
router.post('/singup', singupto)

// router.post('/emailverfication',validate("emailschema"), emailverfication)
router.post('/emailverfication', emailverfication)

router.post('/optverfication', optverfication)
router.post('/resetpassword', resetpassword)




module.exports = router