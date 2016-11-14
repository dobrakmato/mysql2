
import * as mysql from 'mysql2/promise';

// Connections
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret'
});

connection.connect()
    .then(() => connection.query('SELECT 1 + 1 AS solution'))
    .then(([rows, fields]) => {
        console.log('The solution is: ', (<mysql.RowDataPacket[]>rows)[0]['solution']);
    });

connection.connect()
    .then(() => connection.execute('SELECT 1 + 1 AS solution'))
    .then(([rows, fields]) => {
        console.log('The solution is: ', (<mysql.RowDataPacket[]>rows)[0]['solution']);
    });

/// Pools

let poolConfig = {
    connectionLimit: 10,
    host: 'example.org',
    user: 'bob',
    password: 'secret'
};

let pool = mysql.createPool(poolConfig);

pool.query('SELECT 1 + 1 AS solution')
    .then(([rows, fields]) => {
        console.log('The solution is: ', (<mysql.RowDataPacket[]>rows)[0]['solution']);
    });

pool.execute('SELECT 1 + 1 AS solution')
    .then(([rows, fields]) => {
        console.log('The solution is: ', (<mysql.RowDataPacket[]>rows)[0]['solution']);
    });

async function test() {
    const connection = await pool.getConnection();
    // Use the connection
    const rows = await connection.query('SELECT something FROM sometable');
    // And done with the connection.
    connection.release();
}
