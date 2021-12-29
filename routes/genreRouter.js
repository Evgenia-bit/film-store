const Router = require('express')
const router = new Router
const db = require('../db')

router.post('/create', (req, res) => {
    (async () => {
        try {
            const {name} = req.body;
            await db.query(`INSERT INTO Жанр(Наименование) VALUES ('${name}')`) 
            return res.json( {msg : 'Новый жанр успешно создан!', status: 'OK'})
        } catch (e) {
            return res.json( {msg : 'Произошла ошибка!', status: 'error'})
        }
    })()  
})
router.delete('/delete', (req, res) => {
    (async () => {
        try {
            const name = req.body[0]
            await db.query(`DELETE FROM Жанр WHERE Наименование = '${name}'`) 
            return res.json( {msg : 'Жанр успешно удалён!', status: 'OK'})
            
        } catch (e) {
            return res.json( {msg : 'Произошла ошибка!', status: 'error'})
        }
    })()
})
router.get('/all', (req, res) => {
    (async () => {
        try {
            const genres = await db.query(`SELECT КодЖанра AS "Код жанра", Наименование FROM Жанр`)
            let elements = {}
            let codes = {}
            let fullnames = {}
            genres.rows.forEach((elem, i) => {
                codes[i] = elem['Код жанра']

                elements[i] = elem;
                fullnames[i] = elem["Наименование"]
            });
            return res.json( {msg : 'Жанры успешно получены!', status: 'OK', title: 'Все жанры', elements, codes, fullnames})
        } catch (e) {
            return res.json( {msg : 'Произошла ошибка!', status: 'error'})
        }
    })()
})

module.exports = router