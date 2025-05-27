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

  console.log('Tentativa de cadastro:', email);

  if (!email || !senha) return res.status(400).json({ erro: 'Email e senha obrigatórios' });

  const hash = bcrypt.hashSync(senha, 10);
  db.query('INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)', [email, hash], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ erro: 'Usuário já cadastrado' });
      }
      console.error('Erro ao inserir usuário:', err); 
      return res.status(500).json({ erro: 'Erro ao registrar' });
    }
    console.log('Usuário cadastrado:', email); 
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

    res.json({
  mensagem: 'Login bem-sucedido',
  token,
  usuario_id: usuario.id, 
});

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

// Adicionar cupom ao carrinho
app.post('/carrinho', (req, res) => {
  const { usuario_id, cupom_id } = req.body;

  if (!usuario_id || !cupom_id) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const sql = 'INSERT INTO carrinho (usuario_id, cupom_id) VALUES (?, ?)';

  db.query(sql, [usuario_id, cupom_id], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao adicionar ao carrinho' });
    res.status(201).json({ mensagem: 'Adicionado com sucesso' });
  });
});


// Listar cupons do carrinho por usuário
app.get('/carrinho/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT carrinho.id, cupons.titulo, cupons.descricao, cupons.validade
    FROM carrinho
    JOIN cupons ON cupons.id = carrinho.cupom_id
    WHERE carrinho.usuario_id = ?
  `;

  db.query(sql, [usuario_id], (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar carrinho' });
    res.json(resultados);
  });
});

//Deleta cupons do carrinho do usuário
app.delete('/carrinho/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM carrinho WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao remover do carrinho' });
    res.json({ mensagem: 'Removido com sucesso' });
  });
});

