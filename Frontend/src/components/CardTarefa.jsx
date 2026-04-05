import { Check, Pencil, Trash2, Clock3, AlertTriangle } from "lucide-react";

function CardTarefa({ tarefa, aoConcluir, aoDeletar, aoEditar }) {
  const data = new Date(tarefa.dataConclusao);
  const agora = new Date();
  const diferenca = data - agora;

  let statusTempo = "";
  let classeTempo = "";
  let IconeTempo = Clock3;
  
  if (tarefa.concluida) {
    statusTempo = "Tarefa concluída";
    classeTempo = "tempo-concluido";
    IconeTempo = Check;
  } else if (diferenca > 0) {
    const minutos = Math.floor(diferenca / 1000 / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      statusTempo = `Faltam ${dias}d ${horas % 24}h`;
    } else if (horas > 0) {
      statusTempo = `Faltam ${horas}h ${minutos % 60}min`;
    } else {
      statusTempo = `Faltam ${minutos} min`;
    }

    classeTempo = "tempo-normal";
    IconeTempo = Clock3;
  } else {
    const minutos = Math.abs(Math.floor(diferenca / 1000 / 60));
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      statusTempo = `Atrasada ${dias}d ${horas % 24}h`;
    } else if (horas > 0) {
      statusTempo = `Atrasada ${horas}h ${minutos % 60}min`;
    } else {
      statusTempo = `Atrasada ${minutos} min`;
    }

    classeTempo = "tempo-atrasado";
    IconeTempo = AlertTriangle;
  }

  return (
    <div className="tarefa-card-profissional">
      <div className="tarefa-card-info">
        <h3>{tarefa.titulo}</h3>
        <p>{tarefa.descricao || "Sem descrição"}</p>
      </div>

      <div className="tarefa-card-data">
        <div className={`data-status ${classeTempo}`}>
          <IconeTempo size={18} strokeWidth={2.2} />
          <span>{statusTempo}</span>
        </div>
      </div>

      <div className="tarefa-card-acoes">
        <button
          title={tarefa.concluida ? "Marcar como pendente" : "Concluir"}
          onClick={() => aoConcluir(tarefa._id, tarefa.concluida)}
        >
          <Check size={20} strokeWidth={2.4} />
        </button>

        <button title="Editar" onClick={() => aoEditar(tarefa)}>
          <Pencil size={20} strokeWidth={2.4} />
        </button>

        <button title="Deletar" onClick={() => aoDeletar(tarefa._id)}>
          <Trash2 size={20} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}

export default CardTarefa;