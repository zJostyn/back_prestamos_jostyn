const { Router } = require('express');
const router = new Router();

var { getCategorias } = require('../controllers/categoria.controllers');

//Obtener las Categorias
router.get('', getCategorias);

module.exports = router;
