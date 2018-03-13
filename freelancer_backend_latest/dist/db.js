"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize.default('freelancer', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
module.exports = sequelize;
/*
// Or you can simply use a connection uri
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');*/