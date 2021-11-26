const Router = require('express')
const router = new Router
const db = require('../db')


router.post('/create', (req, res) => {
    (async () => {
        try {
            const { employee, buyer, film, date } = req.body
            await db.query(`INSERT INTO Заказ ( КодФильма, КодСотрудника, КодПокупателя, Дата )
            VALUES (
                (SELECT Фильм.КодФильма FROM Фильм WHERE Фильм.Наименование = '${film}'), 
                '${employee}' , 
                (SELECT Покупатель.КодПокупателя FROM Покупатель WHERE Покупатель.Фамилия = '${buyer}'),
                '${date}')`);
                return res.json({ msg: 'Заказ успешно создан!', status: 'OK' })
        } catch (e) {
            console.log(e)
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})
router.delete('/delete', (req, res) => {
    (async () => {
        try {
            await db.query(`DELETE FROM Заказ WHERE КодЗаказа  = '${req.body[0]}'`) 
            return res.json( {msg : 'Заказ успешно удалён!', status: 'OK'})
        } catch (e) {
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})
router.get('/all', (req, res) => {
    (async () => {
        try {
            const orders = await db.query(`SELECT Заказ.КодЗаказа, Покупатель.Фамилия, Покупатель.Имя, Покупатель.Отчество,  Заказ.Дата, Сотрудник.Фамилия, Сотрудник.Имя, Сотрудник.Отчество FROM Покупатель 
            INNER JOIN(Заказ INNER JOIN Сотрудник ON Заказ.КодСотрудника = Сотрудник.КодСотрудника)  ON Покупатель.КодПокупателя = Заказ.КодПокупателя `) 
            let elements = {}
            orders.rows.forEach((elem, i) => {
                elements[i] = elem
            });
            return res.json( {msg : 'Заказы успешно получены!', status: 'OK', title: 'Все Заказы', elements})
        } catch (e) {
            console.log(e)
            return res.json({ msg: 'Произошла ошибка!', status: 'error' })
        }
    })()
})

module.exports = router