const Room = require("../models/Room");


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


module.exports = { getRooms, getRoomById };
