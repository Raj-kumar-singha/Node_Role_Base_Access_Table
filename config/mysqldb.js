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