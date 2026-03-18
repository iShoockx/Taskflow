import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {

    console.log(req.body);
    const { nome, email, senha } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Usuário já existe"
      });
    }

    // criptografando senha
    const salt = await bcrypt.genSalt(10); // gera um nivel de complexidade para criptografia
    const hashedPassword = await bcrypt.hash(senha, salt); // gera a senha criptografada

    const user = new User({
      nome,
      email,
      senha: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "Usuário criado com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor"
    });
  }
};

export const loginUser = async (req, res) => {
  try {

    const { email, senha } = req.body;

    const user = await User.findOne({ email }); // busca o usuário pelo email

    if (!user) {
      return res.status(400).json({
        message: "Credenciais inválidas"
      });
    }

    const isMatch = await bcrypt.compare(senha, user.senha); // compara a senha digitada com a senha criptografada no banco

    if (!isMatch) {
      return res.status(400).json({
        message: "Credenciais inválidas"
      });
    }

    const token = jwt.sign( // gera o token de autenticação
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token
    });

  } catch (error) {

  console.error("ERRO REGISTER:", error);

  res.status(500).json({
    message: "Erro no servidor"
  });

}
};