//Rutas del módulo
const express = require("express");
const router = express.Router();

//***********************************************************************
//                              AUTH
//***********************************************************************
const controller = require("../controllers/auth.controller");
const authMiddleware = require ("../middleware/auth.middleware")

// Método POST: Para registro
router.post('/register', controller.register);

// Método POST: Para login
router.post('/login', controller.login);

// Método PUT: Para modificar xxxx
//router.put('/:id_course', controller.updateCourse);

// Método DELETE: Para eliminar xxxx
//router.delete('/:id_course', controller.deleteCourse);

// Método GET: Para saber si el usuario está logeado correctamente
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Hi user ${req.userId}`);
});

// Exportar routers
module.exports = router;