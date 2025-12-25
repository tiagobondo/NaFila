import app from "./app.js"; //importacao do arquivo app.js
import dotenv from 'dotenv'; //importacao da dependecia que nos permite trabalha com variaves de ambiente
import http from 'http';

dotenv.config();

const PORT = 3000 || process.env.PORT
const server = http.createServer(app); //Criando o servidor baseado no aapp

server.listen(PORT, () => {
  console.log(`Servidor Rodando no https://localhost:${PORT}`);
})