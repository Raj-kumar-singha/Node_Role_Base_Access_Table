require('dotenv').config();
let config = {
        DB_Name: "assessmentschema",
        DB_Username: "root",
        DB_Password: process.env.dbPassword,
        options: {
            host: "localhost",
            dialect: "mysql",
            logging: false,
            timezone: '+05:30'
        }
    }
    
module.exports = config;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//     'sequelize', 
//     'root', 
//     'MYSQL##rajkumar@1234', 
//     {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

// module.exports = sequelize;