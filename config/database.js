const Sequelize = require("sequelize");

sequelize = new Sequelize("empresa", "root", "", {
  host: "localhost",
  password: "mysqluser",
  dialect: "mysql",
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
