const express = require('express')
const bodyParser = require('body-parser'); // Add this line

const multer = require('multer')
const authorize = require('../../utils')
const { studentadddata, studentgetonedata, studentgetdata, studenteditdata, studentdeletedata } = require('../../controller/StudentController')
const { validate } = require('../../utils/validate')
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        const imagename = file.fieldname + '-' + Date.now() + `.${extension}`
        req.body = { ...req.body, imagename }
        cb(null, imagename)
    }
})
const upload = multer({ storage: storage })

router.get('/', authorize(["admin", "user"]), studentgetdata)
router.get('/:id', authorize(["admin", "user"]), studentgetonedata)
router.post('/', authorize(["admin", "user"]), upload.single('image'), validate("addStudentschema"), studentadddata)

router.put('/edit/:id', authorize(["admin", "user"]), upload.single('image'), studenteditdata)
router.delete('/delete/:id', authorize(["admin", "user"]), studentdeletedata)

// router.get('/', authorize(["admin", "user"]), studentgetdata)
// router.get('/:id', authorize(["admin", "user"]), studentgetonedata)
// router.post('/', authorize(["admin", "user"]), upload.single('image'), studentadddata)

// router.put('/edit/:id', authorize(["admin"]), studenteditdata)
// router.delete('/delete/:id', authorize(["admin"]), studentdeletedata)
module.exports = router