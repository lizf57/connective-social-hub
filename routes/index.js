const router = require('express').Router();
const { model } = require('mongoose');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route'));

module.exports = router;