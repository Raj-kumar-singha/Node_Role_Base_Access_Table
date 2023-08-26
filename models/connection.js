const { Sequelize, DataTypes } = require('sequelize'),
  dbconfig = require('../config/mysqldb');

let sequelize;
let db;
async function connectPostgreSQL() {
  try {
    sequelize = new Sequelize(
      dbconfig.DB_Name,
      dbconfig.DB_Username,
      dbconfig.DB_Password,
      dbconfig.options
    );
    db = {
      Sequelize,
      sequelize,
      DataTypes,
    };

    await sequelize.authenticate();
    (async () => {
      await sequelize.sync();
      console.log('SQL Connection has been established successfully.');
    })();
  } catch (error) {
    console.error('SQL Unable to connect to the database:', error);
  }
}

connectPostgreSQL();

module.exports = db;