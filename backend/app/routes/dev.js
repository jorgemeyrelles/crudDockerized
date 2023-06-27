const controller = require('../Controllers/dev.js');
const router = require('express').Router();

router.get('/version', controller.version);

module.exports = router;
