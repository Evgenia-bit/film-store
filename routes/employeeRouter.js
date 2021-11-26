const Router = require('express')
const router = new Router
const db = require('../db')


router.get('/all', (req, res) => {
    (async () => {
        try {
            const genres = await db.query(`SELECT КодСотрудника, Фамилия, Имя, Отчество, Должность FROM Сотрудник`) 
            let elements = {} 
            let codes = {}
            genres.rows.forEach((elem, i) => {
                codes[i] = elem['КодСотрудника']
                elements[i] = elem['Должность'] + ' ' + elem['Фамилия'] + ' ' + elem['Имя'][0] + '. ' + elem['Отчество'][0] + '. '
            });
            return res.json( {msg : 'Сотрудники успешно получены!', status: 'OK', title: 'Все сотрудники', elements, codes})
        } catch (e) {
            return res.json( {msg : 'Произошла ошибка!', status: 'error'})
        }
    })()
})

module.exports = router