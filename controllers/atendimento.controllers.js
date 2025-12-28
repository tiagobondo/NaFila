exports.chamarProximo = (req, res) => {
  const { idFila } = req.params;

  res.json({
    mensagem: 'Próximo cliente chamado',
    fila: idFila
  });
};
