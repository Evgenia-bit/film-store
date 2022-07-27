const path = require('path')
const express = require('express')


require('dotenv').config()


const router = require('./routes')

const app = express()

const PORT = process.env.PORT | 5000



app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'client')))

app.use('/', router)



const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } 
    catch (e)
    {
        console.error(e)
    }
}
start()