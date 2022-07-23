const Users = require('../models/Users')
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    res.render('auth/login', {
        layout: false,
    })
}

exports.loginPost = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const findUser = await Users.findOne({where: {
        email: email,
    }})

    if (findUser) {
        if (await bcrypt.compare(password, findUser.password) == true) {
            let session = req.session
            session.user_id = findUser.id
            res.redirect('/dashboard')
        }else {
            res.redirect('/auth/login')
        }
    }else {
        res.redirect('/auth/login')
    }
}

exports.logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login')
}

exports.register = async (req, res) => {
    res.send('Register')
}