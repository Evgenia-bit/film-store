const Router = require('express')
const router = new Router
const orderRouter = require('./orderRouter')
const genreRouter = require('./genreRouter')
const buyerRouter = require('./buyerRouter')
const reportRouter = require('./reportRouter')

router.use('/order', orderRouter)
router.use('/genre', genreRouter)
router.use('/buyer', buyerRouter)
router.use('/report', reportRouter)

module.exports = router