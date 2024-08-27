package com.vinicius.finances.entities.despesa;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "parcelas")
public class Parcela {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double valorParcela;
    private LocalDate vencimentoParcela;
    private String nomeParcela;

    @ManyToOne
    @JoinColumn(name = "despesa_id")
    private Despesa despesa;
}
