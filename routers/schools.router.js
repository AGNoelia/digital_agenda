//Rutas del módulo
const express = require("express");
const router = express.Router();

//***********************************************************************
//                      SCHOOLS
//***********************************************************************
const controller = require("../controllers/schools.controller");
// Método GET: Para todas las escuelas
router.get('/', controller.allSchools);

// Método GET: Para una escuela
router.get('/:id_school', controller.aSchool);

// Método POST: Para cargar escuelas
router.post('/', controller.loadSchools);

// Método PUT: Para modificar escuelas
router.put('/:id_school', controller.updateSchool);

// Método DELETE: Para eliminar escuelas
router.delete('/:id_school', controller.deleteSchool);

// Exportar routers
module.exports = router;