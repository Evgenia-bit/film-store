const Router = require('express')
const router = new Router
const db = require('../db')


router.post('/revenue', (req, res) => {
    (async () => {
        try {
            const {start, end} = req.body;
            console.log(start, end)
            const result = await db.query(`SELECT Жанр.Наименование AS Наименование_жанра, COUNT (*) AS Количество, SUM(Фильм.Цена) AS Выручка, (SUM(Фильм.Цена) / COUNT (*) ) AS Средня_выручка_за_фильм
            FROM Заказ INNER JOIN (Фильм INNER JOIN Жанр ON Фильм.КодЖанра = Жанр.КодЖанра) ON Заказ.КодФильма = Фильм.КодФильма
            WHERE Заказ.Дата >= '${start}' AND Заказ.Дата <= '${end}'
            GROUP BY Жанр.Наименование`) 
            const items = result.rows
            return res.json( {msg : 'Отчёт сгенерирован!', status: 'OK', items})
        } catch (e) {
            console.log(e)
            return res.json( {msg : 'Произошла ошибка!', status: 'error'})
        }
    })()  
    

})
router.post('/employee', (req, res) => {
    (async () => {
        try {
            const {start, end, employee} = req.body;
            console.log(start, end, employee)
            const result = await db.query(`SELECT Заказ.Дата, Фильм.Наименование AS Фильм, Фильм.Цена
FROM Фильм INNER JOIN (Сотрудник INNER JOIN Заказ ON Сотрудник.КодСотрудника = Заказ.КодСотрудника) ON Фильм.КодФильма = Заказ.КодФильма
WHERE Сотрудник.КодСотрудника=${employee}  AND (Заказ.Дата >= '${start}' AND Заказ.Дата <= '${end}')
ORDER BY Заказ.Дата DESC;
`)
            result.rows.forEach(item=> {
                item['Дата'] = item['Дата'].toLocaleDateString()
            })
            const items = result.rows
            return res.json( {msg : 'Отчёт сгенерирован!', status: 'OK', items})
        } catch (e) {
            console.log(e)
            return res.json( {msg : 'Произошла ошибка!', status: 'error'})
        }
    })()
})

module.exports = router