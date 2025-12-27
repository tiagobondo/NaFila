-- Tabela: estabelecimentos
CREATE TABLE IF NOT EXISTS estabelecimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: filas
CREATE TABLE IF NOT EXISTS filas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    estabelecimento_id INTEGER NOT NULL,
    nome TEXT NOT NULL, 
    codigo TEXT UNIQUE, 
    status TEXT DEFAULT 'ativa' CHECK (status IN ('ativa', 'pausada', 'inativa')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estabelecimento_id) REFERENCES estabelecimentos(id) ON DELETE CASCADE
);

-- Tabela: clientes_na_fila
CREATE TABLE IF NOT EXISTS clientes_na_fila (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fila_id INTEGER NOT NULL,
    nome TEXT NOT NULL,
    telefone TEXT,
    status TEXT DEFAULT 'esperando' CHECK (status IN ('esperando', 'chamado', 'atendido', 'cancelado')),
    ticket_number TEXT,
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_chamado TIMESTAMP,
    data_atendido TIMESTAMP,
    tempo_espera INTEGER,
    FOREIGN KEY (fila_id) REFERENCES filas(id) ON DELETE CASCADE
);

-- Tabela: atendimentos (Histórico)
CREATE TABLE IF NOT EXISTS atendimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    fila_id INTEGER NOT NULL,
    estabelecimento_id INTEGER NOT NULL,
    tempo_espera_total INTEGER,
    data_inicio TIMESTAMP,
    data_fim TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes_na_fila(id),
    FOREIGN KEY (fila_id) REFERENCES filas(id),
    FOREIGN KEY (estabelecimento_id) REFERENCES estabelecimentos(id)
);

-- TRIGGER: Gerar Ticket automaticamente
CREATE TRIGGER IF NOT EXISTS gerar_ticket_cliente
AFTER INSERT ON clientes_na_fila
BEGIN
    UPDATE clientes_na_fila 
    SET ticket_number = 'TKT-' || substr('00000' || NEW.id, -5, 5)
    WHERE id = NEW.id;
END;

-- TRIGGER: Finalizar e Mover para Histórico
CREATE TRIGGER IF NOT EXISTS trigger_finalizar_atendimento
AFTER UPDATE OF status ON clientes_na_fila
WHEN NEW.status = 'atendido' AND OLD.status != 'atendido'
BEGIN
    UPDATE clientes_na_fila 
    SET tempo_espera = ROUND((JULIANDAY('now') - JULIANDAY(data_entrada)) * 86400),
        data_atendido = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
    
    INSERT INTO atendimentos (cliente_id, fila_id, estabelecimento_id, tempo_espera_total, data_inicio)
    SELECT NEW.id, NEW.fila_id, f.estabelecimento_id, 
           ROUND((JULIANDAY('now') - JULIANDAY(NEW.data_entrada)) * 86400), NEW.data_entrada
    FROM filas f WHERE f.id = NEW.fila_id;
END;