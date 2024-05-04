const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.listen(3000, () => console.log('Server running on port 3000'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'forms'
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
})

app.use(bodyParser())
app.post('/people', (req, res) => {
    
})