import express from "express";
import proteger from "../middleware/authMiddleware.js";
import {
  criarTarefa,
  listarTarefas,
  atualizarTarefa,
  deletarTarefa
} from "../controllers/tarefaController.js";

const router = express.Router();

router.post("/", proteger, criarTarefa);
router.get("/", proteger, listarTarefas);
router.put("/:id", proteger, atualizarTarefa);
router.delete("/:id", proteger, deletarTarefa);

export default router;