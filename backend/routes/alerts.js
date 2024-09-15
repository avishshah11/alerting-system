const express = require('express');
const { getAlerts, createAlert } = require('../controllers/alerts.js');

const routes = express.Router()

routes.get('/alerts', getAlerts);

routes.post('/alerts', createAlert);

module.exports = routes