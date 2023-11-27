const router = require('express').Routes();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;