const helper = require('../helper')
const Users = require('../models/Users')
const Roles = require('../models/Roles')
const sequelize = require('../config/database')
const bcrypt = require('bcrypt')

exports.index = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    const users = await sequelize.query("SELECT a.id,a.name,a.email,a.role_id,b.name AS role_name FROM users a JOIN roles b ON a.role_id=b.id", {
        type: sequelize.QueryTypes.SELECT,
    })
    
    const roles = await Roles.findAll()

    res.render('users/index', {
        path: req.path,
        title: 'Users',
        style: 'users/style',
        script: 'users/script',
        authUser: authUser,
        users: users,
        roles: roles,
    })
}

exports.store = async (req, res) => {
    const data_store = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        role_id: req.body.role_id,
    }

    await Users.create(data_store)

    res.status(200).json({
        error: false,
        data: [],
        message: "Data added succesfully!",
    })
}

exports.edit = async (req, res) => {
    const id = req.params.id

    const user = await Users.findOne({
        where: {
            id: id,
        }
    })
    
    res.status(200).json({
        error: false,
        data: user,
        message: "Data found succesfully!",
    })
}

exports.update = async (req, res) => {
    const id = req.params.id

    const user = await Users.findOne({
        where: {
            id: id,
        }
    })

    const data_update = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password.length == 0 ? user.password : await bcrypt.hash(req.body.password, 10),
        role_id: req.body.role_id,
    }

    await Users.update(data_update, {
        where: {
            id: id,
        }
    })

    res.status(200).json({
        error: false,
        data: [],
        message: "Data updated successfully!",
    })
}

exports.destroy = async (req, res) => {
    const id = req.body.id

    await Users.destroy({
        where: {
            id: id,
        }
    })

    res.status(200).json({
        error: false,
        data: [],
        message: "Data deleted succesfully!",
    })
}