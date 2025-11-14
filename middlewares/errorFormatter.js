// Middleware di gestione degli errori in Express
// Deve avere SEMPRE 4 parametri: (err, req, res, next)
module.exports = (err, req, res, next) => {
    // Codice di stato di default per errori server
    const statusCode = 500;
    // res.format permette di rispondere con formati diversi 
    // in base a ciò che il client accetta (HTML, JSON, ecc.)
    res.format({
        html: () => {
            res.status(statusCode).send(`Qualcosa non è andato a buon fine. ` + err.message);
        },
        json:() => {
            res.status(statusCode).json({statusCode, error: err.message, stack: err.stack})
        }
    })
}