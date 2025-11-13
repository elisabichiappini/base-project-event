const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(express.json());

// ROUTER EVENTI
const routerEvents = require('./routers/events.js');

// 👉 HOME qui, NON nel router events
app.get('/', (req, res) => {
    res.json({
        message: "Benvenuta nella Event API 🎉",
        endpoints: {
            listaEventi: "/events",
            eventoSingolo: "/events/:id",
            creaEvento: "POST /events",
            aggiornaEvento: "PUT /events/:id"
        }
    });
});

// 👉 Monta il router degli eventi
app.use('/events', routerEvents);

// MIDDLEWARE LOG
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// ERRORE 404
app.use((req, res) => {
    res.status(404).json({ error: 'rotta non trovata' });
});

app.listen(port, () => {
    console.log(`Server attivo su http://${host}:${port}`);
});
