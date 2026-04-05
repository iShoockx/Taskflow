import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Tarefas from "./pages/Tarefas";
import AdminUsuarios from "./pages/AdminUsuarios";

function RotaProtegida({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function RotaAdmin({ children }) {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (usuario?.tipo !== "admin") {
    return <Navigate to="/tarefas" />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route
        path="/tarefas"
        element={
          <RotaProtegida>
            <Tarefas />
          </RotaProtegida>
        }
      />

      <Route
        path="/admin/usuarios"
        element={
          <RotaAdmin>
            <AdminUsuarios />
          </RotaAdmin>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;