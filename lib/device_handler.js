const mysql = require('./database'),
    moment = require('moment');

const deviceLimit = 3;

function verifyDate(date) {
    const diffDays = moment().diff(moment(date), 'days');

    console.log(diffDays);

    return diffDays > 30
}

function calcDays(date) {
    const days = moment().add(30, 'days');

    console.log(days);

    return days
}

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
                return res.status(500).send({message: error})
            })
    }

    static delete(req, res, next) {
        const userId = req.params.user_id,
            deviceId = req.params.device_id;

        return mysql.countDevices(userId)
            .then(count => {
                if (count < 2) {
                    res.status(400).send({message: "Could not remove device"})

                } else {
                    return mysql.findDeviceById(deviceId)
                        .then(device => {

                            return mysql.deleteDevice(userId, device.id)
                                .then(() => {
                                    res.status(200).send({message: "Device deleted"})
                                })
                                .catch((error) => {
                                    res.status(500).send({message: error})
                                });
                        })
                        .catch(error => {
                            res.status(400).send({message: error})
                        })
                }
            })
            .catch(error => {
                res.status(500).send({message: error})
            });
    }

    static update(req, res, next) {
        const userId = req.params.user_id,
            deviceId = req.params.device_id,
            newDevice = req.body.device;

        return mysql.updateDevice(userId, deviceId, newDevice)
            .then(() => {
                res.status(200).send({message: "Device updated"})
            })
            .catch((error) => {
                res.status(500).send({message: error})
            });
    }

    static change(req, res, next) {
        const userId = req.params.user_id,
            deviceId = req.params.device_id,
            newDevice = req.body.device;

        return mysql.findLastChangeByUserId(userId)
            .then(last_change => {
                if (last_change === undefined ||
                    (last_change !== undefined && verifyDate(last_change, 30))) {
                    return mysql.changeDevice(userId, deviceId, newDevice)
                        .then(() => {
                            res.status(200).send({message: "Device changed"})
                        })
                } else {
                    res.status(400).send(
                        {
                            message: "You can only change a device after " + calcDays(last_change).format("DD/MM/YYYY")
                        })
                }
            })
            .catch((error) => {
                res.status(500).send({message: error})
            });
    }

    static healthcheck(req, res, next) {
        res.status(200).send("Up and running");
    }

}

module.exports = DeviceHandler;