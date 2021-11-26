const Router = require('express')
const router = new Router
const orderRouter = require('../routes/orderRouter')
const genreRouter = require('../routes/genreRouter')
const buyerRouter = require('../routes/buyerRouter')
const reportRouter = require('../routes/reportRouter')
const filmRouter = require('../routes/filmRouter')
const employeeRouter = require('../routes/employeeRouter')

router.use('/order', orderRouter)
router.use('/genre', genreRouter)
router.use('/buyer', buyerRouter)
router.use('/report', reportRouter)
router.use('/film', filmRouter)
router.use('/employee', employeeRouter)

module.exports = router