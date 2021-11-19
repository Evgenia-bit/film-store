const sequelize = require('db')
const {DataTypes} = require('sequelize')

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW },
})

const Film = sequelize.define('film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    descr: {type: DataTypes.STRING},
    year: {type: DataTypes.INTEGER},
    country: {type: DataTypes.STRING},
    cast: {type: DataTypes.STRING}
})


const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Buyer = sequelize.define('buyer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING},
    passportSeries: {type: DataTypes.INTEGER, allowNull: false},
    passportID: {type: DataTypes.INTEGER, allowNull: false},
    whenIssued: {type: DataTypes.DATEONLY, allowNull: false},
    issuedBy: {type: DataTypes.STRING, allowNull: false},
    placeOfResidence: {type: DataTypes.STRING, allowNull: false},
    phoneNumber: {type: DataTypes.INTEGER},
})
const Employee = sequelize.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING},
    powerOfAttorney: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.STRING, allowNull: false},

})
Order.hasOne(Film)
Film.belongsTo(Order)

Order.hasOne(Buyer)
Buyer.belongsTo(Order)

Order.hasOne(Employee)
Employee.belongsTo(Order)

Film.hasOne(Genre)
Genre.belongsTo(Film)

module.exports = {
    Order,
    Film,
    Genre,
    Buyer,
    Employee
}