const { Pool } = require('pg');

const pool = new Pool({
    user: 'ianboyle',
    password: '',
    host: 'localhost',
    port: '5432',
    database: 'portfolio'
});

module.exports = pool;