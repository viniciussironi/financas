package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.despesa.Despesa;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Getter
public class DespesaDTO extends MovimentacaoGenericoDTO {


    private List<ParcelaDTO> parcelas = new ArrayList<>();
    @NotNull(message = "Não pode estar vazio")
    private CategoriaDTO categoria;

    public DespesaDTO() {
    }

    public DespesaDTO(Despesa entidade) {
        super(entidade);
        entidade.getParcelas().forEach(x -> parcelas.add(new ParcelaDTO(x)));
        categoria = new CategoriaDTO(entidade.getCategoriaDespesa());
    }
}
