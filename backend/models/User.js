const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Reservation = require("./Reservation");
const Review = require("./Review");

const UserSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "O nome é obrigatório"],
        },
        email: {
            type: String,
            required: [true, "O e-mail é obrigatório"],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Por favor, insira um e-mail válido",
            ],
        },
        password: {
            type: String,
            required: [true, "A palavra-passe é obrigatória"],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["admin", "utilizador"],
            default: "utilizador",
        },
        profilePic: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// **Antes de eliminar um utilizador, remove todas as suas reservas e reviews**
UserSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        await Reservation.deleteMany({ utilizador: this._id });
        await Review.deleteMany({ utilizador: this._id });
        console.log(`✅ Reservas e reviews de ${this._id} eliminadas.`);
        next();
    } catch (error) {
        console.error("❌ Erro ao eliminar reservas e reviews:", error);
        next(error);
    }
});

module.exports = mongoose.model("User", UserSchema);