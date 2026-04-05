import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Usuário já existe"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const user = new User({
      nome,
      email,
      senha: hashedPassword,
      tipo: "usuario"
    });

    await user.save();

    res.status(201).json({
      message: "Usuário criado com sucesso"
    });
  } catch (error) {
    console.error("ERRO REGISTER:", error);
    res.status(500).json({
      message: "Erro no servidor"
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Credenciais inválidas"
      });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(400).json({
        message: "Credenciais inválidas"
      });
    }

    const token = jwt.sign(
      { id: user._id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      usuario: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      }
    });
  } catch (error) {
    console.error("ERRO LOGIN:", error);
    res.status(500).json({
      message: "Erro no servidor"
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Credential do Google não enviada"
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const nome = payload.name;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        nome,
        email,
        senha: "",
        tipo: "usuario"
      });
    }

    const token = jwt.sign(
      { id: user._id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      usuario: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      }
    });
  } catch (error) {
    console.error("ERRO GOOGLE LOGIN:", error);
    res.status(500).json({
      message: "Erro ao autenticar com Google"
    });
  }
};