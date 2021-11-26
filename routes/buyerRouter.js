const Router = require('express')
const router = new Router
const db = require('../db')

router.post('/create', (req, res) => {
    (async () => {
        try {
            const { surname, name, patronymic, series, number, whoIssued, whenIssued, place, phone } = req.body
            await db.query(`INSERT INTO Покупатель ( Фамилия, Имя, Отчество, СерияПаспорта, НомерПаспорта, ВремяВыдачиПаспорта, КемВыданПаспорт, МестоЖительства, НомерТелефона )
            VALUES ('${surname}',  '${name}', '${patronymic}', '${series}', '${number}', '${whenIssued}', '${whoIssued}',  '${place}', '${phone}' ) `);
                return res.json({ msg: 'Покупатель успешно создан!', status: 'OK' })
        } catch (e) {
            console.log(e)
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})
router.delete('/delete', (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            await db.query(`DELETE FROM Покупатель WHERE Фамилия = '${req.body[0]}' AND Имя = '${req.body[1]}' AND  Отчество = '${req.body[2]}' AND  СерияПаспорта = '${req.body[3]}' AND НомерПаспорта = '${req.body[4]}'`) 
            return res.json( {msg : 'Покупатель успешно удалён!', status: 'OK'})
        } catch (e) {
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})
router.get('/all', (req, res) => {
    (async () => {
        try {
            const films = await db.query(`SELECT КодПокупателя, Фамилия, Имя, Отчество, СерияПаспорта, НомерПаспорта, ВремяВыдачиПаспорта, КемВыданПаспорт, МестоЖительства, НомерТелефона FROM Покупатель`) 
            let elements = {}
            let codes = {}
            films.rows.forEach((elem, i) => {
                codes[i] = elem['КодПокупателя']
                delete elem[Object.keys(elem)[0]];
                elements[i] = elem
            });
            return res.json( {msg : 'Покупатели успешно получены!', status: 'OK', title: 'Все покупатели', elements, codes})
        } catch (e) {
            console.log(e)
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})

module.exports = router