import jwt from "jsonwebtoken";

const proteger = (req, res, next) => {

  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {

    try {

      token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usuarioId = decoded.id;

      next();

    } catch (erro) {

      return res.status(401).json({
        mensagem: "Token inválido"
      });

    }

  }

  if (!token) {
    return res.status(401).json({
      mensagem: "Token não fornecido"
    });
  }

};

export default proteger;