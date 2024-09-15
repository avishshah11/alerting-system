const Alerts = require("../models/alerts-table")

const getAlerts = async (req, res) => {
    try {
        const alerts = await Alerts.find({})
        res.status(200).json(alerts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const createAlert = async (req, res) => {
    try {
        const alerts = await Alerts.create(req.body)
        res.status(200).json(alerts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = {
    getAlerts,
    createAlert
}