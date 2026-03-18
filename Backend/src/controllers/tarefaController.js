import {
  criarTarefaService,
  listarTarefasService,
  buscarTarefaPorIdService,
  atualizarTarefaService,
  deletarTarefaService
} from "../services/tarefaService.js";

export const criarTarefa = async (req, res) => {
  try {
    const { titulo, descricao, dataConclusao } = req.body;

    const tarefa = await criarTarefaService({
      titulo,
      descricao,
      dataConclusao,
      usuarioId: req.usuarioId
    });

    res.status(201).json(tarefa);
  } catch (erro) {
    console.error("Erro ao criar tarefa:", erro);

    res.status(500).json({
      mensagem: "Erro ao criar tarefa"
    });
  }
};

export const listarTarefas = async (req, res) => {
  try {
    const tarefas = await listarTarefasService(req.usuarioId);

    res.json(tarefas);
  } catch (erro) {
    console.error("Erro ao listar tarefas:", erro);

    res.status(500).json({
      mensagem: "Erro ao listar tarefas"
    });
  }
};

export const atualizarTarefa = async (req, res) => {
  try {
    const tarefa = await buscarTarefaPorIdService(req.params.id);

    if (!tarefa) {
      return res.status(404).json({
        mensagem: "Tarefa não encontrada"
      });
    }

    if (tarefa.usuario.toString() !== req.usuarioId) {
      return res.status(403).json({
        mensagem: "Acesso negado"
      });
    }

    const tarefaAtualizada = await atualizarTarefaService(tarefa, req.body);

    res.json(tarefaAtualizada);
  } catch (erro) {
    console.error("Erro ao atualizar tarefa:", erro);

    res.status(500).json({
      mensagem: "Erro ao atualizar tarefa"
    });
  }
};

export const deletarTarefa = async (req, res) => {
  try {
    const tarefa = await buscarTarefaPorIdService(req.params.id);

    if (!tarefa) {
      return res.status(404).json({
        mensagem: "Tarefa não encontrada"
      });
    }

    if (tarefa.usuario.toString() !== req.usuarioId) {
      return res.status(403).json({
        mensagem: "Acesso negado"
      });
    }

    await deletarTarefaService(tarefa);

    res.json({
      mensagem: "Tarefa removida"
    });
  } catch (erro) {
    console.error("Erro ao deletar tarefa:", erro);

    res.status(500).json({
      mensagem: "Erro ao deletar tarefa"
    });
  }
};