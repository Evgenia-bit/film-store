const Router = require('express')
const router = new Router
const db = require('../db')


router.post('/create', (req, res) => {
    (async () => {
        try {
            const {employee, buyer, film, date} = req.body
            await db.query(`INSERT INTO Заказ ( КодФильма, КодСотрудника, КодПокупателя, Дата)
            VALUES (
                (SELECT Фильм.КодФильма FROM Фильм WHERE Фильм.Наименование = '${film}'), 
                '${employee}' , 
                (SELECT Покупатель.КодПокупателя FROM Покупатель WHERE Покупатель.КодПокупателя = '${buyer}'),
                '${date}')`);
            return res.json({msg: 'Заказ успешно создан!', status: 'OK'})
        } catch (e) {
            console.log(e)
            return res.json({msg: 'Произошла ошибка!', status: 'error'})
        }
    })()
})
router.put('/edit', (req, res) => {
    (async () => {
        try {
            await db.query(`UPDATE  Заказ SET КодПокупателя  = '${req.body.buyer}', КодФильма = '${req.body.film}', Дата = '${req.body.date}' WHERE КодЗаказа = '${req.body.id}' `)
            return res.json({msg: 'Заказ успешно обновлен!', status: 'OK'})
        } catch (e) {
            console.log(e)
            return res.json({msg: 'Произошла ошибка!', status: 'error'})
        }
    })()
})
router.post('/getOne', (req, res) => {
    (async () => {
        try {
            const order = await db.query(`SELECT * FROM Заказ WHERE КодЗаказа  = '${req.body.id}'`)

            return res.json({msg: 'Заказ успешно получен!', status: 'OK', orders: order.rows})
        } catch (e) {
            return res.json({msg: 'Произошла ошибка!', status: 'error'})
        }
    })()
})
router.delete('/delete', (req, res) => {
    (async () => {
        try {
            await db.query(`DELETE FROM Заказ WHERE КодЗаказа  = '${req.body[0]}'`)

            return res.json({msg: 'Заказ успешно удалён!', status: 'OK'})
        } catch (e) {
            return res.json({msg: 'Произошла ошибка!', status: 'error'})
        }
    })()
})
router.get('/all', (req, res) => {
    (async () => {
        try {
            const orders = await db.query(`SELECT Заказ.КодЗаказа AS "Номер заказа", (SELECT Фильм.Наименование AS Фильм FROM Фильм WHERE Заказ.КодФильма = Фильм.КодФильма), Покупатель.Фамилия as "Фамилия покупателя", 
            Покупатель.Имя as "Имя покупателя", Покупатель.Отчество as "Отчество покупателя",  Заказ.Дата, Сотрудник.Фамилия as "Фамилия сотрудника", 
            Сотрудник.Имя as "Имя сотрудника", Сотрудник.Отчество as "Отчество сотрудника" 
            FROM Покупатель 
            INNER JOIN(Заказ INNER JOIN Сотрудник ON Заказ.КодСотрудника = Сотрудник.КодСотрудника)  ON Покупатель.КодПокупателя = Заказ.КодПокупателя 
            ORDER BY КодЗаказа`)
            let elements = {}
            orders.rows.forEach((elem, i) => {
                elem['Дата'] = elem['Дата'].toLocaleDateString()
                elements[i] = elem

            });
            return res.json({msg: 'Заказы успешно получены!', status: 'OK', title: 'Все Заказы', elements})
        } catch (e) {
            console.log(e)
            return res.json({msg: 'Произошла ошибка!', status: 'error'})
        }
    })()
})

module.exports = router