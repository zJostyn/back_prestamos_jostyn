const { Router } = require('express');
const router = new Router();

var { getPrestamos, createPrestamo, devolverLibro } = require('../controllers/prestamo.controllers');

router.get('', getPrestamos);
router.post('/create', createPrestamo);
router.put('/return', devolverLibro);

module.exports = router;
