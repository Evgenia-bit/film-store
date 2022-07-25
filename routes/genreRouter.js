const Router = require('express')
const db = require('../db')

const router = new Router


router.post('/create', async (req, res) => {
    try {
        const {name} = req.body

        await db.query(`INSERT INTO Жанр(Наименование) VALUES ('${name}')`)

        return res.json({msg: 'Новый жанр успешно создан!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const genreId = req.body[0]

        await db.query(`DELETE FROM Жанр WHERE КодЖанра = '${genreId}'`)

        return res.json({msg: 'Жанр успешно удалён!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.get('/all', async (req, res) => {
    try {
        const genres = await db.query(`SELECT КодЖанра AS "Код жанра", Наименование FROM Жанр`)

        let codes = {}
        let fullnames = {}

        genres.rows.forEach((genre, i) => {
            codes[i] = genre['Код жанра']
            fullnames[i] = genre["Наименование"]
        })

        return res.json({msg: 'Жанры успешно получены!', status: 'OK', title: 'Все жанры', elements: genres.rows, codes, fullnames})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

module.exports = router