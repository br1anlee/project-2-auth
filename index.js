const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')
require('dotenv').config()

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.static("static"))

// AUTHENTICATION MIDDLEWARE
app.use(async (req, res, next)=>{
    if(req.cookies.userId) {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        const user = await db.user.findByPk(decryptedIdString)
        res.locals.user = user
    } else res.locals.user = null
    next()
})

// CONTROLLERS
app.use('/login', require('./controllers/login.js'))
app.use('/register', require('./controllers/register.js'))
app.use('/search', require('./controllers/recipe.js'))
app.use('/faves', require('./controllers/fave.js'))

// ROUTES
app.get('/', (req, res)=>{
    res.render('home')
})


// Logout
app.get('/logout', (req, res)=>{
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

app.listen(8000, ()=>{
    console.log('Bytez')
})