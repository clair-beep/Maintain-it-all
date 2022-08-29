const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const  Task = require('../models/Tasks')
// @desc login/landing page
// @route GET/ 

router.get('/', ensureGuest, (req, res) => {
    //The res. render() function is used to render a view and sends the rendered HTML string to the client
    res.render('login', {
        layout: 'login',
    })
})

// @desc Dashboard
// @route GET/ tasks

router.get('/tasks',ensureAuth, async(req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).lean()
        res.render('main', {
            name: req.user.firstName,
            tasks
        })

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

}) 



module.exports = router