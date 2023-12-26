const express = require('express');
// const authMiddleware = require('../middlewares/authMiddleware');
const processoSeletivoController = require('../controllers/processoSeletivoController');

const router = express.Router();

// router.use(authMiddleware);

router.get('/', processoSeletivoController.listarProcessosSeletivos);
router.post('/', processoSeletivoController.criarProcessoSeletivo);
router.get('/:id', processoSeletivoController.obterProcessoSeletivo);
router.put('/:id', processoSeletivoController.atualizarProcessoSeletivo);
router.delete('/:id', processoSeletivoController.excluirProcessoSeletivo);

module.exports = router;
