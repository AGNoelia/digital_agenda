//Rutas del módulo
const express = require("express");
const router = express.Router();

//***********************************************************************
//                      STUDENTS
//***********************************************************************
const controller = require("../controllers/students.controller");
// Método GET: Para todos los alumnos
router.get('/', controller.allStudents);

// Método GET: Para un alumno
router.get('/:id_student', controller.aStudent);

// Método POST: Para cargar alumnos
router.post('/', controller.loadStudents);

// Método PUT: Para modificar alumnos
router.put('/:id_student', controller.updateStudent);

// Método DELETE: Para eliminar alumnos
router.delete('/:id_student', controller.deleteStudent);

// Exportar routers
module.exports = router;