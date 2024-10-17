//Rutas del módulo
const express = require("express");
const router = express.Router();

//***********************************************************************
//                      COURSES
//***********************************************************************
const controller = require("../controllers/courses.controller");

// Método GET: Para todos los cursos
router.get('/', controller.allCourses);

// Método GET: Para un cursos
router.get('/:id_course', controller.aCourse);

// Método POST: Para cargar cursos
router.post('/', controller.loadCourses);

// Método PUT: Para modificar cursos
router.put('/:id_course', controller.updateCourse);

// Método DELETE: Para eliminar cursos
router.delete('/:id_course', controller.deleteCourse);

// Exportar routers
module.exports = router;