const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

// Função para criar um novo usuário
async function registrar(req, res) {
  try {
    const { nome, email, matricula, senha, tipo } = req.body;

    // Hash da senha antes de salvar no banco de dados
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      matricula,
      senha: senhaHash,
      tipo,
    });

    res.status(201).json({ id: novoUsuario.id, email: novoUsuario.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
}

// Função para fazer login e gerar token JWT
async function login(req, res) {
  try {
    const { matricula, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: { matricula },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, 'seuSegredo', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

module.exports = { registrar, login };
