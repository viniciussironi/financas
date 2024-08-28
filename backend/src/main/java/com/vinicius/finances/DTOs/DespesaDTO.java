package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.entities.despesa.Parcela;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Getter
public class DespesaDTO {

    private Long id;
    @NotNull(message = "Não pode estar vazio")
    private Double valorTotal;
    private CategoriaDTO categoriaDespesa;


    public DespesaDTO() {
    }

    public DespesaDTO(Despesa entidade) {
        id = entidade.getId();
        valorTotal = entidade.getValorTotal();
        categoriaDespesa = new CategoriaDTO(entidade.getCategoriaDespesa());
    }
}
