// buscar fila por código
export const getFilaByCodigo = (req, res) => {
  res.json({
    mensagem: 'Fila encontrada',
    codigo: req.params.codigo
  });
};

// criar fila
export const criarFila = (req, res) => {
  res.status(201).json({
    mensagem: 'Fila criada com sucesso'
  });
};

// listar filas
export const listarFilas = (req, res) => {
  res.json({
    mensagem: 'Lista de filas'
  });
};

export const entrarNaFila = (req, res) => {
  res.status(201).json({
    mensagem: 'Cliente entrou na fila',
    idFila: req.params.idFila
  });
};
