const fs = require('fs');
const path = require('path');

// Percorso assoluto del file JSON
const filePath = path.join(__dirname, "../db/events.json");
class Event {
    static lastId = 0;

    constructor (id, title, description, date, maxSeat) {
        this.id = id || Event.getNextId();
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeat = maxSeat;
    }

    // Genera un nuovo ID incrementale
    static getNextId() {
        Event.lastId = (Event.lastId || 0) + 1;
        return Event.lastId;
    }

    // Legge tutti gli eventi dal file JSON
    static getEvents() {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }

    // Salva tutti gli eventi nel file JSON
    static saveEvents(events) {
        fs.writeFileSync(filePath, JSON.stringify(events, null, 2), 'utf-8');
    }


    // Restituisce un evento specifico per ID
    static getEventById(id) {
        const events = Event.getEvents();
        return events.find((event => event.id === id));
    }

    // Filtra gli eventi in base a parametri
    static getEventFiltered(filters) {
        const events = Event.getEvents();
        return events.filter((event) => Object.keys(filters).every(key => event[key] === filters[key])
        );
    }

    // Crea e salva un nuovo evento
    static createEvent(newEvent) {
        const events = Event.getEvents();
        const event = new Event(
            newEvent.id,
            newEvent.title,
            newEvent.description,
            newEvent.date,
            newEvent.maxSeat
        );
        events.push(event);
        Event.saveEvents(events);
        console.log(`creato nuovo evento : ${event.title}`);
        return event;
    }

    //aggiorna evento esistente
    static updateEvent(id, updateData) {
        const events = Event.getEvents();
        const index = events.findIndex(e => e.id === id);
        if(index === -1) return null;

        events[index] = {...events[index], ...updateData};
        Event.saveEvents(events);
        return events[index];
    }
}
module.exports = Event;
