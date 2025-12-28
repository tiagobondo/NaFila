const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class DatabaseManager {
    constructor() {
        const dbPath = path.resolve(__dirname, 'nafila.db');
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error(' Erro de conexão:', err.message);
                process.exit(1);
            }
            console.log('SQLite conectado em:', dbPath);
            this.configurarBanco();
        });
    }

    configurarBanco() {
        this.db.serialize(() => {
            this.db.run('PRAGMA foreign_keys = ON');
            this.criarSchema();
        });
    }

    criarSchema() {
        const schemaPath = path.resolve(__dirname, 'schema.sql');
        if (fs.existsSync(schemaPath)) {
            const schema = fs.readFileSync(schemaPath, 'utf8');
            this.db.exec(schema, (err) => {
                if (err) console.error(' Erro no schema:', err.message);
            });
        }
    }

    // --- FUNÇÃO ADICIONADA PARA O TESTE FUNCIONAR ---
    criarFila(estabelecimentoId, nome, codigo) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO filas (estabelecimento_id, nome, codigo) VALUES (?, ?, ?)`;
            this.db.run(sql, [estabelecimentoId, nome, codigo], function(err) {
                if (err) reject(err);
                resolve({ fila_id: this.lastID, codigo });
            });
        });
    }

    entrarNaFila(filaId, nomeCliente, telefone = '') {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO clientes_na_fila (fila_id, nome, telefone) VALUES (?, ?, ?)`;
            this.db.run(sql, [filaId, nomeCliente, telefone], function(err) {
                if (err) reject(err);
                resolve({ success: true, clienteId: this.lastID });
            });
        });
    }

    obterPosicaoAtual(clienteId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT c.*, 
                (SELECT COUNT(*) + 1 FROM clientes_na_fila c2 
                 WHERE c2.fila_id = c.fila_id AND c2.status = 'esperando' 
                 AND c2.id < c.id) as posicao_atual
                FROM clientes_na_fila c WHERE c.id = ?`;
            this.db.get(sql, [clienteId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    chamarProximo(filaId) {
        return new Promise((resolve, reject) => {
            const sqlBusca = `SELECT id, nome FROM clientes_na_fila WHERE fila_id = ? AND status = 'esperando' ORDER BY id ASC LIMIT 1`;
            this.db.get(sqlBusca, [filaId], (err, cliente) => {
                if (err) return reject(err);
                if (!cliente) return resolve(null);
                this.db.run(`UPDATE clientes_na_fila SET status = 'chamado' WHERE id = ?`, [cliente.id], (updErr) => {
                    if (updErr) return reject(updErr);
                    resolve(cliente);
                });
            });
        });
    }

    finalizarAtendimento(clienteId) {
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE clientes_na_fila SET status = 'atendido' WHERE id = ?`, [clienteId], function(err) {
                if (err) reject(err);
                resolve({ success: true });
            });
        });
    }
}

module.exports = new DatabaseManager();