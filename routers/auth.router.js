//Rutas del módulo
const express = require("express");
const router = express.Router();

// MULTER
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads'); //Esta carpeta debe existir en el proyecto
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); // Segundos desde 1970
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes = /jpg|jpeg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimetype && path.extname) {
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1}, // aprox 1Mb
});


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
//router.post('/register', controller.register);
router.post('/register', upload.single('imagen'), controller.register);

// Método POST: Para login
router.post('/login', controller.login);

// Método PUT: Para modificar usuario ya cargado
router.put('/:id_user', controller.updateUser);

// Método DELETE: Para eliminar usuario
router.delete('/:id_user', controller.deleteUser);

// Exportar routers
module.exports = router;