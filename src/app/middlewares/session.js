function onlyUsers(req, res, next) {
    if(!req.session.userId)
        return res.redirect("/users/login")
    
    next()
}

function isLoggedRedirectToUser(req, res, next) {
    if(req.session.userId)
        return res.redirect("/users")

    next()
}

module.exports = {
    onlyUsers,
    isLoggedRedirectToUser
}