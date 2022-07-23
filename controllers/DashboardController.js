const helper = require('../helper')
const Users = require('../models/Users')
const Roles = require('../models/Roles')
const Posts = require('../models/Posts')

exports.index = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    const totalUsers = await Users.count()
    const totalRoles = await Roles.count()
    const totalPosts = await Posts.count()

    res.render('dashboard', {
        path: req.path,
        title: 'Dashboard',
        style: false,
        script: false,
        authUser: authUser,
        totalUsers: totalUsers,
        totalRoles: totalRoles,
        totalPosts: totalPosts,
    })
}