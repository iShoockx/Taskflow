import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado ao MongoDB");

    // ⚠️ opcional (limpa tudo)
    await User.deleteMany();

    const senhaHash = await bcrypt.hash("123", 10);

    const usuarios = [
      {
        nome: "Usuário Teste",
        email: "usuario@email.com",
        senha: senhaHash,
        tipo: "usuario"
      },
      {
        nome: "Admin Teste",
        email: "admin@email.com",
        senha: senhaHash,
        tipo: "admin"
      }
    ];

    await User.insertMany(usuarios);

    console.log("Usuários criados com sucesso!");

    process.exit();
  } catch (error) {
    console.error("Erro ao rodar seed:", error);
    process.exit(1);
  }
};

seed();