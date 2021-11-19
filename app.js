const express = require('express')
const sequelize = require('./db')
const path = require('path')
const router = require('./routes/index')
const app = express()

const PORT = 5000

app.use(express.static(path.resolve(__dirname, 'client')))
app.use(express.json())
app.use('/', router)

const start = async () => {
    try {
        //await sequelize.authenticate() 
        //await sequelize.sync() 
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    } 
    catch (e)
    {
        console.log(e)
    }
}
start()