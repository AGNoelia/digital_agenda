// Controladores del módulo
const db = require("../db/db");

// Método GET: Para todas las localidades
const allLocalities = (req, res) => {
    const sql = "SELECT * FROM localities";
    console.log(sql);
    db.query(sql, (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "Error: Try later."})
        }
        res.json(rows);
    });
};

// Método GET: Para una localidad
const aLocality= (req, res) => {
    const {id_locality} = req.params;
    const sql = "SELECT * FROM localities WHERE id_locality = ?";
    db.query(sql,[id_locality], (error, rows) => { 
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(rows.length == 0){
            return res.status(404).send({error: "ERROR: Doesn't exist the locality."})
        };
        res.json(rows[0]);
        //Mostramos el elemento en la posición cero si existe.
    });
};

// Método POST
const loadLocalities = (req, res) => {
    const {locality_description} = req.body;
    const sql = "INSERT INTO localities (locality_description) VALUES (?)"
    db.query(sql,[locality_description], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        const locality = {...req.body, id: result.insertId}; // Reconstruimos el objeto del body
        res.status(201).json(locality);
    });
};

// Método PUT
const updateLocality = (req, res) => {
    const {id_locality} = req.params;
    const {locality_description} = req.body;
    const sql = "UPDATE locality SET locality_description = ? WHERE id_locality = ?"
    db.query(sql,[locality_description, id_locality], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The course to update doesn't exist."})
        }
        const course = {...req.body, ...req.params}; // Reconstruimos el objeto del body
        res.json(course);
    });
};

// Método DELETE
const deleteLocality = (req, res) => {
    const {id_locality} = req.params;
    const sql = "DELETE FROM localities WHERE id_locality = ?"
    db.query(sql,[id_locality], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The course to delete doesn't exist."})
        }
        res.json({mensaje: "course deleted"});
    });
};

// Exportar del módulo todas las funciones
module.exports = {
    allLocalities,
    aLocality,
    loadLocalities,
    updateLocality,
    deleteLocality,
};