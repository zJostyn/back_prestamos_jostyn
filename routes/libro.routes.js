const { Router } = require('express');
const router = new Router();

var { getLibrosRevistas, getLibros, getRevistas, createLibroRevista, updateLibroRevista, deleteLibroRevista, estadoLibroRevista } = require('../controllers/libro.controllers');


router.get('', getLibrosRevistas);
router.get('/libros', getLibros);
router.get('/revistas', getRevistas);
router.post('/create', createLibroRevista);
router.put('/update', updateLibroRevista);
router.delete('/delete', deleteLibroRevista);
router.put('/state', estadoLibroRevista);

module.exports = router;
