const mysql = require('mysql2');
const dbConfigured = true; // Cambia a true cuando tengas la base de datos configurada

if (dbConfigured) {
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'foro_db'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database');
  });
} else {
  console.log("Base de datos no configurada. Conexión omitida.");
}