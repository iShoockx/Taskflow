import Tarefa from "../models/Tarefa.js";

export const criarTarefaService = async ({ titulo, descricao, dataConclusao, usuarioId }) => {
  const tarefa = new Tarefa({
    titulo,
    descricao,
    dataConclusao,
    usuario: usuarioId
  });

  return await tarefa.save();
};

export const listarTarefasService = async (usuarioId) => {
  return await Tarefa.find({ usuario: usuarioId }).sort({ dataConclusao: 1 });
};

export const buscarTarefaPorIdService = async (tarefaId) => {
  return await Tarefa.findById(tarefaId);
};

export const atualizarTarefaService = async (tarefa, dados) => {
  tarefa.titulo = dados.titulo || tarefa.titulo;
  tarefa.descricao = dados.descricao || tarefa.descricao;
  tarefa.dataConclusao = dados.dataConclusao || tarefa.dataConclusao;
  tarefa.concluida = dados.concluida ?? tarefa.concluida;

  return await tarefa.save();
};

export const deletarTarefaService = async (tarefa) => {
  return await tarefa.deleteOne();
};