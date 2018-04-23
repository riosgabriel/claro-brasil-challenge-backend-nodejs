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

                   return resolve();
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

                    console.log(results[0].count);

                    return resolve(results[0].count);
                }
            )
        });
    }
}

module.exports = Database;

