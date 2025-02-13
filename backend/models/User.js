const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        name: {
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
            required: [true, "A senha é obrigatória"],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    { timestamps: true }
);

// Hash da senha antes de salvar
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);


// 📌 Explicação
//  name, email e password são campos obrigatórios.
// email é único e validado com um regex.
// role pode ser "admin" ou "user", padrão é "user".
// Antes de salvar, a senha é hashada com bcrypt para segurança.
