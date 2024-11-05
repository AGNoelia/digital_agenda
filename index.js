//*********************************************************************************************
//                              CONFIGURACIÓN DEL SERVIDOR
//*********************************************************************************************

// VARIABLES DE ENTORNO
require("dotenv").config();

const express = require("express");
const app = express();

// En el cuerpo de la petición transformamos el json en un objeto js
app.use(express.json()); 

const studentsRouter = require('./routers/students.router');
//Siempre que se refiera a los alumnos se colocará el prefijo /students
app.use('/students', studentsRouter);

const courseRouter = require('./routers/courses.router');
//Siempre que se refiera a los alumnos se colocará el prefijo /courses
app.use('/courses', courseRouter);

// Se agrega la ruta para realizar la autenticación
app.use("/auth", require("./routers/auth.router"));

app.get("/",(req, res) => {
    res.send("Hi digital agenda");
});

// RUTA PRINCIPAL DEL PROYECTO
// En PORT usara lo definido en el servidor o en su defecto el puerto 3001.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));