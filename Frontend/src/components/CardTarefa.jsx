function CardTarefa({ tarefa, aoConcluir, aoDeletar }) {
  return (
    <div className="tarefa-card">
      <h3>{tarefa.titulo}</h3>
      <p>{tarefa.descricao}</p>
      <p>
        <strong>Data de conclusão:</strong>{" "}
        {new Date(tarefa.dataConclusao).toLocaleDateString("pt-BR")}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {tarefa.concluida ? "Concluída" : "Pendente"}
      </p>

      <div className="grupo-botoes" style={{ marginTop: "12px" }}>
        <button
          className="botao"
          onClick={() => aoConcluir(tarefa._id, tarefa.concluida)}
        >
          {tarefa.concluida ? "Marcar como pendente" : "Concluir"}
        </button>

        <button
          className="botao-secundario"
          onClick={() => aoDeletar(tarefa._id)}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

export default CardTarefa;