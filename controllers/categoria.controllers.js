const { Pool } = require('pg');

const pool = new Pool({
    host: 'dpg-ctb5p4q3esus739eqtt0-a.ohio-postgres.render.com',
    user: 'prestamos_jostyn',
    password: 'RPaKREWkgrLVSXXx5trvvY8thR6Gn383',
    database: 'prestamos_jostyn',
    port: '5432'
});

//Obtener todas las ubicaciones
async function getCategorias(req, res) {
    const query = 'SELECT * FROM categoria';
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

module.exports = { getCategorias };