const eventModel = require('../models/event.js');
const index = (req, res) => {
    if (!events) throw new Error('errore nella lettura degli eventi');
    res.json(events);
}

const show = (req, res) => {
    try {
        const event = eventModel.getEventById(parseInt(req.params.id));
        if (!error) {
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