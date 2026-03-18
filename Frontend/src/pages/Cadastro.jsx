import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const cadastrarUsuario = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha
      });

      navigate("/login");
    } catch (erro) {
      console.error(erro);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="titulo-pagina">Cadastro</h1>

        <form className="formulario" onSubmit={cadastrarUsuario}>
          <input
            className="input"
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            className="input"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button className="botao" type="submit">
            Cadastrar
          </button>
        </form>

        <p style={{ marginTop: "16px" }}>
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;