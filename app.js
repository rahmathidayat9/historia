const express = require('express')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash');
const fileUpload = require('express-fileupload')

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "secret",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser('secret'));
app.use(flash());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// static
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + 'public/uploads'))
app.use('/assets', express.static(__dirname + 'public/assets'))
app.use('/templates', express.static(__dirname + 'public/templates'))

app.set('layout', './layouts/app', {
    test: "OKOKOK",
})
app.set('view engine', 'ejs')
app.use(expressLayouts);

const webRouter = require('./routes/web')
const apiRouter = require('./routes/api')

app.use('/', webRouter)
app.use('/', apiRouter)

app.use((req, res) => {
	res.status(404)
	res.render('errors/404', {
        layout: false,
    })
})

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})