module.exports = (req, res, next) => {
    // Codice HTTP per "Not Found"
    const statusCode = 404;
    res.format({
        html: () => {
            res.status(statusCode).send(`
                <h2>404 - Pagina non trovata</h2>
            `)
        },
        json: () => {
            res.status(statusCode).send({statusCode, error: 'pagina non trovata'})
        }
    })
}