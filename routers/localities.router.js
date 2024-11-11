//Rutas del módulo
const express = require("express");
const router = express.Router();

//***********************************************************************
//                      LOCALITIES
//***********************************************************************
const controller = require("../controllers/localities.controller");

// Método GET: Para todas las localidades
router.get('/', controller.allLocalities);

// Método GET: Para una localidad
router.get('/:id_locality', controller.aLocality);

// Método POST: Para cargar localidades
router.post('/', controller.loadLocalities);

// Método PUT: Para modificar localidades
router.put('/:id_locality', controller.updateLocality);

// Método DELETE: Para eliminar localidades
router.delete('/:id_locality', controller.deleteLocality);

// Exportar routers
module.exports = router;