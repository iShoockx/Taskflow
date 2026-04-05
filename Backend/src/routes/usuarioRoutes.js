import express from "express";
import proteger from "../middleware/authMiddleware.js";
import somenteAdmin from "../middleware/adminMiddleware.js";
import {
  listarUsuarios,
  deletarUsuario
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/", proteger, somenteAdmin, listarUsuarios);
router.delete("/:id", proteger, somenteAdmin, deletarUsuario);

export default router;