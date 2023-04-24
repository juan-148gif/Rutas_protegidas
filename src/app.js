const express = require("express")
const cors = require('cors')
require('dotenv').config()

const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

const db = require('./utils/database')
const app = express()

const PORT = process.env.PORT || 3000

//? Validar la conexión 

db.authenticate()
    .then(() => console.log('Database Authenticated!'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database Synced!'))
    .catch(err => console.log(err))
    

app.use(express.json())
app.use(cors())

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} | ${req.path}`)
    if(req.metho != 'DELETE'){
        next()
        return
    }
    res.status(400).json({message: ' Ey, no hagas delete'})
}

app.use(loggerMiddleware)

app.get('/', (req, res) => {
    res.json({
        message: 'Server OK', 
        myMessage: process.env.MESSAGE, 
        myPort: process.env.PORT
    })
}) 

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})
