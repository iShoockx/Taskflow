function FormularioTarefa({
  titulo,
  setTitulo,
  descricao,
  setDescricao,
  dataConclusao,
  setDataConclusao,
  aoEnviar
}) {
  return (
    <div className="card">
      <h2 style={{ marginBottom: "16px" }}>Criar tarefa</h2>

      <form className="formulario" onSubmit={aoEnviar}>
        <input
          className="input"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          className="input"
          type="date"
          value={dataConclusao}
          onChange={(e) => setDataConclusao(e.target.value)}
        />

        <button className="botao" type="submit">
          Adicionar tarefa
        </button>
      </form>
    </div>
  );
}

export default FormularioTarefa;