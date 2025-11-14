// Import dei moduli built-in Node.js
const fs = require('fs');
const path = require('path');

// Percorso assoluto del file JSON
// __dirname = cartella corrente (models/)
const filePath = path.join(__dirname, "../db/events.json");

// Classe che rappresenta gli eventi del sistema
class Event {
    // Variabile statica usata per generare nuovi ID incrementali
    static lastId = 0;

    constructor (id, title, description, date, maxSeat) {
        // Se viene passato un id → usa quello,
        // altrimenti genera un id nuovo e incrementale
        this.id = id || Event.getNextId();

        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeat = maxSeat;
    }

    // Genera un nuovo ID incrementale
    static getNextId() {
        // Genera ID incrementali (1,2,3,4...)
        Event.lastId = (Event.lastId || 0) + 1;
        return Event.lastId;
    }

    // Legge tutti gli eventi dal file JSON
    static getEvents() {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }

    // Sovrascrive il file JSON con la nuova lista di eventi
    static saveEvents(events) {
        fs.writeFileSync(filePath, JSON.stringify(events, null, 2), 'utf-8');
    }


    // Restituisce un evento specifico in base all'ID
    static getEventById(id) {
        const events = Event.getEvents();
        return events.find((event => event.id === id));
    }

    // Filtra eventi in base a uno o più parametri
    // esempio: { maxSeat: 300 }
    static getEventFiltered(filters) {
        const events = Event.getEvents();
        return events.filter((event) => Object.keys(filters).every(key => event[key] === filters[key])
        );
    }

    //Crea un nuovo evento e lo salva nel JSON
    static createEvent(newEvent) {
        const events = Event.getEvents();
        const event = new Event(
            // Crea un nuovo oggetto Event usando il costruttore della classe
            newEvent.id,
            newEvent.title,
            newEvent.description,
            newEvent.date,
            newEvent.maxSeat
        );
        events.push(event); // aggiunge il nuovo evento
        Event.saveEvents(events); // salva nel file
        console.log(`creato nuovo evento : ${event.title}`);
        return event;
    }

    //aggiorna evento esistente
    static updateEvent(id, updateData) {
        const events = Event.getEvents();
        // Cerca l'indice dell'evento da modificare
        const index = events.findIndex(e => e.id === id);
        // se non esiste → ritorna null
        if(index === -1) return null;

        // Merge tra dati vecchi e nuovi (spread operator)
        events[index] = {...events[index], ...updateData};
        Event.saveEvents(events); // riscrive il file JSON aggiornato
        return events[index]; // restituisce l'evento aggiornato
    }
}
module.exports = Event;
