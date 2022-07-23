const helper = require('../helper')
const Roles = require('../models/Roles')

exports.index = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    const roles = await Roles.findAll()

    res.render('roles/index', {   
        path: req.path,
        title: 'Roles',
        style: 'roles/style',
        script: 'roles/script',
        authUser: authUser,
        roles: roles,
    })
}

exports.store = async (req, res) => {
    const data_store = {
        name: req.body.name,
    }

    await Roles.create(data_store)

    res.status(200).json({
        error: false,
        data: [],
        message: "Data added successfully!",
    })
}

exports.edit = async (req, res) => {
    const id = req.params.id

    const role = await Roles.findOne({
        where: {
            id: id,
        }
    })

    res.status(200).json({
        error: false,
        data: role,
        message: "Data found!",
    })
}

exports.update = async (req, res) => {
    const id = req.params.id

    const data_update = {
        name: req.body.name,
    }

    await Roles.update(data_update, {
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

    await Roles.destroy({
        where: {
            id: id,
        }
    })

    res.status(200).json({
        error: false,
        data: [],
        message: "Data deleted successfully!",
    })
}