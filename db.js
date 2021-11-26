/*const { Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'FilmStore',
    'postgres',
    'postgres',
    {
        dialect: "postgres",
        host: 'localhost',
        port: '5432',
    }
)*/
const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "film-store"
})

module.exports = pool