//Rutas del módulo
const express = require("express");
const router = express.Router();

//***********************************************************************
//                      TASKS
//***********************************************************************
const controller = require("../controllers/tasks.controller");

// Método GET: Para todas las tareas
router.get('/', controller.allTasks);

// Método GET: Para una tarea
router.get('/:id_task', controller.aTask);

// Método POST: Para cargar tareas
router.post('/', controller.loadTasks);

// Método PUT: Para modificar tareas
router.put('/:id_task', controller.updateTask);

// Método DELETE: Para eliminar tareas
router.delete('/:id_task', controller.deleteTask);

// Exportar routers
module.exports = router;