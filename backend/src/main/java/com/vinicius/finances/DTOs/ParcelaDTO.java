package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.Parcela;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;

@Data
@Getter
public class ParcelaDTO {

    private Long id;
    private String nome;
    private LocalDate dataDeVencimento;
    private Double valorParcela;

    public ParcelaDTO(Parcela entidade) {
        id = entidade.getId();
        nome = entidade.getNome();
        dataDeVencimento = entidade.getDataDeVencimento();
        valorParcela = entidade.getValorParcela();
    }
}
