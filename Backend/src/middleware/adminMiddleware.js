const somenteAdmin = (req, res, next) => {
  if (req.usuarioTipo !== "admin") {
    return res.status(403).json({
      mensagem: "Acesso permitido apenas para administradores"
    });
  }

  next();
};

export default somenteAdmin;