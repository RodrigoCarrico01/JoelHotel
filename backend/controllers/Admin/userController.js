const User = require("../../models/User");

// **Obter todos os utilizadores (apenas admins)**
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Não retorna as palavras-passe
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar utilizadores.", error });
    }
};

// **Obter um utilizador por ID (apenas admins)**
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar utilizador.", error });
    }
};

// **Eliminar um utilizador (apenas admins)**
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado." });
        }

        await user.deleteOne();
        res.json({ message: "Utilizador eliminado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao eliminar utilizador.", error });
    }
};

module.exports = { getAllUsers, getUserById, deleteUserById };
