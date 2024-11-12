const jwt = require("jsonwebtoken");
const db = require("../db/db")

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"]; 
    // En la parte de autorización en la ruta /protected pasar lo siguiente
    // Authorization: Bearer + token obtenido en register

    if(!authHeader)
        return res
            .status(403)
            .send({auth: false, message: "The token was not generated"});

    const token = authHeader.split(" ")[1];

    if(!token)
        return res.status(403).send({auth: false, message: "Malformed Token"});

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error)
            return res
                .status(500)
                .send({auth: false, message: "Failed to authenticate token."});
        
        //Busca el nombre de usuario para el id de usuario
        console.log("decoded.id_user", decoded.id_user)
        db.query("SELECT name_user from users WHERE id_user = ?", [decoded.id_user], (error, result) => {
            console.log("error: ",error);
            console.log("result",result[0].name_user)
            req.userName = result[0].name_user;

            next();
        });        
    });
};