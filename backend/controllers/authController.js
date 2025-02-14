const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//**Criar conta **
const registerUser = async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "O e-mail já está registado." });
        }

        const user = await User.create({ nome, email, password });

        res.status(201).json({
            _id: user._id,
            nome: user.nome,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao registar utilizador.", error });
    }
};
// **Entrar na conta**
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        res.json({
            _id: user._id,
            nome: user.nome,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao fazer login.", error });
    }
};

//**Gerar token**
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { registerUser, loginUser };
