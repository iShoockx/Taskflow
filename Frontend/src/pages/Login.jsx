import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post("/auth/login", {
        email,
        senha
      });

      localStorage.setItem("token", resposta.data.token);
      navigate("/tarefas");
    } catch (erro) {
      console.error(erro);
      alert("Erro ao fazer login");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="titulo-pagina">Login</h1>

        <form className="formulario" onSubmit={fazerLogin}>
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
            Entrar
          </button>
        </form>

        <p style={{ marginTop: "16px" }}>
          Não tem conta? <Link to="/cadastro">Cadastrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;