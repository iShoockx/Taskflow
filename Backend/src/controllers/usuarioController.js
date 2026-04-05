import Usuario from "../models/User.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-senha");

    res.json(usuarios);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro);
    res.status(500).json({
      mensagem: "Erro ao listar usuários"
    });
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado"
      });
    }

    await usuario.deleteOne();

    res.json({
      mensagem: "Usuário removido com sucesso"
    });
  } catch (erro) {
    console.error("Erro ao deletar usuário:", erro);
    res.status(500).json({
      mensagem: "Erro ao deletar usuário"
    });
  }
};