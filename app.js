const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(express.json());

// ROUTER EVENTI
const routerEvents = require('./routers/events.js');

// 👉 HOME qui, NON nel router events
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

// 👉 Monta il router degli eventi
app.use('/events', routerEvents);

//MIDDLEWARE IMPORT
const errorFormatter = require('./middlewares/errorFormatter.js');
const routerNotFound = require('./middlewares/routerNotFound.js');

//applicazione dei middleware
app.use(errorFormatter);
app.use(routerNotFound);

app.listen(port, () => {
    console.log(`Server attivo su http://${host}:${port}`);
});
