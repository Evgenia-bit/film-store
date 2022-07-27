const Router = require('express')
const db = require('../db/db')
const DataTransformer = require("../utils/DataTransformer.js")

const router = new Router

router.get('/all', async (req, res) => {
    try {
        const employees = await db.query(`SELECT КодСотрудника, Фамилия, Имя, Отчество, Должность FROM Сотрудник`)

        let elements = {}
        let codes = {}

        employees.rows.forEach((employee, i) => {
            codes[i] = employee['КодСотрудника']
            elements[i] = employee['Должность'] + ' ' + DataTransformer.getFullnames({
                lastName:  employee['Фамилия'],
                firstName:  employee['Имя'],
                patronymic: employee['Отчество']
            })
        })

        return res.json({msg: 'Сотрудники успешно получены!', status: 'OK', title: 'Все сотрудники', elements, codes})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.post('/all:id', async (req, res) => {
    try {
        const employees = await db.query(`SELECT Фамилия, Имя, Отчество, Должность FROM Сотрудник WHERE КодСотрудника = '${req.params.id}'`)

        const fullName = DataTransformer.getFullnames({
            lastName:  employees.rows[0]['Фамилия'],
            firstName:  employees.rows[0]['Имя'],
            patronymic: employees.rows[0]['Отчество']
        })

        const currentEmployee = employees.rows[0]['Должность'] + ' ' + fullName

        return res.json({msg: 'Сотрудник успешно получен!', status: 'OK', currentEmployee})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

module.exports = router