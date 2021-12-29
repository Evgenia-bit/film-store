const Router = require('express')
const router = new Router
const db = require('../db')


router.post('/create', (req, res) => {
    (async () => {
        try {
            const { genre, name, price, duration, year, country, description, cast } = req.body
            await db.query(`INSERT INTO Фильм(Наименование, КодЖанра, Цена, Длительность, Страна, Год, Описание, АктёрскийСостав)  
            VALUES ('${name}',  (SELECT Жанр.КодЖанра FROM Жанр WHERE Жанр.Наименование = '${genre}'), '${price}', '${duration}', '${country}', '${year}', '${description}', '${cast}' ) `);
                return res.json({ msg: 'Фильм успешно создан!', status: 'OK' })
        } catch (e) {
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})
router.delete('/delete', (req, res) => {
    (async () => {
        try {
            await db.query(`DELETE FROM Фильм WHERE Наименование = '${req.body[0]}'`) 
            return res.json( {msg : 'Фильм успешно удалён!', status: 'OK'})
        } catch (e) {
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})
router.get('/all', (req, res) => {
    (async () => {
        try {
            const films = await db.query(`SELECT КодФильма AS "Код фильма", Фильм.Наименование AS "Название фильма", Жанр.Наименование AS Жанр, Фильм.Цена, Фильм.Длительность, Фильм.Страна, Фильм.Год, Фильм.Описание, Фильм.АктёрскийСостав AS "Актёрский состав" FROM Фильм LEFT JOIN Жанр ON Жанр.КодЖанра = Фильм.КодЖанра`)
            let elements = {}
            let codes = {}
            let fullnames = {}
            films.rows.forEach((elem, i) => {
                codes[i] = elem['Код фильма']
                elements[i] = elem
                fullnames[i] = elem["Название фильма"] + " " + elem["Год"] + "г."
            });
            return res.json( {msg : 'Фильмы успешно получены!', status: 'OK', title: 'Все Фильмы', elements, codes, fullnames })
        } catch (e) {
            console.log(e)
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})

module.exports = router