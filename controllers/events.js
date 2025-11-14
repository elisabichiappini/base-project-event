// Importiamo il MODEL degli eventi 
// Questo file contiene i metodi che leggono e scrivono nel file JSON
const eventModel = require('../models/event.js');

// Lista di tutti gli eventi
const index = (req, res) => {
    try {
        // Chiamata al MODEL per prendere tutti gli eventi dal file JSON
        const events = eventModel.getEvents();
            // Se per qualche motivo non ci sono eventi → errore
        if (!events) throw new Error('errore nella lettura degli eventi');
        // Risposta JSON con tutti gli eventi
        res.json(events);
    } catch(error) {
        // In caso di errore, restituiamo un errore 500 (errore server)s
        res.status(500).json({ error: error.message });
    }    
};

// Mostra un evento specifico per ID
const show = (req, res) => {
    try {
        // Estrae l'id dalla URL e lo converte in numero
        const event = eventModel.getEventById(parseInt(req.params.id));
        // Se non trova l'evento → 404 Not Found
        if (!event) {
            return res.status(404).json({ error: 'evento non trovato' });
        }
        // Restituisce l'evento trovato
        res.json(event);
    } catch (error) {
        // Errore interno del server
        res.status(500).json({ error: 'errore durante il recupero evento' });
    }
};

// Crea un nuovo evento
const store = (req, res) => {
    try {
        // req.body contiene i dati inviati dal client tramite POST
        const newEvent = eventModel.createEvent(req.body);
        // Risposta 201 Created con il nuovo evento
        res.status(201).json(newEvent);
    } catch (error) {
        // Errore interno
        res.status(500).json({ error: 'errore durante la creazione evento' });
    }
};

// Aggiorna evento
const update = (req, res) => {
    try {
        // Cerca l'evento e lo aggiorna
        // - parseInt(req.params.id) → ID preso dall'URL
        // - req.body → dati aggiornati
        const updatedEvent = eventModel.updateEvent(parseInt(req.params.id), req.body);
        // Se non trova l’evento → errore 404
        if (!updatedEvent) {
            return res.status(404).json({ error: 'evento non trovato' });
        }
        // Restituisce l'evento modificato
        res.json(updatedEvent);
    } catch(error) {
        // Errore generico del server
        res.status(500).json({ error: 'errore durante aggiornamento evento' });
    }
};

module.exports = { index, show, store, update };
