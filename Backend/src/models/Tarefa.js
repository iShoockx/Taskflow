import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({

  titulo: {
    type: String,
    required: true
  },

  descricao: {
    type: String
  },

  dataConclusao: {
    type: Date,
    required: true
  },

  concluida: {
    type: Boolean,
    default: false
  },

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},
{ timestamps: true });

const Tarefa = mongoose.model("Tarefa", tarefaSchema);

export default Tarefa;