import express from 'express';

const router = express.Router();//instanciando router proveniente do express para a constante router

router.get('/', (req, res) => {
  res.send("Bem vindo ao nosso projecto NAFILA");
})

/*
  req: request
  res: response
*/

export default router;