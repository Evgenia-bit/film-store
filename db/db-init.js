const fs = require("fs")
const db = require('./db.js')

const initSql = fs.readFileSync('init.sql').toString()

const initDB = async () => {
    try {
        await db.query(initSql)
        console.log('База данных успешно заполнена')
        process.exit(0)
    }
    catch (e)
    {
        console.error("Произошла ошибка при заполнении базы данных: ", e)
    }
}
initDB()