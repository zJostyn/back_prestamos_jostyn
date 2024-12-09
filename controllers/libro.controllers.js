const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'jostyn001',
    database: 'PG_Prestamos_Jostyn',
    port: '5432'
});

async function getLibrosRevistas(req, res) {
    const query = 'SELECT LI.*, CAT.descripcion AS categoria FROM libro LI, categoria CAT WHERE LI.idcategoria = CAT.idcategoria';
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

async function getLibros(req, res) {
    const query = `SELECT LI.*, CAT.descripcion AS categoria FROM libro LI, categoria CAT WHERE LI.idcategoria = CAT.idcategoria AND tipo = 'Libro'`;
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

async function getRevistas(req, res) {
    const query = `SELECT LI.*, CAT.descripcion AS categoria FROM libro LI, categoria CAT WHERE LI.idcategoria = CAT.idcategoria AND tipo = 'Revista'`;
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

async function createLibroRevista(req, res) {
    const { codigo, tipo, idcategoria, editorial, nombre, autor, aniopublicacion, estado } = req.body;
    const query = 'INSERT INTO libro (codigo, tipo, idcategoria, editorial, nombre, autor, aniopublicacion, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [codigo, tipo, idcategoria, editorial, nombre, autor, aniopublicacion, estado];
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

async function updateLibroRevista(req, res) {
    const { codigo, tipo, idcategoria, editorial, nombre, autor, aniopublicacion } = req.body;
    const query = 'UPDATE libro SET tipo=$2, idcategoria=$3, editorial=$4, nombre=$5, autor=$6, aniopublicacion=$7 WHERE codigo = $1';
    const values = [codigo, tipo, idcategoria, editorial, nombre, autor, aniopublicacion];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se modifico el libro' });
        } else {
            res.status(400).json({ message: 'No se modifico el libro' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });

    }
}

async function deleteLibroRevista(req, res) {
    const { codigo } = req.body;
    const query = 'DELETE FROM libro WHERE codigo = $1';
    const values = [codigo];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se elimino el libro' });
        } else {
            res.status(400).json({ message: 'No se elimino el libro' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });

    }
}

async function estadoLibroRevista(req, res) {
    const { codigo, estado} = req.body;
    const query = 'UPDATE libro SET estado = $2 WHERE codigo = $1';
    const values = [codigo, estado];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se modifico el estado del libro' });
        } else {
            res.status(400).json({ message: 'No se modifico el estado del libro' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });

    }
}

module.exports = { getLibrosRevistas, getLibros, getRevistas, createLibroRevista, updateLibroRevista, deleteLibroRevista, estadoLibroRevista};