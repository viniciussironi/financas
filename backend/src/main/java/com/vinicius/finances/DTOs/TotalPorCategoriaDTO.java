package com.vinicius.finances.DTOs;

import lombok.Data;

@Data
public class TotalPorCategoriaDTO {

    private Long id;
    private String nome;
    private Double total;

    public TotalPorCategoriaDTO() {}

    public TotalPorCategoriaDTO(Long id, String nome, Double total) {
        this.id = id;
        this.nome = nome;
        this.total = total;
    }
}
