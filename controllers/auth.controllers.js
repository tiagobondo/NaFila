exports.registar = (req, res) => {
  res.status(201).json({
    mensagem: 'Estabelecimento registado'
  });
};

exports.login = (req, res) => {
  res.json({
    mensagem: 'Login efetuado',
    token: 'fake-token'
  });
};
