const mysql = require('mysql');

let connection = undefined;

class Database {

    static openConnection() {
        return new Promise((resolve, reject) => {
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'passwd',
                database: 'clarodb',
                insecureAuth: true
            });

            connection.connect((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            })
        });
    }

    static endConnection() {
        return new Promise((resolve, reject) => {
            connection.end((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            })
        });
    }

    static startTransaction() {
        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    return reject(err);
                }

                console.log("Start transaction");

                return resolve();
            })
        });
    }

    static rollbackTransaction() {
        return new Promise((resolve, reject) => {
            connection.rollback((err) => {
                if (err) {
                    return reject(err);
                }

                console.log("Rollback transaction");

                return resolve();
            })
        });
    }

    static commitTransaction() {
        return new Promise((resolve, reject) => {
            connection.commit((err) => {
                if (err) {
                    return reject(err);
                }

                console.log("Commit transaction");

                return resolve();
            })
        });
    }

    static createDevice(userId, device) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
               INSERT INTO USER_DEVICES (USER_ID, NAME, MODEL)
               VALUES (?, ?, ?)
               `,
                [userId, device.name, device.model],
                (error, results, fields) => {

                    if (error) {
                        return reject(error);
                    }

                    console.log(results);

                    return resolve(results.insertId);
                }
            )
        });
    }

    static deleteDevice(userId, deviceId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                DELETE FROM USER_DEVICES
                WHERE USER_ID = ? AND ID = ?
                `,
                [userId, deviceId],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    console.log(results);

                    return resolve();
                }
            )
        })
    }

    static updateDevice(userId, deviceId, newDevice) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                UPDATE USER_DEVICES
                SET NAME = ?, MODEL = ?
                WHERE USER_ID = ? AND ID = ?
                `,
                [newDevice.name, newDevice.model, userId, deviceId],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    console.log(results);

                    return resolve();
                }
            )
        })
    }

    static countDevices(userId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                SELECT COUNT(*) AS count
                FROM USER_DEVICES 
                WHERE USER_ID = ?;
                `,
                [userId],
                (error, results, fields) => {

                    if (error) {
                        return reject(error);
                    }

                    return resolve(results[0].count);
                }
            )
        });
    }

    static findDeviceById(deviceId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                SELECT *
                FROM USER_DEVICES 
                WHERE ID = ?;
                `,
                [deviceId],
                (error, results, fields) => {

                    if (error) {
                        return reject(error);
                    }

                    if (results.length <= 0) {
                        return reject("Device not found")
                    }

                    const device = {
                        id: results[0].id,
                        user_id: results[0].user_id,
                        name: results[0].name,
                        model: results[0].model
                    };


                    return resolve(device);
                }
            )
        });
    }

    static insertDeviceChange(userId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                INSERT INTO USER_DEVICE_CHANGES (USER_ID)
                VALUES (?)
                ON DUPLICATE KEY UPDATE last_change=CURRENT_TIMESTAMP;
                `,
                [userId],
                (error, results, fields) => {

                    if (error) {
                        return reject(error);
                    }

                    return resolve(results.insertId);
                }
            )

        });
    }

    static changeDevice(userId, deviceId, newDevice) {
        return new Promise((resolve, reject) => {
            this.startTransaction()
                .then(() => {
                    this.startTransaction()
                })
                .then(() => {
                    this.deleteDevice(userId, deviceId);
                    this.createDevice(userId, newDevice);
                    this.insertDeviceChange(userId);
                })
                .then(() => {
                    this.commitTransaction()
                })
                .catch(error => {
                    this.rollbackTransaction();
                    return reject(error)
                })
        });
    }

    static findLastChangeByUserId(userId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                SELECT * FROM USER_DEVICE_CHANGES
                WHERE USER_ID = ?
                `,
                [userId],
                (error, results, fields) => {

                    if (error) {
                        return reject(error);
                    }

                    if (results.length <= 0) {
                        return resolve()
                    }

                    const lastChange = results[0].last_change

                    console.log(lastChange);

                    return resolve(lastChange);
                }
            )
        })
    }
}

module.exports = Database;

