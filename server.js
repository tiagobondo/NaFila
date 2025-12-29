

const express = require("express");

const app = express();
const PORT = 3000; 

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend NaFila ativo " });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
import app from "./app.js"; //importacao do arquivo app.js
import dotenv from 'dotenv'; //importacao da dependecia que nos permite trabalha com variaves de ambiente
import http from 'http';

dotenv.config();

const PORT = 3000 || process.env.PORT
const server = http.createServer(app); //Criando o servidor baseado no aapp

server.listen(PORT, () => {
  console.log(`Servidor Rodando no https://localhost:${PORT}`);
})
