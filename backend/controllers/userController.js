const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado." });
        }

        // Verificar se a palavra-passe foi fornecida
        if (!req.body.currentPassword) {
            return res.status(400).json({ message: "A palavra-passe atual é obrigatória para atualizar o perfil." });
        }

        // Comparar a palavra-passe inserida com a armazenada
        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Palavra-passe incorreta." });
        }

        // Atualizar apenas os campos fornecidos
        if (req.body.nome) user.nome = req.body.nome;
        if (req.body.email) user.email = req.body.email;
        if (req.body.profilePic) user.profilePic = req.body.profilePic;

        // Se o utilizador quiser alterar a palavra-passe, garantir que é encriptada
        if (req.body.newPassword) {
            if (req.body.newPassword.length < 6) {
                return res.status(400).json({ message: "A nova palavra-passe deve ter pelo menos 6 caracteres." });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.newPassword, salt);
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
        res.status(500).json({ message: "Erro ao atualizar perfil.", error });
    }
};
// **Eliminar a conta do utilizador**
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado." });
        }

        // Verificar se a palavra-passe foi fornecida
        if (!req.body.password) {
            return res.status(400).json({ message: "A palavra-passe é obrigatória para eliminar a conta." });
        }

        // Comparar a palavra-passe inserida com a armazenada
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Palavra-passe incorreta." });
        }

        // Eliminar o utilizador
        await user.deleteOne();
        res.json({ message: "Conta eliminada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao eliminar conta.", error });
    }
};


module.exports = { getUserProfile, updateUserProfile, deleteUser };
