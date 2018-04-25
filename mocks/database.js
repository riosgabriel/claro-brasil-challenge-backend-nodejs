const mysql = require('mysql'),
    conf = require('config'),
    moment = require('moment');

let connection = undefined;

class Database {

    static openConnection() {
        return new Promise((resolve, reject) => {
            return resolve()
        });
    }


    static endConnection() {
        return new Promise((resolve, reject) => {
            return resolve()
        });
    }

    static startTransaction() {
        return new Promise((resolve, reject) => { return resolve() });
    }

    static rollbackTransaction() {
        return new Promise((resolve, reject) => { return resolve() });
    }

    static commitTransaction() {
        return new Promise((resolve, reject) => { return resolve() });
    }

    static createDevice(userId, device) {
        return new Promise((resolve, reject) => { return resolve() });
    }

    static deleteDevice(userId, deviceId) {
        return new Promise((resolve, reject) => {
            return resolve()
        });
    }

    static updateDevice(userId, deviceId, newDevice) {
        return new Promise((resolve, reject) => { return resolve() });
    }

    static countDevices(userId) {
        return new Promise((resolve, reject) => {
            if (userId == 99) {
                return resolve(0);

            } else if (userId == 1) {
                return resolve(1);

            } else if (userId == 2) {
                return resolve(2);

            } else if (userId == 3) {
                return resolve(3);

            } else {
                return reject()
            }
        });
    }

    static findDeviceById(deviceId) {
        return new Promise((resolve, reject) => {
            const device = {
                id: 1
            };
            return resolve(device)
        });
    }

    static insertDeviceChange(userId) {
        return new Promise((resolve, reject) => { return resolve() });
    }

    static changeDevice(userId, deviceId, newDevice) {
        return new Promise((resolve, reject) => { return resolve() });
    }

    static findLastChangeByUserId(userId) {
        return new Promise((resolve, reject) => {
            if(userId == 99) {
                resolve(moment().subtract(5, 'days'))
            } else {
                resolve()
            }
        });
    }
}

module.exports = Database;

