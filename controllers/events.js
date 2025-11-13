const eventModel = require('../models/event.js');

// Lista di tutti gli eventi
const index = (req, res) => {
    try {
        const events = Event.getEvent();
        if (!events) throw new Error('errore nella lettura degli eventi');
        res.json(events);
    } catch( error) {
        res.status(500).json({erorr: error.message})
    }
    
}

// Mostra un evento specifico per ID
const show = (req, res) => {
    try {
        const event = eventModel.getEventById(parseInt(req.params.id));
        if (!event) {
            return res.status(404).json({ error: 'errore non trovato' });
        }
        res.json(event);
    } catch (error) {
        console.error('errore durante il recupero evento: ', error);
        res.status(500).json({
            error: 'si è verificato un errore duratne il recupero evento'
        })
    }
}
const store = (req, res) => {
    res.send('sono store');
}
const update = (req, res) => {
    res.send('sono update');
}

module.exports = {
    index, store, show, update
}