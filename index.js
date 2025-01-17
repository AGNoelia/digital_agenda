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
app.use('/students', studentsRouter);

const courseRouter = require('./routers/courses.router');
app.use('/courses', courseRouter);

// Se agrega la ruta para realizar la autenticación
app.use("/auth", require("./routers/auth.router"));

const userRouter = require('./routers/users.router');
app.use('/users', userRouter);

const localityRouter = require('./routers/localities.router');
app.use('/localities', localityRouter);

const schoolRouter = require('./routers/schools.router');
app.use('/schools', schoolRouter);

const taskRouter = require('./routers/tasks.router');
app.use('/tasks', taskRouter);

app.get("/",(req, res) => {
    res.send("Hi digital agenda");
});

// RUTA PRINCIPAL DEL PROYECTO
// En PORT usara lo definido en el servidor o en su defecto el puerto 3001.
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));