const express = require('express')
const { buyproduct, buydatashow, Tranction } = require('../../controller/BuyController')
const authorize = require('../../utils')
const router = express.Router()

router.post('/', authorize(["user"]), buyproduct)
router.get('/datashow', authorize(["admin", "user"]), buydatashow)
router.get('/transction',authorize(["admin"]),Tranction)




module.exports = router