const helper = require('../helper')
const Posts = require('../models/Posts')
const Categories = require('../models/Categories')

exports.index = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    let posts = null;
    
    if (authUser.role_name == 'admin' || authUser.role_name == 'moderator') {
        posts = await Posts.findAll()    
    }else {
        posts = await Posts.findAll({
            where: {
                user_id: authUser.id,
            },
        })    
    }

    res.render('posts/index', {
        path: req.path,
        title: 'Posts',
        style: 'posts/style',
        script: 'posts/script',
        authUser: authUser,
        posts: posts,
    })
}

exports.create = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    const categories = await Categories.findAll()

    res.render('posts/create', {
        path: req.path,
        title: 'Posts Create',
        style: 'posts/style',
        script: 'posts/script',
        authUser: authUser,
        categories: categories,
    })
}

exports.store = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    const date = new Date()
    const thumbnail = await helper.fileCustomUpload(req, res, 'posts/', req.files.thumbnail)

    const data_store = {
        title: req.body.title,
        slug: await helper.generateSlug(req.body.title),
        thumbnail: thumbnail,
        body: req.body.body,
        user_id: authUser.id,
        category_id: req.body.category_id,
        date_created: date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate(),
    }

    await Posts.create(data_store)

    res.status(200).json({
        error: false,
        data: [],
        message: "Posts uploaded successfully!",
    })
}

exports.detail = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    const id = req.params.id

    const post = await Posts.findOne({
        where: {
            id: id,
        }
    })

    res.render('posts/detail', {
        path: req.path,
        title: 'Posts',
        style: 'posts/style',
        script: 'posts/script',
        authUser: authUser,
        post: post,
    })
}

exports.edit = async (req, res) => {
    const authUser = await helper.authUser(req, res)
    const id = req.params.id
    const post = await Posts.findOne({
        where: {
            id: id,
        }
    })
    const categories = await Categories.findAll()


    res.render('posts/edit', {
        path: req.path,
        title: 'Posts Edit',
        style: 'posts/style',
        script: 'posts/script',
        authUser: authUser,
        post: post,
        categories: categories,
    })
}

exports.update = async (req, res) => {
    const id = req.params.id
    const post = await Posts.findOne({
        where: {
            id: id,
        }
    })
    
    let files = req.files
    let thumbnail = null;

    if(files) {
        if (files.thumbnail_edit) {
            thumbnail = await helper.fileCustomUpload(req, res, 'posts/', req.files.thumbnail_edit)
            await helper.deleteFile('posts', post.thumbnail)
        }
    }else {
        thumbnail = post.thumbnail
    }

    const data_update = {
        title: req.body.title_edit,
        slug: await helper.generateSlug(req.body.title_edit),
        thumbnail: thumbnail,
        body: req.body.body_edit,
        category_id: req.body.category_id_edit,
    }

    await Posts.update(data_update, {
        where: {
            id: id,
        }
    })

    res.status(200).json({
        error: false,
        data: [],
        message: "Posts updated successfully!",
    })
}

exports.destroy = async (req, res) => {
    const id = req.body.id
    
    const post = await Posts.findOne({
        where: {
            id: id,
        }
    })

    await helper.deleteFile('posts', post.thumbnail)

    await Posts.destroy({
        where: {
            id: id,
        }
    })

    res.status(200).json({
        error: false,
        data: [],
        message: "Posts deleted successfully!",
    })
}