import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    senha: {
      type: String,
      default: ""
    },
    tipo: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario"
    },
    provedor: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;