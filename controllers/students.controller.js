// Controladores del módulo
const db = require("../db/db");

// Método GET: Para todos los alumnos
const allStudents = (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"})
        }
        res.json(rows);
    });
};

// Método GET: Para un alumno
const aStudent = (req, res) => {
    const {id_student} = req.params;
    const sql = "SELECT * FROM students WHERE id_student = ?";
    db.query(sql,[id_student], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        if(rows.length == 0){
            return res.status(404).send({error: "ERROR: Doesn't exist the student"})
        };
        res.json(rows[0]);
        //Mostramos el elemento en la posición cero si existe.
    });
};

// Método POST
const loadStudents = (req, res) => {
    const {name, last_name, identity_card, course} = req.body;
    const sql = "INSERT INTO students (name, last_name, identity_card, course) VALUES (?, ?, ?, ?)"
    db.query(sql,[name, last_name, identity_card, course], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        const student = {...req.body, id: result.insertId}; // Reconstruimos el objeto del body
        res.status(201).json(student);
    });
};

// Método PUT
const updateStudent = (req, res) => {
    const {id_student} = req.params;
    const {name, last_name, identity_card, course} = req.body;
    const sql = "UPDATE students SET name = ?, last_name = ?, identity_card = ?, course = ? WHERE id_student = ?"
    db.query(sql,[name, last_name, identity_card, course, id_student], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The Student to update doesn't exist"})
        }
        const student = {...req.body, ...req.params}; // Reconstruimos el objeto del body
        res.json(student);
    });
};

// Método DELETE
const deleteStudent = (req, res) => {
    const {id_student} = req.params;
    const sql = "DELETE FROM students WHERE id_student = ?"
    db.query(sql,[id_student], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The Student to delete doesn't exist"})
        }
        res.json({mensaje: "Student deleted"});
    });
};

// Exportar del módulo todas las funciones
module.exports = {
    allStudents,
    aStudent,
    loadStudents,
    updateStudent,
    deleteStudent,
};