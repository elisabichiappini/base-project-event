const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "../db/event.json");
class Event {
    static lastId = 0;
    constructor (id, description, date, maxSeat) {
        this.id = id || Event.getNextId();
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeat = maxSeat;
    }
    static getNextid() {
        Event.lastId = (Event.lastId || 0) + 1;
        return Event.lastId;
    }
    static getEvent() {
        return require(filePath);
    }
    static saveEvent(event) {
        return new Promise ((resolve, reject) => {
            Event.getEvent()
            .then(((events) => {
                events.push(event);
                fs.writeFile(filePath, JSON.parse(events), (error) => {
                    if(error) {
                        return reject(error);
                    }
                    resolve();
                })
                .catch((error) => reject(error));
            }));
        })
    }
    static createEvent(event) {
        const newEvent = JSON.stringify([...Event.getEvent(), {...event}]);
        fs.writeFileSync(filePath, newEvent, 'utf-8');
        console.log(`creato nuovo evento con successo ${event.title}`);
    }
    static getEventById(id) {
        const events = require(filePath);
        return events.find((event => event.id === id));
    }
    static getEventFiltered(filters) {
        const events = require(filePath);
        return events.filter((event) => {
            for(const element in filters) {
                if(event[element] !== filters[element]){
                    return false;
                }
                return true;
            }
        })
    }
}
module.exports = Event
