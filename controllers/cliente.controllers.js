exports.entrarNaFila = (req, res) => {
  const { idFila } = req.params;
  const { nome } = req.body;

  res.status(201).json({
    mensagem: 'Cliente introduzido na fila',
    fila: idFila,
    nome
  });
};

exports.verPosicao = (req, res) => {
  const { idFila, idCliente } = req.params;

  res.json({
    fila: idFila,
    cliente: idCliente,
    posicao: 0
  });
};
