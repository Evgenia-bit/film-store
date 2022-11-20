const Router = require('express')
const db = require('../db/db')

const router = new Router

router.post('/create', async (req, res) => {
    try {
        const {genre, name, price, duration, year, country, description, cast} = req.body

        await db.query(`INSERT INTO Фильм(Наименование, КодЖанра, Цена, Длительность, Страна, Год, Описание, АктёрскийСостав)  
            VALUES ('${name}',  (SELECT Жанр.КодЖанра FROM Жанр WHERE Жанр.Наименование = '${genre}'), '${price}', '${duration}', '${country}', '${year}', '${description}', '${cast}' ) `);

        return res.json({msg: 'Фильм успешно создан!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.delete('/delete000', async (req, res) => {
    try {
        const filmId = req.body[0]

        await db.query(`DELETE FROM Фильм WHERE КодФильма = '${filmId}'`)

        return res.json({msg: 'Фильм успешно удалён!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})


module.exports = router