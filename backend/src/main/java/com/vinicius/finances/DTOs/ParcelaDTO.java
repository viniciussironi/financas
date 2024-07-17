package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.Parcela;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ParcelaDTO {

    private Long id;
    private LocalDate dataDeVencimento;
    private Double valorParcela;

    public ParcelaDTO(Parcela entidade) {
        id = entidade.getId();
        dataDeVencimento = entidade.getDataDeVencimento();
        valorParcela = entidade.getValorParcela();
    }
}
