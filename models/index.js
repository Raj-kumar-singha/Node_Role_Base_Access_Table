let db = require('./connection')
const obj = {
    user: require('../models/schema/user')(db.sequelize,db.DataTypes),
    feed: require('../models/schema/feed')(db.sequelize,db.DataTypes),
    sessionLog: require('../models/schema/sessionLog')(db.sequelize,db.DataTypes)
}

obj.sequelize = db.sequelize

module.exports = obj