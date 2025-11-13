const express = require('express');
const router = express.Router();
const controllerEvents = require('../controllers/events.js');

//index
router.get('/', controllerEvents.index);

//show
router.get('/:id', controllerEvents.show);

//store
router.post('/', controllerEvents.store);

//update
router.put('/:id', controllerEvents.update);

module.exports = router;