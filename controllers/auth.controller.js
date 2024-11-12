const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db")

// ***********************************************************
//              FUNCIÓN PARA REGISTRAR UN USUARIO
// ***********************************************************
const register = (req, res) => {
    console.log(req.file);
    let imageName = "";
    if(req.file){
        imageName = req.file.filename;
    };

    // Estos valores se envian en el body del POSTMAN, en realidad se enviaría por formulario.
    const {name_user, email_user, password, imagen} = req.body;
    // Se arma el hash. Se pide que se hashee la contraseña a un nivel 8.
    const hash = bcrypt.hashSync(password, 8); 
    // Muestro el hash
    //console.log(hash);

    const sql = "INSERT INTO users (name_user, email_user, password, imagen) VALUES (?, ?, ?, ?)"

    db.query(sql,[name_user, email_user, password, imageName], (error, result) => {
        console.log(result);
        console.log(error);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        const user = {...req.body, id_user: result.insertId, password: hash}; // Reconstruimos el objeto del body

        //Se define el token, duración de tiempo en 1 hora.
        // SECRET_KEY: Se genera en la página https://getmypassword.com/
        const token = jwt.sign({id_user: result.insertId}, process.env.SECRET_KEY, {
        expiresIn: "1h",
        });

        res.status(201).send({auth: true, token});
    });
};

// ************************************************************************
//              FUNCIÓN PARA INGRESAR (LOG IN - AUTENTICACIÓN)
// ************************************************************************
const login = (req, res) => {
    const {name_user, email_user, password} = req.body;

    // Busca al usuario por nombre de usuario, correo electrónico y contraseña
    db.query("SELECT * from users WHERE name_user = ? AND email_user = ? AND password = ?", [name_user, email_user, password], (error, result) => {
        if(error){
            console.log("Login error", error)
            return res.status(500).send("Error during login.");
        }

        // Verifica si existe el usuario
        if(result.length === 0){
            return res.status(404).send("User not found.");
        }

        const user = result[0];
        console.log("Retrieved user:", user);

        // Verifica que la contraseña no esté vacía o indefinida
        if(!user.password){
            console.error("Password not set for this user.");
            return res.status(500).send("Password not set for this user.");
        }

        //Compara la contraseña proporcionada con la almacenada en la base de datos
        bcrypt.compare(password, user.password, (err, passwordInvalid) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send("Error comparing passwords");
            }

            if (passwordInvalid) {
                return res.status(401).send({ auth: false, token: null });
            }

            // Generar un token JWT con el ID del usuario
            const token = jwt.sign({ id: user.id_user }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            // Enviar la respuesta con el token
            res.send({ auth: true, token });
        });
    });
};     

// *********************************************************
//              FUNCIÓN PARA MODIFICAR UN USUARIO
// *********************************************************
const updateUser = (req, res) => {
    const {id_user} = req.params;
    const {name_user, email_user, password} = req.body;
    const sql = "UPDATE users SET name_user = ?, email_user = ?, password = ? WHERE id_user = ?"
    db.query(sql,[name_user, email_user, password, id_user], (error, result) => {
        if(error){
            return res.status(500).json({error: "ERROR: Try later"})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The user to update doesn't exist"})
        }

        const user = {...req.body, ...req.params}; // Reconstruimos el objeto body
        res.json(user)
    });
};

// *********************************************************
//              FUNCIÓN PARA ELIMINAR UN USUARIO
// *********************************************************
const deleteUser = (req, res) => {
    const {id_user} = req.params;
    const sql = "DELETE FROM users WHERE id_user = ?"
    db.query(sql,[id_user], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Try later."})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The user to delete doesn't exist."})
        }

        res.json({mensaje: "User deleted."})
    });
};

module.exports = {
    register, 
    login,
    updateUser,
    deleteUser,
};