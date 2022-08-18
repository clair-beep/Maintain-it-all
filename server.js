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



//Handlebars
//!Add the word .engine after exphbs
app.engine('.hbs', exphbs.engine({
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





const PORT = process.env.PORT || 2121

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on PORT ${PORT}`))

// app.get('/',async (request, response)=>{
//     const todoItems = await db.collection('todos').find().toArray()
//     const itemsLeft = await db.collection('todos').countDocuments({completed: false})
//     response.render('index.ejs', { items: todoItems, left: itemsLeft })
//     // db.collection('todos').find().toArray()
//     // .then(data => {
//     //     db.collection('todos').countDocuments({completed: false})
//     //     .then(itemsLeft => {
//     //         response.render('index.ejs', { items: data, left: itemsLeft })
//     //     })
//     // })
//     // .catch(error => console.error(error))
// })

// app.post('/addTodo', (request, response) => {
//     db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
//     .then(result => {
//         console.log('Todo Added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })

// app.put('/markComplete', (request, response) => {
//     db.collection('todos').updateOne({thing: request.body.itemFromJS},{
//         $set: {
//             completed: true
//           }
//     },{
//         sort: {_id: -1},
//         upsert: false
//     })
//     .then(result => {
//         console.log('Marked Complete')
//         response.json('Marked Complete')
//     })
//     .catch(error => console.error(error))

// })

// app.put('/markUnComplete', (request, response) => {
//     db.collection('todos').updateOne({thing: request.body.itemFromJS},{
//         $set: {
//             completed: false
//           }
//     },{
//         sort: {_id: -1},
//         upsert: false
//     })
//     .then(result => {
//         console.log('Marked Complete')
//         response.json('Marked Complete')
//     })
//     .catch(error => console.error(error))

// })

// app.delete('/deleteItem', (request, response) => {
//     db.collection('todos').deleteOne({thing: request.body.itemFromJS})
//     .then(result => {
//         console.log('Todo Deleted')
//         response.json('Todo Deleted')
//     })
//     .catch(error => console.error(error))

// })

