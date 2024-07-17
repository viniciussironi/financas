package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.receita.CategoriaReceita;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoriaDTO {

    private Long id;
    @NotBlank(message = "Obrigatório")
    private String nome;

    public CategoriaDTO() {
    }

    public CategoriaDTO(CategoriaDespesa entidade) {
        id = entidade.getId();
        nome = entidade.getNome();
    }

    public CategoriaDTO(CategoriaReceita entidade) {
        id = entidade.getId();
        nome = entidade.getNome();
    }
}
