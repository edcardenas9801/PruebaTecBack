module.exports = (app) => {
    app.get("/", (req, res)=>{
        res.send("-- Prueba técnica --");
    });

    app.get("*", (req, res)=>{
        res.send("No encontramos la ruta solicitada");
    });
}