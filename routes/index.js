const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
// @desc login/landing page
// @route GET/ 

router.get('/', ensureGuest, (req, res) => {
    //The res. render() function is used to render a view and sends the rendered HTML string to the client
    res.render('login', {
        layout: 'login',
    })
})

// @desc Dashboard
// @route GET/ dashboard

router.get('/pending',ensureAuth, (req, res) => {
    res.render('main', {
        name: req.user.firstName
    })
}) 



module.exports = router