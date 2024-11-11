// Controladores del módulo
const db = require("../db/db");

// Método GET: Para todas las tareas
const allTasks = (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        res.json(rows);
    });
};

// Método GET: Para una tarea
const aTask = (req, res) => {
    const {id_task} = req.params;
    const sql = "SELECT * FROM tasks WHERE id_task = ?";
    db.query(sql,[id_task], (error, rows) => { 
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Try later"})
        }
        if(rows.length == 0){
            return res.status(404).send({error: "ERROR: Doesn't exist the task"})
        };
        res.json(rows[0]);
        //Mostramos el elemento en la posición cero si existe.
    });
};

// Método POST
const loadTasks = (req, res) => {
    const {task_title, task_description, complete} = req.body;
    const sql = "INSERT INTO tasks (task_title, task_description, complete) VALUES (?, ?, ?)"
    db.query(sql,[task_title, task_description, complete], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        const task = {...req.body, id: result.insertId}; // Reconstruimos el objeto del body
        res.status(201).json(task);
    });
};

// Método PUT
const updateTask = (req, res) => {
    const {id_task} = req.params;
    const {task_title, task_description, complete} = req.body;
    const sql = "UPDATE tasks SET task_title = ?, task_description = ?, complete = ? WHERE id_task = ?"
    db.query(sql,[task_title, task_description, complete, id_task], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The task to update doesn't exist."})
        }
        const task = {...req.body, ...req.params}; // Reconstruimos el objeto del body
        res.json(task);
    });
};

// Método DELETE
const deleteTask = (req, res) => {
    const {id_task} = req.params;
    const sql = "DELETE FROM task WHERE id_task = ?"
    db.query(sql,[id_task], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Try later."})
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: The task to delete doesn't exist."})
        }
        res.json({mensaje: "Task deleted"});
    });
};

// Exportar del módulo todas las funciones
module.exports = {
    allTasks,
    aTask,
    loadTasks,
    updateTask,
    deleteTask,
};