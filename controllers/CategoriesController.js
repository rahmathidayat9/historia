const helper = require('../helper')
const Categories = require('../models/Categories')

exports.index = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    const categories = await Categories.findAll()

    res.render('categories/index', {
        path: req.path,
        title: 'Categories',
        style: 'categories/style',
        script: 'categories/script',
        authUser: authUser,
        categories: categories,
    })
}

exports.store = async (req, res) => {
    const data_store = {
        name: req.body.name,
        slug: await helper.generateSlug(req.body.name),
    }

    await Categories.create(data_store)

    res.status(200).json({
        error: false,
        data: [],
        message: "Data added successfully!",
    })
}

exports.edit = async (req, res) => {
    const id = req.params.id

    const category = await Categories.findOne({
        where: {
            id: id,
        }
    })

    res.status(200).json({
        error: false,
        data: category,
        message: "Data found!",
    })
}

exports.update = async (req, res) => {
    const id = req.params.id
    
    const data_update = {
        name: req.body.name,
        slug: await helper.generateSlug(req.body.name),
    }

    await Categories.update(data_update, {
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

    await Categories.destroy({
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