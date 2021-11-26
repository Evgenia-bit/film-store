const express = require('express')
const path = require('path')
const fs = require('fs')
const db = require('./db')
const router = require('./routes/index')
const app = express()

const PORT = 5000
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'client')))

app.use('/', router)

const startSql = fs.readFileSync('database.sql').toString()


const start = async () => {
    try {
        await db.query(startSql)
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    } 
    catch (e)
    {
        console.log(e)
    }
}
start()