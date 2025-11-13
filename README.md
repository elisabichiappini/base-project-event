# Esercitazione NODEJS, EXPRESS, JEST -> EVENTS

4 moduli principali:

Model (models/event.js) → gestisce il file JSON (lettura/scrittura)

Controller (controllers/events.js) → gestisce le logiche e risponde alle richieste

Router (routers/events.js) → collega gli endpoint ai metodi del controller

app.js (server principale) → avvia Express e usa i router

E un file database locale:

db/events.json → contiene i dati degli eventi.

### riassunto:
- Struttura MVC con Express.

- Come leggere e scrivere file JSON come “database”.

- Come creare e montare un router modulare.

- Come gestire errori e middleware in Express.

- Come aggiornare un record con PUT.