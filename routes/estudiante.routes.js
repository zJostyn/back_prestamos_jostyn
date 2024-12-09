const { Router } = require('express');
const router = new Router();

var { getEstudiantes, getEstudiante, createEstudiante, updateEstudiante, deleteEstudiante, sancionarEstudiante } = require('../controllers/estudiante.controllers');

//Estudiantes
router.get('', getEstudiantes);
router.post('/get', getEstudiante);
router.post('/create', createEstudiante);
router.put('/update', updateEstudiante);
router.delete('/delete', deleteEstudiante);
router.put('/sanction', sancionarEstudiante);

module.exports = router;
