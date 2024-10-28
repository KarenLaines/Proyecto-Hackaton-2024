// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configurar Multer para la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Endpoint para obtener todas las preguntas
app.get('/preguntas', (req, res) => {
    db.query('SELECT * FROM preguntas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Endpoint para agregar una pregunta
app.post('/preguntas', (req, res) => {
    const { titulo, contenido } = req.body;
    db.query('INSERT INTO preguntas (titulo, contenido) VALUES (?, ?)', [titulo, contenido], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Pregunta añadida con éxito' });
    });
});

// Endpoint para obtener respuestas de una pregunta específica
app.get('/preguntas/:id/respuestas', (req, res) => {
    const preguntaId = req.params.id;
    db.query('SELECT * FROM respuestas WHERE pregunta_id = ?', [preguntaId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Endpoint para agregar una respuesta a una pregunta
app.post('/preguntas/:id/respuestas', (req, res) => {
    const preguntaId = req.params.id;
    const { contenido } = req.body;
    db.query('INSERT INTO respuestas (pregunta_id, contenido) VALUES (?, ?)', [preguntaId, contenido], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Respuesta añadida con éxito' });
    });
});

// Endpoint para subir una nota de estudiante
app.post('/notas', upload.single('archivo'), (req, res) => {
    const { estudiante_nombre } = req.body;
    const archivo = req.file.filename;

    db.query('INSERT INTO notas (estudiante_nombre, archivo) VALUES (?, ?)', [estudiante_nombre, archivo], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Nota subida con éxito', archivo });
    });
});

// Endpoint para obtener todas las notas
app.get('/notas', (req, res) => {
    db.query('SELECT * FROM notas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
