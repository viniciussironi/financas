package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.despesa.Despesa;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.ToString;

import java.time.LocalDate;


@Getter
@ToString
public class DespesaInsertDTO  {

    private Boolean e_parcelada;
    private Double valor;
    private LocalDate data;
    private Integer quantidadeDeParcelas;
    private CategoriaDTO categoriaDespesa;

    public DespesaInsertDTO() {
    }

    public DespesaInsertDTO(Despesa entidade) {
        if (entidade.getParcelas().size() > 1) {
            e_parcelada = true;
            quantidadeDeParcelas = entidade.getParcelas().size();
        }
        else {
            e_parcelada = false;
            quantidadeDeParcelas = null;
        }
        valor = entidade.getValorTotal();
        data = entidade.getParcelas().getFirst().getVencimentoParcela();
        categoriaDespesa = new CategoriaDTO(entidade.getCategoriaDespesa());
    }
}
