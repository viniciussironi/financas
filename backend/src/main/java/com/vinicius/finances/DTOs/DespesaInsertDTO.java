package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.despesa.Despesa;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class DespesaInsertDTO extends DespesaDTO {

    private Boolean e_parcelado;
    private Integer qtdParcelas;
    private LocalDate primeiraParcela;

    private CategoriaDTO categoriaDespesa;

    public DespesaInsertDTO() {
    }

    public DespesaInsertDTO(Despesa entidade) {
        super(entidade);
        e_parcelado = entidade.getEParcelado();
        qtdParcelas = entidade.getQtdParcelas();
        primeiraParcela = entidade.getPrimeiraParcela();
        categoriaDespesa = new CategoriaDTO(entidade.getCategoriaDespesa());
    }
}
