exports.buscarPorCodigo = (req, res) => {
  const { codigo } = req.params;

  res.json({
    mensagem: 'Fila encontrada',
    codigo
  });
};
