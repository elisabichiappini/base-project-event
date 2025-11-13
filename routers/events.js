const express = require('express');
const router = express.Router();
const controllerEvents = require('../controllers/events.js');



// INDEX — lista eventi: GET /events
router.get('/', controllerEvents.index);

// SHOW — evento singolo: GET /events/:id
router.get('/:id', controllerEvents.show);

// STORE — crea evento: POST /events
router.post('/', controllerEvents.store);

// UPDATE — aggiorna evento: PUT /events/:id
router.put('/:id', controllerEvents.update);

module.exports = router;
