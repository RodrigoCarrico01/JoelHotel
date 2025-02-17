const Review = require("../../models/Review");

// **Listar todas as reviews (apenas admins)**
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("utilizador", "nome email").populate("quarto", "nome");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar reviews.", error });
    }
};
// **Obter uma review por ID (apenas admins)**
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate("utilizador", "nome email").populate("quarto", "nome");
        if (!review) {
            return res.status(404).json({ message: "Review não encontrada." });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter review.", error });
    }
};

// **Buscar reviews por quarto (apenas admins)**
const getReviewsByRoom = async (req, res) => {
    try {
        const reviews = await Review.find({ quarto: req.params.quartoId }).populate("utilizador", "nome email");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar reviews do quarto.", error });
    }
};

// **Buscar reviews por utilizador (apenas admins)**
const getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.find({ utilizador: req.params.userId }).populate("quarto", "nome");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar reviews do utilizador.", error });
    }
};

// **Apagar uma review (apenas admins)**
const deleteReviewAdmin = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review não encontrada." });
        }

        await review.deleteOne();
        res.json({ message: "Review eliminada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao eliminar review.", error });
    }
};

module.exports = { getAllReviews, getReviewsByRoom, getReviewsByUser, getReviewById, deleteReviewAdmin };
