const Router = require('express')
const db = require('../db')

const router = new Router

router.get('/all', async (req, res) => {
    try {
        const employees = await db.query(`SELECT КодСотрудника, Фамилия, Имя, Отчество, Должность FROM Сотрудник`)

        let elements = {}
        let codes = {}
        let employeesInitials = ''

        employees.rows.forEach((employee, i) => {
            codes[i] = employee['КодСотрудника']
            employeesInitials = employee['Имя'][0] + '. ' + employee['Отчество'][0] + '. '
            elements[i] = employee['Должность'] + ' ' + employee['Фамилия'] + ' ' + employeesInitials;
        });

        return res.json({msg: 'Сотрудники успешно получены!', status: 'OK', title: 'Все сотрудники', elements, codes})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.post('/all:id', async (req, res) => {
    try {
        const employees = await db.query(`SELECT Фамилия, Имя, Отчество, Должность FROM Сотрудник WHERE КодСотрудника = '${req.params.id}'`)

        let employeesInitials = employees.rows[0]['Имя'][0] + '. ' + employees.rows[0]['Отчество'][0] + '. '

        const currentEmployee = employees.rows[0]['Должность'] + ' ' + employees.rows[0]['Фамилия'] + ' ' + employeesInitials

        return res.json({msg: 'Сотрудник успешно получен!', status: 'OK', currentEmployee})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

module.exports = router