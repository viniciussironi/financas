package com.vinicius.finances.entities.despesa;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "Parcelas")
public class Parcela {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dataDeVencimento;
    private Double valorParcela;

    @ManyToOne
    @JoinColumn(name = "Despesa_ID")
    private Despesa despesa;
}
