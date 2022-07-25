const Router = require('express')
const db = require('../db')

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

router.delete('/delete', async (req, res) => {
    try {
        const filmId = req.body[0]

        await db.query(`DELETE FROM Фильм WHERE КодФильма = '${filmId}'`)

        return res.json({msg: 'Фильм успешно удалён!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.put('/edit', async (req, res) => {
    try {
        const {id, genre, name, price, duration, year, country, description, cast} = req.body

        await db.query(`UPDATE  Фильм SET 
            КодЖанра  = '${genre}', 
            Наименование = '${name}', 
            Цена = '${price}',
            Длительность = '${duration}',         
            Страна = '${country}',
            Год = '${year}',
            Описание = '${description}',
            АктёрскийСостав = '${cast}'
            WHERE КодФильма = '${id}'`)

        return res.json({msg: 'Фильм успешно обновлен!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.post('/getOne', async (req, res) => {
    try {
        const filmId = req.body.id

        const film = await db.query(`SELECT * FROM Фильм WHERE КодФильма  = '${filmId}'`)

        return res.json({msg: 'Фильм успешно получен!', status: 'OK', film: film.rows})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.get('/all', async (req, res) => {
    try {
        const films = await db.query(`SELECT КодФильма AS "Код фильма", Фильм.Наименование AS "Название фильма", Жанр.Наименование AS Жанр, Фильм.Цена, Фильм.Длительность, Фильм.Страна, Фильм.Год, Фильм.Описание, Фильм.АктёрскийСостав AS "Актёрский состав" FROM Фильм 
                                    LEFT JOIN Жанр ON Жанр.КодЖанра = Фильм.КодЖанра ORDER BY КодФильма`)

        let codes = {}
        let fullnames = {}

        films.rows.forEach((film, i) => {
            codes[i] = film['Код фильма']
            fullnames[i] = film["Название фильма"]
        })

        return res.json({
            msg: 'Фильмы успешно получены!',
            status: 'OK',
            title: 'Все Фильмы',
            elements: films.rows,
            codes,
            fullnames
        })
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

module.exports = router