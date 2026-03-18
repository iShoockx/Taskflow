import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors()); // habilita CORS para permitir requisições de diferentes origens
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tarefas", tarefaRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});