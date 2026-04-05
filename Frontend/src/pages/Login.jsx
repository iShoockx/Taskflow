import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../api/api";
import logoTaskflow from "../assets/images/taskflow.png";
import "./login.css";

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
      localStorage.setItem("usuario", JSON.stringify(resposta.data.usuario));

      navigate("/tarefas");
    } catch (erro) {
      console.error(erro);
      alert("Erro ao fazer login");
    }
  };

  const loginComGoogle = async (credentialResponse) => {
    try {
      const resposta = await api.post("/auth/google", {
        credential: credentialResponse.credential
      });

      localStorage.setItem("token", resposta.data.token);
      localStorage.setItem("usuario", JSON.stringify(resposta.data.usuario));

      navigate("/tarefas");
    } catch (erro) {
      console.error(erro);
      alert("Erro ao entrar com Google");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-wrapper">
        <div className="login-brand">
          <img src={logoTaskflow} alt="Logo Taskflow" className="login-logo" />
          <p className="login-subtitle">
            Organize suas tarefas com mais clareza e fluxo.
          </p>
        </div>

        <div className="login-card">
          <div className="login-card-top">
            <span className="login-badge">Bem-vindo</span>
            <h1>Entrar na sua conta</h1>
            <p>Acesse sua área e continue de onde parou.</p>
          </div>

          <form className="login-form" onSubmit={fazerLogin}>
            <div className="input-group">
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

            <div className="input-group">
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
              Entrar
            </button>
          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <div className="login-google">
            <GoogleLogin
              onSuccess={loginComGoogle}
              onError={() => alert("Falha no login com Google")}
              theme="outline"
              size="large"
              text="signin_with"
              shape="pill"
              locale="pt-BR"
            />
          </div>

          <div className="login-footer">
            <p>
              Não tem conta?{" "}
              <Link to="/cadastro" className="login-link">
                Criar cadastro
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;