package com.vinicius.finances.entities.receita;

import com.vinicius.finances.entities.MovimentacaoGenerico;
import com.vinicius.finances.entities.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "receitas")
public class Receita extends MovimentacaoGenerico {

    @ManyToOne
    @JoinColumn(name = "Categoria_Receita_ID")
    private CategoriaReceita categoriaReceita;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public void setCategoriaReceita(CategoriaReceita categoriaReceita) {
        this.categoriaReceita = categoriaReceita;
    }
}

