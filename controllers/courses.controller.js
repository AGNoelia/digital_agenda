// Controladores del módulo
const db = require("../db/db");

// Método GET: Para todos los cursos
const allCourses = (req, res) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"})
        }
        res.json(rows);
    });
};

// Método GET: Para un curso
const aCourse = (req, res) => {
    const {id_course} = req.params;
    const sql = "SELECT * FROM courses WHERE id_course = ?";
    db.query(sql,[id_course], (error, rows) => { 
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        if(rows.length == 0){
            return res.status(404).send({error: "ERROR: Doesn't exist the course"})
        };
        res.json(rows[0]);
        //Mostramos el elemento en la posición cero si existe.
    });
};

// Método POST
const loadCourses = (req, res) => {
    const {name_course, days, titular} = req.body;
    const sql = "INSERT INTO courses (name_course, days, titular) VALUES (?, ?, ?)"
    db.query(sql,[name_course, days, titular], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        const course = {...req.body, id: result.insertId}; // Reconstruimos el objeto del body
        res.status(201).json(course);
    });
};

// Método PUT
const updateCourse = (req, res) => {
    const {id_course} = req.params;
    const {name_course, days, titular} = req.body;
    const sql = "UPDATE courses SET name_course = ?, days = ?, titular = ? WHERE id_course = ?"
    db.query(sql,[name_course, days, titular, id_course], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The course to update doesn't exist"})
        }
        const course = {...req.body, ...req.params}; // Reconstruimos el objeto del body
        res.json(course);
    });
};

// Método DELETE
const deleteCourse = (req, res) => {
    const {id_course} = req.params;
    const sql = "DELETE FROM courses WHERE id_course = ?"
    db.query(sql,[id_course], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The course to delete doesn't exist"})
        }
        res.json({mensaje: "course deleted"});
    });
};

// Exportar del módulo todas las funciones
module.exports = {
    allCourses,
    aCourse,
    loadCourses,
    updateCourse,
    deleteCourse,
};