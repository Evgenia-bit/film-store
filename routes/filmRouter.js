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
            await db.query(`DELETE FROM Фильм WHERE КодФильма = '${req.body[0]}'`)
            return res.json( {msg : 'Фильм успешно удалён!', status: 'OK'})
        } catch (e) {
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})
router.put('/edit', (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            await db.query(`UPDATE  Фильм SET 
            КодЖанра  = '${req.body.genre}', 
            Наименование = '${req.body.name}', 
            Цена = '${req.body.price}',
            Длительность = '${req.body.duration}',         
            Страна = '${req.body.country}',
            Год = '${req.body.year}',
            Описание = '${req.body.description}',
            АктёрскийСостав = '${req.body.cast}'
            WHERE КодФильма = '${req.body.id}' `)
            return res.json({msg: 'Фильм успешно обновлен!', status: 'OK'})
        } catch (e) {
            console.log(e)
            return res.json({msg: 'Произошла ошибка!', status: 'error'})
        }
    })()
})
router.post('/getOne', (req, res) => {
    (async () => {
        try {
            const film = await db.query(`SELECT * FROM Фильм WHERE КодФильма  = '${req.body.id}'`)
            return res.json({msg: 'Фильм успешно получен!', status: 'OK', film: film.rows})
        } catch (e) {
            console.log(e)
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})
router.get('/all', (req, res) => {
    (async () => {
        try {
            const films = await db.query(`SELECT КодФильма AS "Код фильма", Фильм.Наименование AS "Название фильма", Жанр.Наименование AS Жанр, Фильм.Цена, Фильм.Длительность, Фильм.Страна, Фильм.Год, Фильм.Описание, Фильм.АктёрскийСостав AS "Актёрский состав" FROM Фильм LEFT JOIN Жанр ON Жанр.КодЖанра = Фильм.КодЖанра ORDER BY КодФильма`)
            let elements = {}
            let codes = {}
            let fullnames = {}
            films.rows.forEach((elem, i) => {
                codes[i] = elem['Код фильма']
                elements[i] = elem
                fullnames[i] = elem["Название фильма"]
            });
            return res.json( {msg : 'Фильмы успешно получены!', status: 'OK', title: 'Все Фильмы', elements, codes, fullnames })
        } catch (e) {
            console.log(e)
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})

module.exports = router