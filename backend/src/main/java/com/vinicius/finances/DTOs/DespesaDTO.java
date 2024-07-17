package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.despesa.Despesa;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
public class DespesaDTO extends MovimentacaoGenericoDTO {


    private List<ParcelaDTO> parcelas = new ArrayList<>();
    private CategoriaDTO categoriaDespesa;

    public DespesaDTO() {
    }

    public DespesaDTO(Despesa entidade) {
        super(entidade);
        entidade.getParcelas().forEach(x -> parcelas.add(new ParcelaDTO(x)));
        categoriaDespesa = new CategoriaDTO(entidade.getCategoriaDespesa());
    }
}
