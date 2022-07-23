exports.authUser = async (req, res) => {
    const Users = require('./models/Users')
    const Roles = require('./models/Roles')
   
    const user = await Users.findOne({
        where: {
            id: req.session.user_id,
        }
    })

    const role = await Roles.findOne({
        where: {
            id: user.role_id,
        }
    })

    let newUserRoleObj = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role_name: role.name,
        role_id: role.id,
    }

    return newUserRoleObj
}

exports.generateSlug = async (string) => {
    return string.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

exports.fileCustomUpload = async (req, res, filepath, filetoupload) => {
    let sampleFile;
    let uploadPath;
    let newFileName;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sampleFile = filetoupload
    newFileName = String(Math.floor(Math.random() * 900000)) + sampleFile.name.replace(' ', '').toLowerCase()
    uploadPath = __dirname + '/public/uploads/' + filepath + newFileName

    sampleFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
            res.send('File uploaded!');
        }
    })
    
    return newFileName
}

exports.deleteFile = async (path, file) => {
    const fs = require('fs');
    fs.unlink(__dirname + '/public/uploads/' + path + '/' + file, function (err) {
        // if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}