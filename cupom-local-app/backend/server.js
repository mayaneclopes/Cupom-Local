// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rota de cadastro
app.post('/auth/register', (req, res) => {
  const { email, senha } = req.body;

  console.log('Tentativa de cadastro:', email); // 👈 ADICIONE ISSO

  if (!email || !senha) return res.status(400).json({ erro: 'Email e senha obrigatórios' });

  const hash = bcrypt.hashSync(senha, 10);
  db.query('INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)', [email, hash], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ erro: 'Usuário já cadastrado' });
      }
      console.error('Erro ao inserir usuário:', err); // 👈 ADICIONE ISSO
      return res.status(500).json({ erro: 'Erro ao registrar' });
    }
    console.log('Usuário cadastrado:', email); // 👈 ADICIONE ISSO
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  });
});


// Rota de login
app.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: 'Email e senha obrigatórios' });

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar usuário' });

    const usuario = resultados[0];
    if (!usuario || !bcrypt.compareSync(senha, usuario.senha_hash)) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({ mensagem: 'Login bem-sucedido', token });
  });
});

// Rota para listar cupons
app.get('/cupons', (req, res) => {
  db.query('SELECT * FROM cupons ORDER BY validade ASC', (err, resultados) => {
    if (err) {
      console.error('Erro ao buscar cupons:', err);
      return res.status(500).json({ erro: 'Erro ao buscar cupons' });
    }
    res.json(resultados);
  });
});


// Inicializa servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
