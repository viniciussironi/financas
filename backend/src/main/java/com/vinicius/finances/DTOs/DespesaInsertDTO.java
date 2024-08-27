package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.despesa.Despesa;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;

import java.time.LocalDate;


@Getter
public class DespesaInsertDTO  {

    private Boolean eParcelada;
    private Double valor;
    private LocalDate data;
    private Integer quantidadeDeParcelas;
    private CategoriaDTO categoria;

    public DespesaInsertDTO() {
    }


}
