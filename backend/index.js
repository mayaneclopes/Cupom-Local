const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./cupons.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    db.run(`
      CREATE TABLE IF NOT EXISTS cupons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        desconto REAL NOT NULL,
        estabelecimento TEXT NOT NULL
      )
    `);
  }
});

// Rotas
app.get('/cupons', (req, res) => {
  db.all('SELECT * FROM cupons', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/cupons', (req, res) => {
  const { nome, desconto, estabelecimento } = req.body;
  db.run(
    'INSERT INTO cupons (nome, desconto, estabelecimento) VALUES (?, ?, ?)',
    [nome, desconto, estabelecimento],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});