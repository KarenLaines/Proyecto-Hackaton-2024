const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Rutas
app.get('/api/preguntas', (req, res) => {
  // Aquí debes devolver la lista de preguntas desde tu base de datos
});

app.post('/api/preguntas', (req, res) => {
  // Aquí debes agregar una nueva pregunta a tu base de datos
});

app.get('/api/preguntas/:id/respuestas', (req, res) => {
  // Aquí debes devolver las respuestas de una pregunta específica
});

app.post('/api/preguntas/:id/respuestas', (req, res) => {
  // Aquí debes agregar una nueva respuesta a una pregunta específica
});

app.post('/api/apuntes', upload.single('apunte'), (req, res) => {
  res.send('Archivo subido exitosamente');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
