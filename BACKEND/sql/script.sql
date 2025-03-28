-- 1. Primeiro criar tabelas sem dependências
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    senha VARCHAR(255),
    nome_completo VARCHAR(100),
    ativo BOOLEAN,
    data_criacao TIMESTAMP,
    ultimo_login TIMESTAMP,
    perfil VARCHAR(50),
    token_recuperacao VARCHAR(255),
    token_validade TIMESTAMP
);

CREATE TABLE FormaPagamento (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    codigo_fiscal VARCHAR(20)
);

CREATE TABLE ContaBancaria_Portador (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    banco VARCHAR(100),
    agencia VARCHAR(20),
    conta VARCHAR(20),
    saldo DECIMAL(15,2),
    ativo BOOLEAN,
    usario_responsavel INTEGER
);

-- 2. Tabelas que dependem das básicas
CREATE TABLE NotaFiscalSaida (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(20),
    serie VARCHAR(10),
    data_emissao DATE,
    valor_total DECIMAL(15,2),
    chave_acesso VARCHAR(44),
    situacao VARCHAR(20),
    fk_FormaPagamento_id INTEGER
);

CREATE TABLE NotaFiscalEntrada (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(20),
    serie VARCHAR(10),
    data_emissao DATE,
    data_entrada DATE,
    valor_total DECIMAL(15,2),
    chave_acesso VARCHAR(44),
    situacao VARCHAR(20)
);

CREATE TABLE Faturamento (
    id SERIAL PRIMARY KEY,
    data_inicio DATE,
    data_fim DATE,
    total_recebido DECIMAL(15,2),
    total_a_receber DECIMAL(15,2),
    total_pago DECIMAL(15,2),
    total_a_pagar DECIMAL(15,2),
    saldo_final DECIMAL(15,2),
    status VARCHAR(20),
    fk_Usuario_id INTEGER
);

-- 3. Tabelas com mais dependências
CREATE TABLE LancamentoCaixa (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20),
    valor DECIMAL(15,2),
    data DATE,
    descricao VARCHAR(100),
    documento_referencia VARCHAR(30),
    conciliado BOOLEAN,
    fk_Usuario_id INTEGER,
    fk_ContaBancaria_Portador_id INTEGER
);

CREATE TABLE Remessa (
    id SERIAL PRIMARY KEY,
    data_geracao DATE,
    data_envio DATE,
    quantidade_titulos INTEGER,
    valor_total DECIMAL(15,2),
    situacao VARCHAR(20),
    arquivo VARCHAR(255),
    fk_ContaBancaria_Portador_id INTEGER
);

CREATE TABLE ContaReceber (
    id SERIAL PRIMARY KEY,
    documento VARCHAR(30),
    valor DECIMAL(15,2),
    valor_recebido DECIMAL(15,2),
    data_emissao DATE,
    data_vencimento DATE,
    data_recebimento DATE,
    situacao VARCHAR(20),
    fk_Usuario_id INTEGER,
    fk_ContaBancaria_Portador_id INTEGER,
    fk_FormaPagamento_id INTEGER,
    fk_NotaFiscalSaida_id INTEGER,
    fk_Faturamento_id INTEGER
);

CREATE TABLE ContaPagar (
    id SERIAL PRIMARY KEY,
    documento VARCHAR(30),
    valor DECIMAL(15,2),
    valor_pago DECIMAL(15,2),
    data_emissao DATE,
    data_vencimento DATE,
    data_pagamento DATE,
    situacao VARCHAR(20),
    fk_Usuario_id INTEGER,
    fk_ContaBancaria_Portador_id INTEGER,
    fk_FormaPagamento_id INTEGER,
    fk_NotaFiscalEntrada_id INTEGER,
    fk_Faturamento_id INTEGER
);

-- 4. Tabela de relacionamento
CREATE TABLE Cadastra (
    fk_Usuario_id INTEGER,
    fk_ContaBancaria_Portador_id INTEGER,
    PRIMARY KEY (fk_Usuario_id, fk_ContaBancaria_Portador_id)
);

-- 5. Agora adicionar todas as constraints FOREIGN KEY
ALTER TABLE NotaFiscalSaida ADD CONSTRAINT FK_NotaFiscalSaida_2
    FOREIGN KEY (fk_FormaPagamento_id)
    REFERENCES FormaPagamento (id)
    ON DELETE CASCADE;
 
ALTER TABLE LancamentoCaixa ADD CONSTRAINT FK_LancamentoCaixa_2
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE CASCADE;
 
ALTER TABLE LancamentoCaixa ADD CONSTRAINT FK_LancamentoCaixa_3
    FOREIGN KEY (fk_ContaBancaria_Portador_id)
    REFERENCES ContaBancaria_Portador (id)
    ON DELETE CASCADE;
 
ALTER TABLE Remessa ADD CONSTRAINT FK_Remessa_2
    FOREIGN KEY (fk_ContaBancaria_Portador_id)
    REFERENCES ContaBancaria_Portador (id)
    ON DELETE CASCADE;
 
ALTER TABLE Faturamento ADD CONSTRAINT FK_Faturamento_2
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaReceber ADD CONSTRAINT FK_ContaReceber_2
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaReceber ADD CONSTRAINT FK_ContaReceber_3
    FOREIGN KEY (fk_ContaBancaria_Portador_id)
    REFERENCES ContaBancaria_Portador (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaReceber ADD CONSTRAINT FK_ContaReceber_4
    FOREIGN KEY (fk_FormaPagamento_id)
    REFERENCES FormaPagamento (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaReceber ADD CONSTRAINT FK_ContaReceber_5
    FOREIGN KEY (fk_NotaFiscalSaida_id)
    REFERENCES NotaFiscalSaida (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaReceber ADD CONSTRAINT FK_ContaReceber_6
    FOREIGN KEY (fk_Faturamento_id)
    REFERENCES Faturamento (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaPagar ADD CONSTRAINT FK_ContaPagar_2
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaPagar ADD CONSTRAINT FK_ContaPagar_3
    FOREIGN KEY (fk_ContaBancaria_Portador_id)
    REFERENCES ContaBancaria_Portador (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaPagar ADD CONSTRAINT FK_ContaPagar_4
    FOREIGN KEY (fk_FormaPagamento_id)
    REFERENCES FormaPagamento (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaPagar ADD CONSTRAINT FK_ContaPagar_5
    FOREIGN KEY (fk_NotaFiscalEntrada_id)
    REFERENCES NotaFiscalEntrada (id)
    ON DELETE CASCADE;
 
ALTER TABLE ContaPagar ADD CONSTRAINT FK_ContaPagar_6
    FOREIGN KEY (fk_Faturamento_id)
    REFERENCES Faturamento (id)
    ON DELETE CASCADE;
 
ALTER TABLE Cadastra ADD CONSTRAINT FK_Cadastra_1
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE RESTRICT;
 
ALTER TABLE Cadastra ADD CONSTRAINT FK_Cadastra_2
    FOREIGN KEY (fk_ContaBancaria_Portador_id)
    REFERENCES ContaBancaria_Portador (id)
    ON DELETE SET NULL;