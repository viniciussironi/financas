package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.MovimentacaoGenerico;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MovimentacaoGenericoDTO {

    private Long id;
    private LocalDate data;
    @Positive(message = "Valor inválido")
    private Double valor;

    public MovimentacaoGenericoDTO() {
    }

    public MovimentacaoGenericoDTO(MovimentacaoGenerico entidade) {
        id = entidade.getId();
        data = entidade.getData();
        valor = entidade.getValor();
    }
}
