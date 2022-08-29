const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const passport = require('passport')
const session = require('express-session')
const MongoClient = require('mongodb').MongoClient
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

//Load config
dotenv.config({ path: './config/config.env' })
require('dotenv').config()

//Passport config
require('./config/passport')(passport)


connectDB()

const app = express()

//Body parser (how the information is  received/formatted)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//Handlebars helpers 

const { formatDate } = require('./helpers/hbs')


//Handlebars
//!Add the word .engine after exphbs
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
    },
    //this is the defaut layout passed every time
    defaultLayout: 'main',
    extname: '.hbs'
    })
)

app.set('view engine', '.hbs')



//Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


//Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ 
            mongoUrl: process.env.MONGO_URI
        })
    })
  )

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//static /pulic folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes

app.use('/', require ('./routes/index')) 
app.use('/auth', require ('./routes/auth')) 
app.use('/tasks', require ('./routes/tasks')) 





const PORT = process.env.PORT || 2121

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on PORT ${PORT}`))

