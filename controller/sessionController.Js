const sessionLog = require('../models/index').sessionLog;

let Session = function () {
    this.createSessionLog = (data) => {
        return sessionLog.create(data);
    }
}

module.exports = new Session();