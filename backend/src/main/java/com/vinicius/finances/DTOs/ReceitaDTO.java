package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.receita.Receita;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ReceitaDTO extends MovimentacaoGenericoDTO {

    @NotNull(message = "Não pode estar vazio")
    private CategoriaDTO categoria;

    public ReceitaDTO() {
    }

    public ReceitaDTO(Receita entidade) {
        super(entidade);
        categoria = new CategoriaDTO(entidade.getCategoriaReceita());
    }
}
