const mysql = require('mysql');

let connection = undefined;

class Database {

    static openConnection() {
        return new Promise((resolve, reject) => {
            connection = mysql.createConnection({
                host: 'localhost',
                user: '',
                password: '',
                database: ''
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
               INSERT INTO USER_DEVICES (ID, USER_ID, NAME, MODEL)
               VALUES (?, ?, ?, ?)
               `,
               [device.id, userId, device.name, device.model],
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

    static deleteDevice(deviceId) {

    }

    static updateDevice(deviceId, newDeviceId) {

    }

    static countDevices(userId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                SELECT COUNT(ID) 
                FROM USER_DEVICES 
                WHERE USER_ID = ?;
                `,
                [userId],
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
}

module.exports = Database;

