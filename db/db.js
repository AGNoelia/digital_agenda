const mysql = require("mysql2");

// CONEXIÓN A LA BASE DE DATOS
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "digital_agenda",
    port: 3307
});

connection.connect((error) => {
    if(error){
        return console.error(error);
    }
    console.log("Estamos conectados a la base de datos digital_agenda")
});

// Exportamos del modulo la función connection
module.exports = connection;