const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = require("../models/user.models");
const users = require("../models/user.models");

// **********************************************
//              FUNCIÓN PARA REGISTRAR
// **********************************************
const register = (req, res) => {
    // Estos valores se envian en el body del POSTMAN, en realidad se enviaría por formulario.
    const {email, password} = req.body;
    // Se arma el hash. Se pide que se hashee la contraseña a un nivel 8.
    const hash = bcrypt.hashSync(password, 8); 
    // Muestro el hash
    console.log(hash);

    // Se hace de esta manera porque estamos en una lista, pero después vamos a reemplazar por una tabla
    const user = {id: Date.now(), email, password: hash};
    // Guardamos el usuario en la lista
    userModel.push(user);
    // Mostramos los usuarios
    console.log(users);

    //Se define el token, duración de tiempo en 1 hora.
    // SECRET_KEY: Se genera en la página https://getmypassword.com/
    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });

    res.status(201).send({auth: true, token});
};

// *********************************************************
//              FUNCIÓN PARA INGRESAR (LOG IN)
// *********************************************************
const login = (req, res) => {
    const {email, password} = req.body;
    // Se usa el find porque se está trabajando con una lista
    const user = userModel.find((u) => u.email === email);
    // Si no se encuentra el usuario retorna un 404.
    if(!user) return res.status(404).send("User not found.");
    // Se compara el password con lo que tiene el usuario y el password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if(!passwordIsValid){
        // Si es falso, me aparece un 401
        return res.status(401).send({auth: false, token: null});
    }
    // Genero un token para que dure 1h.
    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });
};

module.exports = {
    register, 
    login,
};