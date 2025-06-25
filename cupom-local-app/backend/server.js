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
  const sql = 'SELECT id, titulo, descricao, validade, valor, imagem_url FROM cupons ORDER BY validade ASC';
  db.query(sql, (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar cupons' });
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

// Atualizar imagem de um cupom
app.put('/cupons/:id/imagem', (req, res) => {
  const { id } = req.params;
  const { imagem_url } = req.body;
  if (!imagem_url) {
    return res.status(400).json({ erro: 'imagem_url é obrigatório' });
  }
  db.query(
    'UPDATE cupons SET imagem_url = ? WHERE id = ?',
    [imagem_url, id],
    (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar imagem' });
      res.json({ mensagem: 'Imagem atualizada com sucesso' });
    }
  );
});

// GET usuários por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM usuarios WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ erro: 'Erro interno' });
    }
    if (result.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(result[0]);
  });
});

// Rota para deletar usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao excluir conta' });
    }
    res.json({ mensagem: 'Conta excluída com sucesso' });
  });
});

// Rota para alterar senha
app.put('/usuarios/alterar-senha/:id', (req, res) => {
  const { id } = req.params;
  const { senha_atual, nova_senha } = req.body;

  // --- Verificar senha atual
  db.query('SELECT senha_hash FROM usuarios WHERE id = ?', [id], (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar senha' });
    
    const usuario = resultados[0];
    if (!bcrypt.compareSync(senha_atual, usuario.senha_hash)) {
      return res.status(401).json({ erro: 'Senha atual incorreta' });
    }

    // --- Atualizar para nova senha
    const novaHash = bcrypt.hashSync(nova_senha, 10);
    db.query('UPDATE usuarios SET senha_hash = ? WHERE id = ?', [novaHash, id], (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar senha' });
      res.json({ mensagem: 'Senha alterada com sucesso' });
    });
  });
});

//POST - ADD FAVORITOS 
app.post('/favoritos', (req, res) => {
  const { usuario_id, cupom_id } = req.body;

  const verificarSQL = 'SELECT * FROM favoritos WHERE usuario_id = ? AND cupom_id = ?';
  db.query(verificarSQL, [usuario_id, cupom_id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar favoritos' });

    if (results.length > 0) {
      return res.status(409).json({ mensagem: 'Cupom já está nos favoritos' });
    }

    const inserirSQL = 'INSERT INTO favoritos (usuario_id, cupom_id) VALUES (?, ?)';
    db.query(inserirSQL, [usuario_id, cupom_id], (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao adicionar aos favoritos' });
      res.status(201).json({ mensagem: 'Adicionado aos favoritos' });
    });
  });
});


//GET - LISTAR FAVORITOS
app.get('/favoritos/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const query = `
    SELECT c.*
    FROM favoritos f
    JOIN cupons c ON f.cupom_id = c.id
    WHERE f.usuario_id = ?
  `;

  db.query(query, [usuario_id], (err, resultados) => {
    if (err) {
      console.error('Erro ao buscar favoritos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar favoritos' });
    }

    res.json(resultados);
  });
});

//DELETE - REMOVER DOS FAVORITOS
app.delete('/favoritos/:usuario_id/:cupom_id', (req, res) => {
  const { usuario_id, cupom_id } = req.params;

  const sql = 'DELETE FROM favoritos WHERE usuario_id = ? AND cupom_id = ?';
  db.query(sql, [usuario_id, cupom_id], (err, result) => {
    if (err) {
      console.error('Erro ao remover favorito:', err);
      return res.status(500).json({ erro: 'Erro ao remover favorito' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Favorito não encontrado' });
    }
    res.json({ mensagem: 'Favorito removido com sucesso' });
  });
});

// GET Buscar vouchers do usuário / status
app.get('/vouchers/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  const { status } = req.query; // Novo parâmetro opcional

  let sql = `
    SELECT v.*, c.titulo, c.descricao, c.valor, c.imagem_url
    FROM vouchers v
    JOIN cupons c ON v.cupom_id = c.id
    WHERE v.usuario_id = ?
  `;

  const params = [usuario_id];

  if (status) {
    sql += ' AND v.status = ?';
    params.push(status);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Erro ao buscar vouchers:', err);
      return res.status(500).json({ erro: 'Erro interno' });
    }
    res.json(results);
  });
});

// GET- busca cupons por cat
app.get('/cupons/categoria/:id', (req, res) => {
  const categoriaId = req.params.id;

  const sql = `
    SELECT c.* 
    FROM cupons c
    JOIN categorias cat ON c.categoria = cat.nome
    WHERE cat.id = ?
  `;

  db.query(sql, [categoriaId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar cupons por categoria:', err);
      return res.status(500).json({ erro: 'Erro ao buscar cupons por categoria' });
    }
    res.json(results);
  });
});;

//POST -- AVALIAÇÕES
app.post('/avaliacoes', (req, res) => {
  const { usuario_id, cupom_id, nota, comentario } = req.body;

  if (!usuario_id || !cupom_id || !nota || !comentario) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const sql = `
    INSERT INTO avaliacoes (usuario_id, cupom_id, nota, comentario)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [usuario_id, cupom_id, nota, comentario], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ erro: 'Avaliação já enviada' });
      }
      return res.status(500).json({ erro: 'Erro ao salvar avaliação' });
    }

    res.status(201).json({ mensagem: 'Avaliação salva com sucesso' });
  });
});

// GET - Avaliações por usuário
app.get('/avaliacoes', (req, res) => {
  const { usuario_id } = req.query;
  if (!usuario_id) return res.status(400).json({ erro: 'usuario_id é obrigatório' });

  const sql = 'SELECT * FROM avaliacoes WHERE usuario_id = ?';
  db.query(sql, [usuario_id], (err, resultados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar avaliações' });
    res.json(resultados);
  });
});