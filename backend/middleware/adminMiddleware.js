const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Não autorizado, sem utilizador autenticado." });
        }

        const user = await User.findById(req.user._id);

        if (user && user.role === "admin") {
            next(); // Permite continuar para a rota seguinte
        } else {
            res.status(403).json({ message: "Acesso negado, precisa de privilégios de administrador." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao verificar permissões de administrador.", error });
    }
};

module.exports = adminMiddleware;
