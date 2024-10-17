// CONFIGURACIÓN DEL SERVIDOR (con las mínimas prestaciones para ejecutar express)

const express = require("express"); //¿Para qué usamos express?
const app = express();

// En el cuerpo de la petición transformamos el json en ub objeto js
app.use(express.json()); 

// En la constante studentsRouter ponemos todo lo del módulo router
const studentsRouter = require('./routers/students.router');
app.use('/students', studentsRouter);
// Siempre que me refiera a los alumnos le coloco el prefijo

// En la constante courseRouter ponemos todo lo del módulo router
const courseRouter = require('./routers/courses.router');
app.use('/courses', courseRouter);
// Siempre que me refiera a los alumnos le coloco el prefijo

app.get("/",(req, res) => {
    res.send("Hi digital agenda");
});

//Ruta principal del proyecto
const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));