exports.auth = (req, res, next) => {
    console.log("OKOK")
    if(req.session.user_id != null) {
        next()
    }else {
        res.redirect('/auth/login')
    }
}

exports.guest = (req, res, next) => {
    if(req.session.user_id == null) {
        next()
    }else {
        res.redirect('/dashboard')
    }
}

exports.role = async (req, res, next, allow) => {
    const helper = require('./helper')
    const authUser = await helper.authUser(req, res)
    if (allow.includes(authUser.role_name)) {
        next()
    }else {
        res.redirect('/dashboard')
    }
}