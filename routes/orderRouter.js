const Router = require('express')
const db = require('../db')
const DataTransformer = require("../utils/DataTransformer.js")

const router = new Router


router.post('/create', async (req, res) => {
    try {
        const {employee, buyer, film, date} = req.body

        await db.query(`INSERT INTO Заказ ( КодФильма, КодСотрудника, КодПокупателя, Дата)
            VALUES (
                (SELECT Фильм.КодФильма FROM Фильм WHERE Фильм.Наименование = '${film}'), 
                '${employee}' , 
                (SELECT Покупатель.КодПокупателя FROM Покупатель WHERE Покупатель.КодПокупателя = '${buyer}'),
                '${date}')`)

        return res.json({msg: 'Заказ успешно создан!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.put('/edit', async (req, res) => {
    try {
        const {id, buyer, film, date} = req.body

        await db.query(`UPDATE  Заказ SET КодПокупателя  = '${buyer}', КодФильма = '${film}', Дата = '${date}' WHERE КодЗаказа = '${id}'`)

        return res.json({msg: 'Заказ успешно обновлен!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.post('/getOne', async (req, res) => {
    try {
        const order = await db.query(`SELECT * FROM Заказ WHERE КодЗаказа  = '${req.body.id}'`)

        return res.json({msg: 'Заказ успешно получен!', status: 'OK', orders: order.rows})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const orderId = req.body[0]

        await db.query(`DELETE FROM Заказ WHERE КодЗаказа  = '${orderId}'`)

        return res.json({msg: 'Заказ успешно удалён!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})


router.get('/all', async (req, res) => {
    try {
        const orders = await db.query(`SELECT Заказ.КодЗаказа AS "Номер заказа", (SELECT Фильм.Наименование AS Фильм FROM Фильм WHERE Заказ.КодФильма = Фильм.КодФильма), Покупатель.Фамилия as "Фамилия покупателя", 
            Покупатель.Имя as "Имя покупателя", Покупатель.Отчество as "Отчество покупателя",  Заказ.Дата, Сотрудник.Фамилия as "Фамилия сотрудника", 
            Сотрудник.Имя as "Имя сотрудника", Сотрудник.Отчество as "Отчество сотрудника" 
            FROM Покупатель 
            INNER JOIN(Заказ INNER JOIN Сотрудник ON Заказ.КодСотрудника = Сотрудник.КодСотрудника)  ON Покупатель.КодПокупателя = Заказ.КодПокупателя 
            ORDER BY КодЗаказа`)

        DataTransformer.toLocaleDateString(orders.rows, 'Дата')

        return res.json({msg: 'Заказы успешно получены!', status: 'OK', title: 'Все Заказы', elements: orders.rows})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

module.exports = router