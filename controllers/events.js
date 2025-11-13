const eventModel = require('../models/event.js');

// Lista di tutti gli eventi
const index = (req, res) => {
    try {
        const events = eventModel.getEvents();
        if (!events) throw new Error('errore nella lettura degli eventi');
        res.json(events);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }    
};

// Mostra un evento specifico per ID
const show = (req, res) => {
    try {
        const event = eventModel.getEventById(parseInt(req.params.id));
        if (!event) {
            return res.status(404).json({ error: 'evento non trovato' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'errore durante il recupero evento' });
    }
};

// Crea un nuovo evento
const store = (req, res) => {
    try {
        const newEvent = eventModel.createEvent(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'errore durante la creazione evento' });
    }
};

// Aggiorna evento
const update = (req, res) => {
    try {
        const updatedEvent = eventModel.updateEvent(parseInt(req.params.id), req.body);
        if (!updatedEvent) {
            return res.status(404).json({ error: 'evento non trovato' });
        }
        res.json(updatedEvent);
    } catch(error) {
        res.status(500).json({ error: 'errore durante aggiornamento evento' });
    }
};

module.exports = { index, show, store, update };
