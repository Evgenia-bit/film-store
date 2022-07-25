const Router = require('express')
const db = require('../db')

const router = new Router


router.post('/revenue', async (req, res) => {
    try {
        const {start, end} = req.body

        const revenueReport = await db.query(`SELECT Жанр.Наименование AS Наименование_жанра, COUNT (*) AS Количество, SUM(Фильм.Цена) AS Выручка, (SUM(Фильм.Цена) / COUNT (*) ) AS Средня_выручка_за_фильм
            FROM Заказ INNER JOIN (Фильм INNER JOIN Жанр ON Фильм.КодЖанра = Жанр.КодЖанра) ON Заказ.КодФильма = Фильм.КодФильма
            WHERE Заказ.Дата >= '${start}' AND Заказ.Дата <= '${end}'
            GROUP BY Жанр.Наименование`)

        return res.json({msg: 'Отчёт сгенерирован!', status: 'OK', items: revenueReport.rows})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.post('/employee', async (req, res) => {
    try {
        const {start, end, employee} = req.body

        const employeeActivityReport = await db.query(`SELECT Заказ.Дата, Фильм.Наименование AS Фильм, Фильм.Цена
            FROM Фильм INNER JOIN (Сотрудник INNER JOIN Заказ ON Сотрудник.КодСотрудника = Заказ.КодСотрудника) ON Фильм.КодФильма = Заказ.КодФильма
            WHERE Сотрудник.КодСотрудника=${employee}  AND (Заказ.Дата >= '${start}' AND Заказ.Дата <= '${end}')
            ORDER BY Заказ.Дата DESC;
            `)

        employeeActivityReport.rows.forEach(reportLine => {
            reportLine['Дата'] = reportLine['Дата'].toLocaleDateString()
        })

        return res.json({msg: 'Отчёт сгенерирован!', status: 'OK', items: employeeActivityReport.rows})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

module.exports = router