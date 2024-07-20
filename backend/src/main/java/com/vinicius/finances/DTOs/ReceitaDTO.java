package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.receita.Receita;
import lombok.Getter;

@Getter
public class ReceitaDTO extends MovimentacaoGenericoDTO {

    private CategoriaDTO categoria;

    public ReceitaDTO() {
    }

    public ReceitaDTO(Receita entidade) {
        super(entidade);
      categoria = new CategoriaDTO(entidade.getCategoriaReceita());
    }
}
