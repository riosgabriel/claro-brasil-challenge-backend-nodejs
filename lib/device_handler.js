const mysql = require('./database');

mysql.openConnection();

const deviceLimit = 3;

class DeviceHandler {

    static create(userId, device) {
        return mysql.countDevices(userId)
            .then(count => {
              if (count < deviceLimit) {
                  return mysql.createDevice(userId, device)
                      .then(() => {
                          return Promise.resolve()
                      })
              } else {
                  return Promise.reject("Device limit reached")
              }
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }

    static delete(userId, deviceId) {
        return mysql.deleteDevice(userId, deviceId)
    }

    static update(userId, deviceId, newDevice) {
        return mysql.updateDevice(userId, deviceId, newDevice)
    }
}

module.exports = DeviceHandler;