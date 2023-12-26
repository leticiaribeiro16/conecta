const express = require('express');
// const authMiddleware = require('../middlewares/authMiddleware');
const projetoController = require('../controllers/projetoController');

const router = express.Router();

// router.use(authMiddleware);

router.get('/', projetoController.listarProjetos);
router.post('/', projetoController.criarProjeto);
router.get('/:id', projetoController.obterProjeto);
router.put('/:id', projetoController.atualizarProjeto);
router.delete('/:id', projetoController.excluirProjeto);

module.exports = router;
