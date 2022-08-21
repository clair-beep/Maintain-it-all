const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')

const Story = require('../models/Tasks')

//@desc Showw add page
//@Route GET /pending/add
router.get('/add', ensureAuth, (req,res) => {
    res.render('tasks/add')
})



module.exports = router