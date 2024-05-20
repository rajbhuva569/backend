const express = require('express')
const multer = require('multer')
// import { unlink } from 'node:fs';
const { getdata, adddata, editdata, deletedata, onegetdata } = require('../../controller/productController')

const authorize = require('../../utils')
const { validate } = require('../../utils/validate')
const router = express.Router()
// const { unlink } = require('fs/promises');

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

// unlink('public/upload', (err) => {
//   if (err) throw err;
//   console.log('successfully deleted /tmp/hello');
// });
// router.get('/', authorize(["admin", "user"]), getdata)
// router.get('/:id', authorize(["admin", "user"]), onegetdata)
// router.post('/', authorize(["admin"]), upload.single('image'), adddata)

// router.put('/edit/:id', authorize(["admin"]), editdata)
// router.delete('/delete/:id', authorize(["admin"]), deletedata)

router.get('/', authorize(["admin", "user"]), getdata)
router.get('/:id', authorize(["admin", "user"]), onegetdata)
router.post('/', authorize(["admin"]), upload.single('image'), validate("addproductschema"), adddata)
router.put('/edit/:id', authorize(["admin"]), upload.single('image'), validate("editproductschema"), editdata)
router.delete('/delete/:id', authorize(["admin"]), deletedata)
module.exports = router