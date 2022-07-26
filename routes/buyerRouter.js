const Router = require('express')
const db = require('../db')
const DataTransformer = require("../utils/DataTransformer.js")

const router = new Router

router.post('/create', async (req, res) => {
    try {
        const {surname, name, patronymic, series, number, whoIssued, whenIssued, place, phone} = req.body

        await db.query(`INSERT INTO Покупатель ( Фамилия, Имя, Отчество, СерияПаспорта, НомерПаспорта, ВремяВыдачиПаспорта, КемВыданПаспорт, МестоЖительства, НомерТелефона )
            VALUES ('${surname}',  '${name}', '${patronymic}', '${series}', '${number}', '${whenIssued}', '${whoIssued}',  '${place}', '${phone}' ) `)

        return res.json({msg: 'Покупатель успешно создан!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const buyerId = req.body[0]

        await db.query(`DELETE FROM Покупатель WHERE КодПокупателя = '${buyerId}'`)

        return res.json({msg: 'Покупатель успешно удалён!', status: 'OK'})
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

router.get('/all', async (req, res) => {
    try {
        const buyers = await db.query(`SELECT КодПокупателя AS "Код покупателя", Фамилия, Имя, Отчество, СерияПаспорта AS "Серия паспорта", НомерПаспорта AS "Номер паспорта", ВремяВыдачиПаспорта AS "Время выдачи паспорта", КемВыданПаспорт AS "Кем выдан паспорт", МестоЖительства AS "Место жительства", НомерТелефона AS "Номер телефона" FROM Покупатель`)

        let codes = {}
        let fullnames = {}

        DataTransformer.toLocaleDateString(buyers.rows, 'Время выдачи паспорта')

        buyers.rows.forEach((buyer, i) => {
            codes[i] = buyer['Код покупателя']
            fullnames[i] = DataTransformer.getFullnames({
                lastName:  buyer['Фамилия'],
                firstName:  buyer['Имя'],
                patronymic: buyer['Отчество']
            })
        })

        return res.json({
            msg: 'Покупатели успешно получены!',
            status: 'OK',
            title: 'Все покупатели',
            elements: buyers.rows,
            codes,
            fullnames
        })
    } catch (e) {
        return res.json({msg: 'Произошла ошибка!', status: 'error'})
    }
})

module.exports = router