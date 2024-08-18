package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.MovimentacaoGenerico;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;

@Data
@Getter
public class MovimentacaoGenericoDTO {

    private Long id;
    @NotNull(message = "Não pode estar vazio")
    private LocalDate data;
    @NotNull(message = "Não pode estar vazio")
    @Positive(message = "Valor deve ser positivo")
    private Double valor;

    public MovimentacaoGenericoDTO() {
    }

    public MovimentacaoGenericoDTO(MovimentacaoGenerico entidade) {
        id = entidade.getId();
        data = entidade.getData();
        valor = entidade.getValor();
    }
}
