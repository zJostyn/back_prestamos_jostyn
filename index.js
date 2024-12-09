const express = require('express');
const cors = require('cors')
const app = express();

var categoria_routes = require('./routes/categoria.routes');
var estudiante_routes = require('./routes/estudiante.routes');
var libro_routes = require('./routes/libro.routes');
var prestamo_routes = require('./routes/prestamo.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/categorias', categoria_routes);
app.use('/estudiantes', estudiante_routes);
app.use('/libros', libro_routes);
app.use('/prestamos', prestamo_routes);

app.listen('3000');
console.log('LocalHost Server Port: 3000');