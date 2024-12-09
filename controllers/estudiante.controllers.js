const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'jostyn001',
    database: 'PG_Prestamos_Jostyn',
    port: '5432'
});

async function getEstudiantes(req, res) {
    const query = 'SELECT * FROM estudiante';
    try {
        const client = await pool.connect();
        const result = await client.query(query);
        client.release();
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(400).json({ message: 'No se encontraron los datos!' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

async function getEstudiante(req, res) {
    const { cedula, sancionado } = req.body;
    const query = 'SELECT * FROM estudiante WHERE cedula = $1 AND sancionado = $2';
    const values = [cedula, sancionado];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(400).json({ message: 'No se encontraron los datos!' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

async function createEstudiante(req, res) {
    const { cedula, nombre, apellido, sexo, fechanacimiento, sancionado } = req.body;
    const query = 'INSERT INTO estudiante (cedula, nombre, apellido, sexo, fechanacimiento, sancionado) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [cedula, nombre, apellido, sexo, fechanacimiento, sancionado ];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se creo el dato correctamente!' })
        } else {
            res.status(400).json({ message: 'No se pudo guardar el dato!' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

async function updateEstudiante(req, res) {
    const { cedula, nombre, apellido, sexo, fechanacimiento } = req.body;
    const query = 'UPDATE estudiante SET nombre = $2, apellido=$3, sexo=$4, fechanacimiento=$5 WHERE cedula = $1';
    const values = [cedula, nombre, apellido, sexo, fechanacimiento];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se modifico el estudiante' });
        } else {
            res.status(400).json({ message: 'No se modifico el estudiante' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });

    }
}

async function deleteEstudiante(req, res) {
    const { cedula } = req.body;
    const query = 'DELETE FROM estudiante WHERE cedula = $1';
    const values = [cedula];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se elimino el estudiante' });
        } else {
            res.status(400).json({ message: 'No se elimino el estudiante' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });

    }
}

async function sancionarEstudiante(req, res) {
    const { cedula, sancionado} = req.body;
    const query = 'UPDATE estudiante SET sancionado = $2 WHERE cedula = $1';
    const values = [cedula, sancionado];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se modifico el estudiante' });
        } else {
            res.status(400).json({ message: 'No se modifico el estudiante' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });

    }
}

module.exports = { getEstudiantes, getEstudiante, createEstudiante, updateEstudiante, deleteEstudiante, sancionarEstudiante}