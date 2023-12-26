const Projeto = require('../models/projetoModel');

async function listarProjetos(req, res) {
  try {
    const projetos = await Projeto.findAll();
    res.json(projetos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar projetos' });
  }
}

async function criarProjeto(req, res) {
  try {
    console.log('Recebendo solicitação para criar projeto');
    const { nome, sobre, tipoProjeto, premiacoes, disponivel } = req.body;
    console.log('Dados recebidos:', { nome, sobre, tipoProjeto, premiacoes, disponivel });

    const novoProjeto = await Projeto.create({
      nome,
      sobre,
      tipoProjeto,
      premiacoes,
      disponivel,
    });

    console.log('Novo projeto criado:', novoProjeto);

    res.status(201).json(novoProjeto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o projeto' });
  }
}

async function obterProjeto(req, res) {
  try {
    const { id } = req.params;
    const projeto = await Projeto.findByPk(id);

    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.json(projeto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o projeto' });
  }
}

async function atualizarProjeto(req, res) {
  try {
    const { id } = req.params;
    const { nome, sobre, tipoProjeto, premiacoes, disponivel } = req.body;

    const projeto = await Projeto.findByPk(id);

    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    projeto.nome = nome;
    projeto.sobre = sobre;
    projeto.tipoProjeto = tipoProjeto;
    projeto.premiacoes = premiacoes;
    projeto.disponivel = disponivel;

    await projeto.save();

    res.json(projeto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o projeto' });
  }
}

async function excluirProjeto(req, res) {
  try {
    const { id } = req.params;
    const projeto = await Projeto.findByPk(id);

    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    await projeto.destroy();

    res.json({ message: 'Projeto excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o projeto' });
  }
}

module.exports = {
  listarProjetos,
  criarProjeto,
  obterProjeto,
  atualizarProjeto,
  excluirProjeto,
};
