const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'sql.wsfdb.cn',
    user: '335587cheems',
    password: '123456',
    database: '335587cheems'
});

db.connect((err) => {
    if (err) throw err;
    console.log('连接数据库成功');
});

app.post('/api/scores', (req, res) => {
    const { username, score } = req.body;
    const query = 'INSERT INTO scores (username, score) VALUES (?, ?)';
    db.query(query, [username, score], (err, result) => {
        if (err) throw err;
        res.json({ status: 'success', result });
    });
});

app.get('/api/scores', (req, res) => {
    const query = 'SELECT username, score FROM scores ORDER BY score DESC LIMIT 10';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => console.log('服务器在端口3000上运行'));
