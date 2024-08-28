INSERT INTO Usuarios (nome, sobrenome, email, senha) VALUES ('Vinicius', 'Sironi', 'viniciussironi@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO categorias_despesas (nome) VALUES ('Empréstimo');
INSERT INTO categorias_despesas (nome) VALUES ('Alimentação');
INSERT INTO categorias_despesas (nome) VALUES ('Entretenimento');
INSERT INTO categorias_despesas (nome) VALUES ('Compras Online');
INSERT INTO categorias_despesas (nome) VALUES ('Gasolina');
INSERT INTO categorias_despesas (nome) VALUES ('Outra');

INSERT INTO despesas (valor_total, categoria_despesa_id, usuario_id) VALUES (100.00, 1, 1);
INSERT INTO despesas (valor_total, categoria_despesa_id, usuario_id) VALUES (200.00, 2, 1);
INSERT INTO despesas (valor_total, categoria_despesa_id, usuario_id) VALUES (300.00, 3, 1);
INSERT INTO despesas (valor_total, categoria_despesa_id, usuario_id) VALUES (400.00, 4, 1);

INSERT INTO parcelas (valor_parcela, vencimento_parcela, nome_parcela, despesa_id) VALUES (400.00, '2024-08-27', 'À vista', 4);

INSERT INTO parcelas (valor_parcela, vencimento_parcela, nome_parcela, despesa_id) VALUES (100.00, '2024-08-15', 'Parcela 1', 3);
INSERT INTO parcelas (valor_parcela, vencimento_parcela, nome_parcela, despesa_id) VALUES (100.00, '2024-09-15', 'Parcela 2', 3);
INSERT INTO parcelas (valor_parcela, vencimento_parcela, nome_parcela, despesa_id) VALUES (100.00, '2024-10-15', 'Parcela 3', 3);

INSERT INTO parcelas (valor_parcela, vencimento_parcela, nome_parcela, despesa_id) VALUES (100.00, '2024-08-10', 'Parcela 1', 2);
INSERT INTO parcelas (valor_parcela, vencimento_parcela, nome_parcela, despesa_id) VALUES (100.00, '2024-09-10', 'Parcela 2', 2);

INSERT INTO parcelas (valor_parcela, vencimento_parcela, nome_parcela, despesa_id) VALUES (100.00, '2024-08-20', 'À vista', 1);

INSERT INTO categorias_receitas (nome) VALUES ('Salário');
INSERT INTO categorias_receitas (nome) VALUES ('Renda Extra');
INSERT INTO categorias_receitas (nome) VALUES ('Dividendos');
INSERT INTO categorias_receitas (nome) VALUES ('Outra');

INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (2000.00, '2024-04-04', 1, 1);
INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (500.00, '2024-04-24', 2, 1);
INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-04-04', 3, 1);
INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (2000.00, '2024-05-04', 1, 1);
INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (500.00, '2024-05-04', 2, 1);
INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-06-04', 3, 1);
INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-06-04', 3, 1);
INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-07-19', 3, 1);
INSERT INTO receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-07-20', 4, 1);