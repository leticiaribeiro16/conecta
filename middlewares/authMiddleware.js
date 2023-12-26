const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  console.log('Middleware de autenticação chamado');

  const token = req.headers.authorization;

  if (!token) {
    console.log('Token não fornecido');
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'seuSegredo', (err, decoded) => {
    if (err) {
        console.error('Erro na verificação do token:', err);
        return res.status(401).json({ error: 'Token inválido' });
    }

    req.userId = decoded.id;

    console.log('Usuário autenticado:', decoded);
    console.log('ID do usuário:', req.userId);

    next();
  });
}

module.exports = authMiddleware;
