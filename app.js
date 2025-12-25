import express from 'express';
import cors from 'cors';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

import indexRouter from './routes/index.js';

//Configuracao para acesso ao caminho
const pathFile = fileURLToPath(import.meta.url);
const name_path = path.dirname(pathFile);

//constante app ou seja aplicacao
const app = express();

//App usando alguns servicos
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(name_path, 'public')));
app.set('views', path.join(name_path, 'views'));
app.set('view engine', 'ejs');

/*
  Chamada das routes
  app.use('/login', indeRouter);
*/

//Nossas routas
app.use('/', indexRouter);

//Exportacao do APP, para o uso posterior do arquivos server
export default app