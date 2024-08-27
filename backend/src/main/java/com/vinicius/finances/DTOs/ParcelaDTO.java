package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.Parcela;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ParcelaDTO {

    private Long id;
    private Double valorParcela;
    private LocalDate vencimentoParcela;
    private String nomeParcela;

    public ParcelaDTO(Parcela entidade) {
        id = entidade.getId();
        valorParcela = entidade.getValorParcela();
        vencimentoParcela = entidade.getVencimentoParcela();
        nomeParcela = entidade.getNomeParcela();
    }
}
