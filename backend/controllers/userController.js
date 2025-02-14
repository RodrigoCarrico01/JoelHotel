const User = require("../models/User");

// **Obter os dados do utilizador autenticado**
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter perfil", error });
    }
};

// **Atualizar o perfil do utilizador**
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }

        user.nome = req.body.nome || user.nome;
        user.email = req.body.email || user.email;
        user.profilePic = req.body.profilePic || user.profilePic;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            nome: updatedUser.nome,
            email: updatedUser.email,
            role: updatedUser.role,
            profilePic: updatedUser.profilePic,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar perfil", error });
    }
};

// **Eliminar a conta do utilizador**
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }

        await user.deleteOne();
        res.json({ message: "Conta eliminada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao eliminar utilizador", error });
    }
};

module.exports = { getUserProfile, updateUserProfile, deleteUser };
