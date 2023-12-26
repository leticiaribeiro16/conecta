const ProcessoSeletivo = require('../models/processoSeletivoModel');

async function listarProcessosSeletivos(req, res) {
  try {
    const processosSeletivos = await ProcessoSeletivo.findAll();
    res.json(processosSeletivos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar processos seletivos' });
  }
}

async function criarProcessoSeletivo(req, res) {
  try {
    const { tipoProcesso, pontuacao, requisitos, aprovado } = req.body;
    const { projeto_id } = req.body;

    const novoProcessoSeletivo = await ProcessoSeletivo.create({
      tipoProcesso,
      pontuacao,
      requisitos,
      aprovado,
      projeto_id,
    });

    res.status(201).json(novoProcessoSeletivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar processo seletivo' });
  }
}

async function obterProcessoSeletivo(req, res) {
  try {
    const { id, projeto_id } = req.params;
    const processoSeletivo = await ProcessoSeletivo.findOne({
      where: { id, projeto_id },
    });

    if (!processoSeletivo) {
      return res.status(404).json({ error: 'Processo seletivo não encontrado' });
    }

    res.json(processoSeletivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter processo seletivo' });
  }
}

async function atualizarProcessoSeletivo(req, res) {
  try {
    const { id, projeto_id } = req.params;
    const { tipoProcesso, pontuacao, requisitos, aprovado } = req.body;

    const processoSeletivo = await ProcessoSeletivo.findOne({
      where: { id, projeto_id },
    });

    if (!processoSeletivo) {
      return res.status(404).json({ error: 'Processo seletivo não encontrado' });
    }

    processoSeletivo.tipoProcesso = tipoProcesso;
    processoSeletivo.pontuacao = pontuacao;
    processoSeletivo.requisitos = requisitos;
    processoSeletivo.aprovado = aprovado;

    await processoSeletivo.save();

    res.json(processoSeletivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar processo seletivo' });
  }
}

async function excluirProcessoSeletivo(req, res) {
  try {
    const { id, projeto_id } = req.params;
    const processoSeletivo = await ProcessoSeletivo.findOne({
      where: { id, projeto_id },
    });

    if (!processoSeletivo) {
      return res.status(404).json({ error: 'Processo seletivo não encontrado' });
    }

    await processoSeletivo.destroy();

    res.json({ message: 'Processo seletivo excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir processo seletivo' });
  }
}

module.exports = {
  listarProcessosSeletivos,
  criarProcessoSeletivo,
  obterProcessoSeletivo,
  atualizarProcessoSeletivo,
  excluirProcessoSeletivo,
};
