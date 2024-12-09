const { Pool } = require('pg');

const pool = new Pool({
    host: 'dpg-ctb5p4q3esus739eqtt0-a.ohio-postgres.render.com',
    user: 'prestamos_jostyn',
    password: 'RPaKREWkgrLVSXXx5trvvY8thR6Gn383',
    database: 'prestamos_jostyn',
    port: '5432',
    ssl: {
        rejectUnauthorized: false
    }
});

//Obtener todas las ubicaciones
async function getCategorias(req, res) {
    const query = 'SELECT * FROM categoria';
    try {
        const result = await pool.query(query);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ message: 'No se encontraron los datos!' });
        }
    } catch (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ error: 'Error en el servidor!', details: err.message });
    }
}


module.exports = { getCategorias };