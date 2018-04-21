const mysql = require('./database');

class DeviceHandler {

    static create(userId, device) {
        return mysql.createDevice(device)
    }

    static delete(userId, device) {
        return mysql.deleteDevice(device)
    }

    static update(userId, device) {
        return mysql.updateDevice(device)
    }
}

module.exports = DeviceHandler;