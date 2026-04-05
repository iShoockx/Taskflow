import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import logoTaskflow from "../assets/images/taskflow.png";
import "./login.css";

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
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-wrapper">
        <div className="login-brand">
          <img
            src={logoTaskflow}
            alt="Logo Taskflow"
            className="login-logo"
          />
          <p className="login-subtitle">
            Crie sua conta e comece a organizar suas tarefas com mais fluidez.
          </p>
        </div>

        <div className="login-card">
          <div className="login-card-top">
            <span className="login-badge">Primeiro acesso</span>
            <h1>Criar conta</h1>
            <p>Preencha seus dados para entrar no Taskflow.</p>
          </div>

          <form className="login-form" onSubmit={cadastrarUsuario}>
            <div className="login-input-group">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                className="login-input"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="login-input"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                className="login-input"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button className="login-button" type="submit">
              Criar conta
            </button>
          </form>

          <div className="login-footer">
            <p>
              Já tem conta?{" "}
              <Link to="/login" className="login-link">
                Entrar agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;