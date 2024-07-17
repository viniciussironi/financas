package com.vinicius.finances.entities;

import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.entities.receita.Receita;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "Usuarios")
public class Usuario {
    // la,la, la, la, la
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String sobrenome;
    private String email;
    private String senha;

    @OneToMany(mappedBy = "usuario")
    private List<Despesa> despesas = new ArrayList<>();

    @OneToMany(mappedBy = "usuario")
    private List<Receita> receitas = new ArrayList<>();

}
