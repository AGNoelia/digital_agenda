//Rutas del módulo
const express = require("express");
const router = express.Router();

//***********************************************************************
//                              AUTH
//***********************************************************************
const controller = require("../controllers/auth.controller");
const authMiddleware = require ("../middleware/auth.middleware")

// Método GET: Para saber si el usuario está logeado correctamente (protección)
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Hi user ${req.userName}`);
});

// Método POST: Para registro de nuevo usuario
router.post('/register', controller.register);

// Método POST: Para login
router.post('/login', controller.login);

// Método PUT: Para modificar usuario ya cargado
router.put('/:id_user', controller.updateUser);

// Método DELETE: Para eliminar usuario
router.delete('/:id_user', controller.deleteUser);

// Exportar routers
module.exports = router;