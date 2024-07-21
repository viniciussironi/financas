package com.vinicius.finances.DTOs;

import lombok.Data;

@Data
public class TotalPorMesDTO {

    private String mes;
    private Double total;

    public TotalPorMesDTO() {
    }

    public TotalPorMesDTO(String mes, Double valor ) {
        this.mes = mes;
        this.total = valor;
    }
}
