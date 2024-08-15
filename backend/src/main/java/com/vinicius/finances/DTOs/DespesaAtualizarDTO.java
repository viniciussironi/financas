package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.Despesa;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DespesaAtualizarDTO extends MovimentacaoGenericoDTO {

    private Boolean e_parcelado;
    private Integer qtdParcelas;
    private LocalDate primeiraParcela;
    private CategoriaDTO categoria;

    public DespesaAtualizarDTO() {
    }

    public DespesaAtualizarDTO(Despesa entidade) {
        super(entidade);
        e_parcelado = entidade.getEParcelado();
        qtdParcelas = entidade.getQtdParcelas();
        primeiraParcela = entidade.getPrimeiraParcela();
        categoria = new CategoriaDTO(entidade.getCategoriaDespesa());
    }
}
