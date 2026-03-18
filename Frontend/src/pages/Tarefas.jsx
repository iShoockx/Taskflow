import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import FormularioTarefa from "../components/FormularioTarefa";
import CardTarefa from "../components/CardTarefa";

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const navigate = useNavigate();

  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = async () => {
    try {
      const resposta = await api.get("/tarefas");
      setTarefas(resposta.data);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao buscar tarefas");
    }
  };

  const criarTarefa = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tarefas", {
        titulo,
        descricao,
        dataConclusao
      });

      setTitulo("");
      setDescricao("");
      setDataConclusao("");

      buscarTarefas();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao criar tarefa");
    }
  };

  const concluirTarefa = async (id, concluidaAtual) => {
    try {
      await api.put(`/tarefas/${id}`, {
        concluida: !concluidaAtual
      });

      buscarTarefas();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao atualizar tarefa");
    }
  };

  const deletarTarefa = async (id) => {
    try {
      await api.delete(`/tarefas/${id}`);
      buscarTarefas();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao deletar tarefa");
    }
  };

  const sair = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
  });

  return (
    <div className="container">
      <div className="linha-topo">
        <h1 className="titulo-pagina">Minhas tarefas</h1>
        <button className="botao-secundario" onClick={sair}>
          Sair
        </button>
      </div>

      <FormularioTarefa
        titulo={titulo}
        setTitulo={setTitulo}
        descricao={descricao}
        setDescricao={setDescricao}
        dataConclusao={dataConclusao}
        setDataConclusao={setDataConclusao}
        aoEnviar={criarTarefa}
      />

      <div className="filtros">
        <button className="botao-secundario" onClick={() => setFiltro("todas")}>
          Todas
        </button>

        <button
          className="botao-secundario"
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>

        <button
          className="botao-secundario"
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
      </div>

      <div className="lista-tarefas">
        {tarefasFiltradas.length === 0 ? (
          <div className="card">
            <p>Nenhuma tarefa encontrada.</p>
          </div>
        ) : (
          tarefasFiltradas.map((tarefa) => (
            <CardTarefa
              key={tarefa._id}
              tarefa={tarefa}
              aoConcluir={concluirTarefa}
              aoDeletar={deletarTarefa}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Tarefas;