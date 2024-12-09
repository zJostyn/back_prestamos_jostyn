const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'jostyn001',
    database: 'PG_Prestamos_Jostyn',
    port: '5432'
});

async function getPrestamos(req, res) {
    const query = 'SELECT * FROM prestamos';
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

async function createPrestamo(req, res) {
    const { idprestamo, cedula, codigo, fechaprestamo, fechaentrega } = req.body;
    const query = 'INSERT INTO prestamos (idprestamo, cedula, codigo, fechaprestamo, fechaentrega) VALUES ($1, $2, $3, $4, $5)';
    const values = [idprestamo, cedula, codigo, fechaprestamo, fechaentrega];
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

async function devolverLibro(req, res) {
    const { cedula, codigo, fechadevuelto } = req.body;

    const query = `UPDATE prestamos SET fechadevuelto = $3 WHERE codigo = $1 AND cedula = $2 AND (fechadevuelto = '' OR fechadevuelto IS NULL)`;
    const values = [codigo, cedula, fechadevuelto];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se devolvió el libro' });
        } else {
            res.status(400).json({ message: 'No se pudo devolver el libro' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = { getPrestamos, createPrestamo, devolverLibro};