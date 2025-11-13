const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// Middleware per gestire JSON nel body
app.use(express.json());

//Import router
const routerEvents = require('./routers/events.js');

// Monta le rotte /events
app.use('/events', routerEvents);

//middleware geenrico per loggare ogni richeista
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

//middleware per gestire rotte non trovate
app.use((req, res) => {
    res.status(404).json({error: 'rotta non trovata'});
});

app.listen(port, () => {
    console.log(`server attivo su http://${host}:${port}`);
});