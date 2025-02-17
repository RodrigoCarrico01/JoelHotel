const mongoose = require("mongoose");
const Review = require("../models/Review");
const Room = require("../models/Room");

// **Criar uma nova review**
const createReview = async (req, res) => {
    try {
        const { quarto, classificacao, comentario } = req.body;

        // Verificar se o quarto existe
        const existingRoom = await Room.findById(quarto);
        if (!existingRoom) {
            return res.status(404).json({ message: "Quarto não encontrado." });
        }

        // Verificar se o utilizador já fez uma reserva neste quarto
        const existingReview = await Review.findOne({ utilizador: req.user._id, quarto });
        if (existingReview) {
            return res.status(400).json({ message: "Já avaliou este quarto." });
        }

        // Criar a review
        const review = new Review({
            utilizador: req.user._id,
            quarto,
            classificacao,
            comentario,
        });

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar review.", error });
    }
};

// **Obter todas as reviews de um quarto**
const getReviewsByRoom = async (req, res) => {
    try {
        const reviews = await Review.find({ quarto: req.params.quartoId }).populate("utilizador", "nome profilePic");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar reviews.", error });
    }
};
// **Atualizar uma review**
const updateReview = async (req, res) => {
    try {
        const { classificacao, comentario } = req.body;
        const reviewId = req.params.id.trim(); // Remover espaços e quebras de linha

        // Verificar se o ID é válido
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: "ID da review inválido." });
        }

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review não encontrada." });
        }

        // Apenas o autor da review pode editá-la
        if (review.utilizador.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Não autorizado." });
        }

        review.classificacao = classificacao || review.classificacao;
        review.comentario = comentario || review.comentario;

        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar review.", error });
    }
};
// **Eliminar uma review**
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review não encontrada." });
        }

        // Apenas o autor da review ou um admin pode eliminá-la
        if (review.utilizador.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Não autorizado." });
        }

        await review.deleteOne();
        res.json({ message: "Review eliminada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao eliminar review.", error });
    }
};

module.exports = { createReview, getReviewsByRoom, updateReview, deleteReview };
