const Sequelize = require('sequelize')

sequelize = new Sequelize ('empregados','root','',{
    host: 'localhost',
    password: 'mysqluser',
    dialect:'mysql'
} )

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}