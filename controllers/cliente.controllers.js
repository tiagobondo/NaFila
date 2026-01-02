// posição do cliente
export const posicaoCliente = (req, res) => {
  res.json({
    fila: req.params.idFila,
    cliente: req.params.idCliente,
    posicao: 1
  });
};

