const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"]; 
    // En la parte de autorización en la ruta /protected pasar lo siguiente
    // Key: Authorization
    // Value: Bearer y después el token obtenido en register

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
        
        req.userId = decoded.id;

        next();
    });
};