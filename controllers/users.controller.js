// Controladores del módulo
const db = require("../db/db");

// Método GET: Para todos los usuarios
const allUsers = (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (error, rows) => {
        console.log(error)
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        res.json(rows);
    });
};

// Método GET: Para un user
const aUser = (req, res) => {
    const {id_user} = req.params;
    const sql = "SELECT * FROM users WHERE id_user = ?";
    db.query(sql,[id_user], (error, rows) => { 
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(rows.length == 0){
            return res.status(404).send({error: "ERROR: Doesn't exist the user"})
        };
        res.json(rows[0]);
        //Mostramos el elemento en la posición cero si existe.
    });
};

// Método PUT
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

// Método DELETE
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

// Exportar del módulo todas las funciones
module.exports = {
    allUsers,
    aUser,
    updateUser,
    deleteUser,
};