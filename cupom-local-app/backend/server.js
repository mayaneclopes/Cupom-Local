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
  const {
    email, senha, nome, cpf_cnpj,
    logradouro, numero, bairro, cidade,
    estado, cep, pais
  } = req.body;

  if (!email || !senha || !nome || !cpf_cnpj) {
    return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });
  }

  const hash = bcrypt.hashSync(senha, 10);

const sql = `
  INSERT INTO usuarios 
  (email, senha_hash, nome, cpf_cnpj, logradouro, numero, bairro, cidade, estado, cep, pais)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

  const values = [email, hash, nome, cpf_cnpj, logradouro, numero, bairro, cidade, estado, cep, pais];
  console.log('Valores sendo inseridos:', values);
  db.query(sql, values, (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ erro: 'Usuário já cadastrado' });
      }
      console.error('Erro ao registrar:', err);
      return res.status(500).json({ erro: 'Erro ao registrar' });
    }

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
  token,
  usuario: {  
    id: usuario.id,
    email: usuario.email,
    nome: usuario.nome,
    cpf: usuario.cpf,
    logradouro: usuario.logradouro,
    numero: usuario.numero,
    bairro: usuario.bairro,
    cidade: usuario.cidade,
    estado: usuario.estado,
    cep: usuario.cep,
    pais: usuario.pais,
  }
});
})});

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
  const { pagina = 1, limite = 10 } = req.query; // Valores padrão
  const offset = (pagina - 1) * limite;

  const sql = `
    SELECT carrinho.id, cupons.titulo, cupons.valor
    FROM carrinho
    JOIN cupons ON cupons.id = carrinho.cupom_id
    WHERE carrinho.usuario_id = ?
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [usuario_id, limite, offset], (err, resultados) => {
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

