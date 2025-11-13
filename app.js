const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const routerEvents = require('./routers/events.js');

app.use(express.json());
app.get('/', (req, res) => {
    res.send(`
        <h1>Gestore Eventi</h1>
        <div><a href="http:${host}:${port}/events" target="_blank">Lista eventi</a>
        </div>
        `);
    }
);
app.use('/events', routerEvents);
app.listen(port, () => {
    console.log(`server attivo su http://${host}:${port}`);
})