const Router = require('express')
const router = new Router
const db = require('../db')


router.get('/all', (req, res) => {
    (async () => {
        try {
            const employees = await db.query(`SELECT КодСотрудника, Фамилия, Имя, Отчество, Должность FROM Сотрудник`)
            let elements = {}
            let codes = {}
            employees.rows.forEach((elem, i) => {
                codes[i] = elem['КодСотрудника']
                elements[i] = elem['Должность'] + ' ' + elem['Фамилия'] + ' ' + elem['Имя'][0] + '. ' + elem['Отчество'][0] + '. ';
            });
            return res.json( {msg : 'Сотрудники успешно получены!', status: 'OK', title: 'Все сотрудники', elements, codes})
        } catch (e) {
            return res.json( {msg : 'Произошла ошибка!', status: 'error'})
        }
    })()
})
router.post('/all:id', (req, res) => {
    (async () => {
        try {
            const employees = await db.query(`SELECT Фамилия, Имя, Отчество, Должность FROM Сотрудник WHERE КодСотрудника = '${req.params.id}'`);
            const currentEmployee = employees.rows[0]['Должность'] + ' ' + employees.rows[0]['Фамилия'] + ' ' + employees.rows[0]['Имя'][0] + '. ' + employees.rows[0]['Отчество'][0] + '. ';
            return res.json( {msg : 'Сотрудник успешно получен!', status: 'OK',  currentEmployee})
        } catch (e) {
            console.log(e)
            return res.json( {msg : 'Произошла ошибка!', status: 'error'})
        }
    })()
})

module.exports = router