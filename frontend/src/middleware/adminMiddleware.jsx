const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Verificar se o usuário é admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acesso negado. Somente administradores podem acessar." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = adminMiddleware;
