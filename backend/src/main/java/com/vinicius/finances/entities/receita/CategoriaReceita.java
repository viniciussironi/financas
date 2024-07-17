package com.vinicius.finances.entities.receita;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Categorias_Receitas")
public class CategoriaReceita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
}
