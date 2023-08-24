const sessionLog = require('../models/index').sessionLog;

let Session = function () {
    this.createSessionLog = (data) => {
        return sessionLog.create(data);
    };
    this.updateSessionLog = (data)=> {
        return sessionLog.update(data)
    }
}

module.exports = new Session();