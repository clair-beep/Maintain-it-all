const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')
const Tasks = require('../models/Tasks')

//@desc Showw add page
//@Route GET /tasks/add
router.get('/add', ensureAuth, (req,res) => {
    res.render('tasks/add')
})


//@desc Process add form
//@Route POST /tasks
router.post('/', ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id
        await Tasks.create(req.body)
                
        res.redirect('/tasks')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router

