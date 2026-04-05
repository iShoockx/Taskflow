import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./adminUsuarios.css";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || usuario.tipo !== "admin") {
      navigate("/tarefas");
      return;
    }

    buscarUsuarios();
  }, []);

  const buscarUsuarios = async () => {
    try {
      const resposta = await api.get("/usuarios");
      setUsuarios(resposta.data);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao buscar usuários");
    }
  };

  const deletarUsuario = async (id) => {
    const confirmou = window.confirm("Deseja realmente apagar este usuário?");
    if (!confirmou) return;

    try {
      await api.delete(`/usuarios/${id}`);
      buscarUsuarios();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao apagar usuário");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Painel administrativo</h1>

          <button
            className="admin-botao-voltar"
            onClick={() => navigate("/tarefas")}
          >
            Voltar
          </button>
        </div>

        {usuarios.length === 0 ? (
          <div className="admin-vazio">
            Nenhum usuário encontrado.
          </div>
        ) : (
          <div className="admin-lista">
            {usuarios.map((usuario) => (
              <div className="admin-card" key={usuario._id}>
                <div className="admin-info">
                  <span className="admin-nome">{usuario.nome}</span>
                  <span className="admin-email">{usuario.email}</span>

                  <span className={`admin-badge ${usuario.tipo}`}>
                    {usuario.tipo}
                  </span>
                </div>

                <div className="admin-acoes">
                  <button
                    className="admin-btn-deletar"
                    onClick={() => deletarUsuario(usuario._id)}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsuarios;