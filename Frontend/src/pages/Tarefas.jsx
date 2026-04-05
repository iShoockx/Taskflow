import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import logoTaskflow from "../assets/images/taskflow.png";
import CardTarefa from "../components/CardTarefa";
import "./tarefas.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataConclusao, setDataConclusao] = useState(null);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  const [mostrarPendentes, setMostrarPendentes] = useState(true);
  const [mostrarAtrasadas, setMostrarAtrasadas] = useState(true);
  const [mostrarConcluidas, setMostrarConcluidas] = useState(true);

  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

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

  const ordenarPorDataMaisProxima = (lista) => {
    return [...lista].sort(
      (a, b) => new Date(a.dataConclusao) - new Date(b.dataConclusao),
    );
  };

  const limparFormulario = () => {
    setTitulo("");
    setDescricao("");
    setDataConclusao(null);
    setTarefaEmEdicao(null);
  };

  const abrirModalNovaTarefa = () => {
    limparFormulario();
    setModalAberto(true);
  };

  const fecharModal = () => {
    limparFormulario();
    setModalAberto(false);
  };

  const salvarTarefa = async (e) => {
    e.preventDefault();

    try {
      if (tarefaEmEdicao) {
        await api.put(`/tarefas/${tarefaEmEdicao._id}`, {
          titulo,
          descricao,
          dataConclusao,
        });
      } else {
        await api.post("/tarefas", {
          titulo,
          descricao,
          dataConclusao,
        });
      }

      fecharModal();
      buscarTarefas();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao salvar tarefa");
    }
  };

  const concluirTarefa = async (id, concluidaAtual) => {
    try {
      await api.put(`/tarefas/${id}`, {
        concluida: !concluidaAtual,
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

  const editarTarefa = (tarefa) => {
    setTarefaEmEdicao(tarefa);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao || "");
    setDataConclusao(
      tarefa.dataConclusao ? new Date(tarefa.dataConclusao) : null,
    );
    setModalAberto(true);
  };

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const irParaPainelAdmin = () => {
    navigate("/admin/usuarios");
  };

  const textoPesquisa = pesquisa.trim().toLowerCase();

  const tarefasFiltradasPorNome = tarefas.filter((tarefa) =>
    tarefa.titulo.toLowerCase().includes(textoPesquisa),
  );

  const agora = new Date();

  const tarefasPendentes = ordenarPorDataMaisProxima(
    tarefasFiltradasPorNome.filter(
      (tarefa) => !tarefa.concluida && new Date(tarefa.dataConclusao) >= agora,
    ),
  );

  const tarefasAtrasadas = ordenarPorDataMaisProxima(
    tarefasFiltradasPorNome.filter(
      (tarefa) => !tarefa.concluida && new Date(tarefa.dataConclusao) < agora,
    ),
  );

  const tarefasConcluidas = ordenarPorDataMaisProxima(
    tarefasFiltradasPorNome.filter((tarefa) => tarefa.concluida),
  );

  return (
    <>
      <div className="tarefas-page">
        <main className="tarefas-main tarefas-main-full">
          <header className="tarefas-header">
            <div className="tarefas-brand">
              <img
                src={logoTaskflow}
                alt="Logo Taskflow"
                className="tarefas-logo"
              />
            </div>

            <div className="tarefas-header-acoes">
              {usuarioLogado?.tipo === "admin" && (
                <button
                  className="tarefas-botao-secundario"
                  onClick={irParaPainelAdmin}
                >
                  Usuários
                </button>
              )}
              <button className="tarefas-botao-sair" onClick={sair}>
                Sair
              </button>
            </div>
          </header>

          <section className="tarefas-content">
            <div className="tarefas-intro">
              <h1>Minhas tarefas</h1>
              <p>
                Gerencie pendências, acompanhe prazos e mantenha seu fluxo em
                ordem.
              </p>
            </div>

            <div className="tarefas-barra-topo">
              <div className="tarefas-pesquisa-box">
                <input
                  type="text"
                  placeholder="Pesquisar tarefa pelo nome..."
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                  className="tarefas-pesquisa-input"
                />
              </div>

              <button
                className="tarefas-botao-principal tarefas-botao-adicionar"
                onClick={abrirModalNovaTarefa}
              >
                Nova tarefa
              </button>
            </div>

            <div className="tarefas-bloco pendentes">
              <div
                className="tarefas-bloco-topo"
                onClick={() => setMostrarPendentes(!mostrarPendentes)}
              >
                <h2>Pendentes</h2>
                <span>{mostrarPendentes ? "⌃" : "⌄"}</span>
              </div>

              {mostrarPendentes && (
                <div className="tarefas-bloco-conteudo">
                  {tarefasPendentes.length === 0 ? (
                    <div className="tarefas-vazio">
                      Nenhuma tarefa pendente encontrada.
                    </div>
                  ) : (
                    tarefasPendentes.map((tarefa) => (
                      <CardTarefa
                        key={tarefa._id}
                        tarefa={tarefa}
                        aoConcluir={concluirTarefa}
                        aoDeletar={deletarTarefa}
                        aoEditar={editarTarefa}
                      />
                    ))
                  )}
                </div>
              )}
            </div>

            {tarefasAtrasadas.length > 0 && (
              <div className="tarefas-bloco atrasadas">
                <div
                  className="tarefas-bloco-topo"
                  onClick={() => setMostrarAtrasadas(!mostrarAtrasadas)}
                >
                  <h2>Expiradas</h2>
                  <span>{mostrarAtrasadas ? "⌃" : "⌄"}</span>
                </div>

                {mostrarAtrasadas && (
                  <div className="tarefas-bloco-conteudo">
                    {tarefasAtrasadas.map((tarefa) => (
                      <CardTarefa
                        key={tarefa._id}
                        tarefa={tarefa}
                        aoConcluir={concluirTarefa}
                        aoDeletar={deletarTarefa}
                        aoEditar={editarTarefa}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {tarefasConcluidas.length > 0 && (
              <div className="tarefas-bloco concluidas">
                <div
                  className="tarefas-bloco-topo"
                  onClick={() => setMostrarConcluidas(!mostrarConcluidas)}
                >
                  <h2>Concluídas</h2>
                  <span>{mostrarConcluidas ? "⌃" : "⌄"}</span>
                </div>

                {mostrarConcluidas && (
                  <div className="tarefas-bloco-conteudo">
                    {tarefasConcluidas.map((tarefa) => (
                      <CardTarefa
                        key={tarefa._id}
                        tarefa={tarefa}
                        aoConcluir={concluirTarefa}
                        aoDeletar={deletarTarefa}
                        aoEditar={editarTarefa}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>

      {modalAberto && (
        <div className="tarefas-modal-overlay" onClick={fecharModal}>
          <div className="tarefas-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tarefas-modal-topo">
              <h2>{tarefaEmEdicao ? "Editar tarefa" : "Nova tarefa"}</h2>
              <button onClick={fecharModal}>✕</button>
            </div>

            <form className="tarefas-modal-form" onSubmit={salvarTarefa}>
              <div className="tarefas-campo">
                <label>Título</label>
                <input
                  type="text"
                  placeholder="Digite o título da tarefa"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              <div className="tarefas-campo">
                <label>Descrição</label>
                <textarea
                  placeholder="Descreva a tarefa"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>

              <div className="tarefas-campo">
                <label>Data de conclusão</label>
                <DatePicker
                  selected={dataConclusao}
                  onChange={(date) => setDataConclusao(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  dateFormat="dd/MM/yyyy HH:mm"
                  placeholderText="Selecione a data e o horário"
                  className="tarefas-datepicker"
                  required
                />
              </div>

              <div className="tarefas-modal-acoes">
                <button type="submit" className="tarefas-botao-principal">
                  {tarefaEmEdicao ? "Salvar alterações" : "Criar tarefa"}
                </button>
                <button
                  type="button"
                  className="tarefas-botao-secundario"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Tarefas;
