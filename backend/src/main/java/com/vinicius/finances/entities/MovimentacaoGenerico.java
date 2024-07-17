package com.vinicius.finances.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@MappedSuperclass
public class MovimentacaoGenerico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate data;
    private Double valor;
}
