INSERT INTO Usuarios (nome, sobrenome, email, senha) VALUES ('Vinicius', 'Sironi', 'viniciussironi@gmail.com', '1234567');

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

INSERT INTO Categorias_Receitas (nome) VALUES ('Salário');
INSERT INTO Categorias_Receitas (nome) VALUES ('Renda Extra');
INSERT INTO Categorias_Receitas (nome) VALUES ('Dividendos');
INSERT INTO Categorias_Receitas (nome) VALUES ('Outra');

INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (2000.00, '2024-07-04', 1, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (500.00, '2024-07-04', 2, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-07-04', 3, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (2000.00, '2024-07-04', 1, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (500.00, '2024-07-04', 2, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-07-04', 3, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-07-04', 3, 1);
INSERT INTO Receitas (valor, data, categoria_receita_id, usuario_id) VALUES (50.00, '2024-07-04', 3, 1);