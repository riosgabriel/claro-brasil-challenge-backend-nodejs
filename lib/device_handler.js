const mysql = require('./database');

mysql.openConnection();

const deviceLimit = 3;

class DeviceHandler {

    static create(req, res, next) {
        const userId = req.params.user_id,
            device = req.body.device;

        return mysql.countDevices(userId)
            .then(count => {
                if (count < deviceLimit) {
                    return mysql.createDevice(userId, device)
                        .then(() => {
                            res.status(200).send({message: "Device created"})
                        })
                } else {
                    return res.status(400).send({message: "Device limit reached"});
                }
            })
            .catch(error => {
                return res.status(500).send({status: 500, message: error})
            })
    }

    static delete(req, res, next) {
        const userId = req.params.user_id,
            deviceId = req.params.device_id;

        return mysql.findDeviceById(deviceId)
            .then(device => {
                return mysql.deleteDevice(userId, device.id)
                    .then(() => {
                        res.status(200).send({status: 200})
                    })
                    .catch((error) => {
                        res.status(500).send({status: 500, message: error})
                    });
            })
            .catch(error => {
                res.status(400).send({message: error})
            })
    }

    static update(req, res, next) {
        const userId = req.params.user_id,
            deviceId = req.params.device_id,
            device = req.body.device;

        return mysql.updateDevice(userId, deviceId, newDevice)
            .then(() => {
                res.status(200).send({status: 200})
            })
            .catch((error) => {
                res.status(500).send({status: 500, message: error})
            });
    }
}

module.exports = DeviceHandler;