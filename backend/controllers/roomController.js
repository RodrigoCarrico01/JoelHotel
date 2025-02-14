const Room = require("../models/Room");

// **Criar um novo quarto**
const createRoom = async (req, res) => {
    try {
        const { nome, descricao, imagem, numeroQuarto, precoPorNoite, status } = req.body;

        // Verificar se o quarto já existe
        const roomExists = await Room.findOne({ numeroQuarto });
        if (roomExists) {
            return res.status(400).json({ message: "Este número de quarto já está registado." });
        }

        const room = new Room({
            nome,
            descricao,
            imagem,
            numeroQuarto,
            precoPorNoite,
            status,
        });

        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar quarto.", error });
    }
};

// **Obter todos os quartos**
const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar quartos.", error });
    }
};

// **Obter um quarto pelo ID**
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Quarto não encontrado." });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter quarto.", error });
    }
};

// **Atualizar um quarto**
const updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Quarto não encontrado." });
        }

        room.nome = req.body.nome || room.nome;
        room.descricao = req.body.descricao || room.descricao;
        room.imagem = req.body.imagem || room.imagem;
        room.numeroQuarto = req.body.numeroQuarto || room.numeroQuarto;
        room.precoPorNoite = req.body.precoPorNoite || room.precoPorNoite;
        room.status = req.body.status || room.status;

        const updatedRoom = await room.save();
        res.json(updatedRoom);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar quarto.", error });
    }
};

// **Eliminar um quarto**
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Quarto não encontrado." });
        }

        await room.deleteOne();
        res.json({ message: "Quarto eliminado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao eliminar quarto.", error });
    }
};

module.exports = { createRoom, getRooms, getRoomById, updateRoom, deleteRoom };
