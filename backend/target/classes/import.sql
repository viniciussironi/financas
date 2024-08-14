INSERT INTO Usuarios (nome, sobrenome, email, senha) VALUES ('Vinicius', 'Sironi', 'viniciussironi@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO Categorias_Despesas (nome) VALUES ('Empréstimo');
INSERT INTO Categorias_Despesas (nome) VALUES ('Alimentação');
INSERT INTO Categorias_Despesas (nome) VALUES ('Entretenimento');
INSERT INTO Categorias_Despesas (nome) VALUES ('Compras Online');
INSERT INTO Categorias_Despesas (nome) VALUES ('Gasolina');
INSERT INTO Categorias_Despesas (nome) VALUES ('Outra');

INSERT INTO Despesas (valor, data, categoria_despesa_id, e_parcelado, usuario_id) VALUES (300.00, '2024-07-04', 2, false, 1);
INSERT INTO Despesas (valor, data, categoria_despesa_id, e_parcelado, usuario_id) VALUES (300.00, '2024-07-09', 4, false, 1);
INSERT INTO Despesas (valor, data, categoria_despesa_id, e_parcelado, usuario_id) VALUES (300.00, '2024-07-04', 2, false, 1);
INSERT INTO Despesas (valor, data, categoria_despesa_id, e_parcelado, usuario_id) VALUES (300.00, '2024-07-09', 4, false, 1);

INSERT INTO Despesas (valor, data, categoria_despesa_id, e_parcelado, qtd_parcelas, primeira_parcela, usuario_id) VALUES (300.00, '2024-07-09', 3, true, 3, '2024-08-09', 1);

INSERT INTO Parcelas (data_de_vencimento, valor_parcela, despesa_id) VALUES ('2024-08-09', 100.0, 5)
INSERT INTO Parcelas (data_de_vencimento, valor_parcela, despesa_id) VALUES ('2024-09-09', 100.0, 5)
INSERT INTO Parcelas (data_de_vencimento, valor_parcela, despesa_id) VALUES ('2024-10-09', 100.0, 5)

INSERT INTO Categorias_Receitas (nome) VALUES ('Salário');
INSERT INTO Categorias_Receitas (nome) VALUES ('Renda Extra');
INSERT INTO Categorias_Receitas (nome) VALUES ('Dividendos');
INSERT INTO Categorias_Receitas (nome) VALUES ('Outra');

INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (2000.00, '2024-04-04', 1, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (500.00, '2024-04-24', 2, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-04-04', 3, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (2000.00, '2024-05-04', 1, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (500.00, '2024-05-04', 2, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-06-04', 3, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-06-04', 3, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-07-19', 3, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-07-20', 4, 1);