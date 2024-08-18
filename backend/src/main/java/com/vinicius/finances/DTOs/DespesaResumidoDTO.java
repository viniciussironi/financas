package com.vinicius.finances.DTOs;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DespesaResumidoDTO {

    private Long id;
    private String categoria;
    private LocalDate data;
    private Double valor;
    private String parcelaNome;

    public DespesaResumidoDTO() {
    }
}
