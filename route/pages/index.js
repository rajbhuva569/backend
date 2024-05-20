const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('pages/index');
});
router.get('/blog', (req, res) => {
    res.render('pages/blog');
});
router.get('/class', (req, res) => {
    res.render('pages/class');
});
router.get('/about', (req, res) => {
    res.render('pages/about');
});



module.exports = router