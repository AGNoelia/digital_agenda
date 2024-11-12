// Controladores del módulo
const db = require("../db/db");

// Método GET: Para todas las escuelas
const allSchools = (req, res) => {
    const sql = "SELECT * FROM schools";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        res.json(rows);
    });
};

// Método GET: Para una escuela
const aSchool = (req, res) => {
    const {id_school} = req.params;
    const sql = "SELECT * FROM schools WHERE id_school = ?";
    db.query(sql,[id_school], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(rows.length == 0){
            return res.status(404).send({error: "ERROR: Doesn't exist the student."})
        };
        res.json(rows[0]);
        //Mostramos el elemento en la posición cero si existe.
    });
};

// Método POST
const loadSchools = (req, res) => {
    const {school_name, school_address, locality} = req.body;
    const sql = "INSERT INTO schools (school_name, school_address, locality) VALUES (?, ?, ?)"
    db.query(sql,[school_name, school_address, locality], (error, result) => {
        console.log(error)
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        const school = {...req.body, id: result.insertId}; // Reconstruimos el objeto del body
        res.status(201).json(school);
    });
};

// Método PUT
const updateSchool = (req, res) => {
    const {id_school} = req.params;
    const {school_name, school_address, locality} = req.body;
    const sql = "UPDATE schools SET school_name = ?, school_address = ?, locality = ? WHERE id_school = ?"
    db.query(sql,[school_name, school_address, locality, id_school], (error, result) => {
        console.log(error);
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The school to update doesn't exist."})
        }
        const school = {...req.body, ...req.params}; // Reconstruimos el objeto del body
        res.json(school);
    });
};

// Método DELETE
const deleteSchool = (req, res) => {
    const {id_school} = req.params;
    const sql = "DELETE FROM schools WHERE id_school = ?"
    db.query(sql,[id_school], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The school to delete doesn't exist."})
        }
        res.json({mensaje: "School deleted"});
    });
};

// Exportar del módulo todas las funciones
module.exports = {
    allSchools,
    aSchool,
    loadSchools,
    updateSchool,
    deleteSchool,
};