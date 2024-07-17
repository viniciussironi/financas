package com.vinicius.finances.entities.despesa;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Categorias_Despesas")
public class CategoriaDespesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
}
