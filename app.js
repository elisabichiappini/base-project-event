//importo express
const express = require('express');
const app = express();

//configurazione port e host
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

//per poter fare richieste POST e PUT con body JSON.
app.use(express.json());

// ROUTER EVENTI
const routerEvents = require('./routers/events.js');
//MIDDLEWARE IMPORT
const errorFormatter = require('./middlewares/errorFormatter.js');
const routerNotFound = require('./middlewares/routerNotFound.js');


// rotta home
app.get('/', (req, res) => {
    res.send(`
        <h1>Benvenuti nella event api</h1>
        <a href="/events" target=_blank>clicca qui epr vedere gli eventi</a>
        <div>
        <p>endpoints:</p>
        <ul>
            <li>listaEventi: "/events"</li>
            <li>eventoSingolo: "/events/:id"</li>
            <li>creaEvento: "POST /events"</li>
            <li>aggiornaEvento: "PUT /events/:id"</li>
        </ul>
        </div>
        `)

    //questo codice è in caso di risposta dal servere in json
    // res.json({
    //     message: "Benvenuta nella Event API 🎉",
    //     endpoints: {
    //         listaEventi: "/events",
    //         eventoSingolo: "/events/:id",
    //         creaEvento: "POST /events",
    //         aggiornaEvento: "PUT /events/:id"
    //     }
    // });
});

// rotta events
app.use('/events', routerEvents);

//applicazione dei middleware
//GESTIONE ERRORI
app.use(errorFormatter);
//GESTIONE 404
app.use(routerNotFound);

//avvio server
app.listen(port, () => {
    console.log(`Server attivo su http://${host}:${port}`);
});
