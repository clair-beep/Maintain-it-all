//protect  routes 

// this will evaluate if a user is auth with Google to reroute  them properly
module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()

        } else {
            res.redirect('/')
        }
    },

    ensureGuest: function (req, res, next) {
        if(req.isAuthenticated()) {
            res.redirect('/tasks')
        } else {
            return next()
        }
    }
}