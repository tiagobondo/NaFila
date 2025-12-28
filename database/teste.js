const manager = require('./db');

async function rodarTestes() {
    console.log("=== 🧪 INICIANDO TESTES DO NAFILA ===");

    try {
        // 1. Criar Estabelecimento manual para o teste
        await new Promise((res) => {
            manager.db.run(`INSERT OR IGNORE INTO estabelecimentos (id, nome, email, senha_hash) VALUES (1, 'Loja Teste', 'teste@loja.com', '123')`, res);
        });

        // 2. Criar Fila
        const fila = await manager.criarFila(1, "Atendimento Geral", "G01");
        console.log(` Fila Criada: ${fila.codigo}`);

        // 3. Entrar na Fila
        const c1 = await manager.entrarNaFila(fila.fila_id, "Honório Zola", "900000000");
        console.log(`Cliente entrou. ID: ${c1.clienteId}`);

        // 4. Verificar Ticket e Posição
        const info = await manager.obterPosicaoAtual(c1.clienteId);
        console.log(`🔍 Ticket Gerado: ${info.ticket_number} | Posição: ${info.posicao_atual}º`);

        // 5. Chamar e Finalizar
        const chamado = await manager.chamarProximo(fila.fila_id);
        console.log(` Chamando: ${chamado.nome}`);
        
        await manager.finalizarAtendimento(chamado.id);
        console.log(`Atendimento finalizado com sucesso!`);

        

    } catch (error) {
        console.error("\n ERRO:", error.message);
        process.exit(1);
    }
}

// Pequeno delay para garantir que o banco abriu
setTimeout(rodarTestes, 500);