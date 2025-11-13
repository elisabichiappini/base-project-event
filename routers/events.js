const express = require('express');
const router = express.Router();
const controllerEvents = require('../controllers/events.js');
router.get('/', controllerEvents.index);
router.get('/:id', controllerEvents.show);
router.post('/', controllerEvents.store);
router.put('/:event', controllerEvents.update);
module.exports = router;