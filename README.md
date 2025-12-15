# 🧾 NaFila

**NaFila** é um sistema web de gestão de filas digitais que permite que estabelecimentos organizem o atendimento e que clientes entrem na fila remotamente, aguardando no conforto das suas casas.

Este projeto foi desenvolvido como um **MVP (Produto Mínimo Viável)**, com foco em funcionalidade, simplicidade e rapidez de implementação.

---

## 🎯 Objetivo do Projeto

O objetivo do **NaFila** é reduzir aglomerações físicas, melhorar a organização do atendimento e proporcionar uma melhor experiência tanto para clientes quanto para estabelecimentos, através de filas digitais acessíveis via web.

---

## ⚙️ Funcionalidades (MVP)

### 🏪 Estabelecimento
- Cadastro e autenticação
- Criação de filas de atendimento
- Visualização da fila em tempo real
- Chamada do próximo cliente
- Finalização de atendimentos

### 👤 Cliente
- Entrada na fila via link ou código
- Informar nome sem necessidade de login
- Visualização da posição na fila
- Acompanhamento do estado do atendimento

---

## 🛠️ Tecnologias Utilizadas

- **Frontend Web:** HTML, CSS, JavaScript (ou React.js)
- **Backend:** Node.js, Express
- **Base de Dados:** SQLite ou PostgreSQL
- **Tempo Real:** Socket.io ou Polling
- **Controle de Versão:** Git & GitHub
- **Deploy:** Render, Vercel ou Railway

---

## 🧩 Arquitetura do Sistema

O sistema é composto por:
- Uma aplicação web para os estabelecimentos
- Uma aplicação web para os clientes
- Uma API REST responsável pela lógica de negócio
- Uma base de dados para persistência das filas

---

## 👥 Organização da Equipa

- **Gestão & Produto (1 pessoa)**  
  Planeamento do MVP, organização das tarefas e validação final.

- **Backend + Base de Dados (3 pessoas)**  
  Desenvolvimento da API, regras de negócio e modelagem do banco de dados.

- **Frontend Web (2 pessoas)**  
  Criação das interfaces e integração com a API.

- **Integração, Tempo Real & Testes (2 pessoas)**  
  Comunicação entre frontend e backend, atualização em tempo real e testes.

---

## 🚀 Como Executar o Projeto (exemplo)

```bash
# Clonar o repositório
git clone https://github.com/tiagobondo/NaFila.git

# Entrar no diretório
cd nafila

# Instalar dependências
npm install

# Executar o backend
npm run dev
