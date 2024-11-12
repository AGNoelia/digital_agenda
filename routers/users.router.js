//Rutas del módulo
const express = require("express");
const router = express.Router();

//***********************************************************************
//                      USERS
//***********************************************************************
const controller = require("../controllers/users.controller");

// Método GET: Para todas los usuarios
router.get('/', controller.allUsers);

// Método GET: Para un user
router.get('/:id_user', controller.aUser);

// Método PUT: Para modificar usuario ya cargado
router.put('/:id_user', controller.updateUser);

// Método DELETE: Para eliminar usuario
router.delete('/:id_user', controller.deleteUser);

// Exportar routers
module.exports = router;